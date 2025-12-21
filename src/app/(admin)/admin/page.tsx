import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    FileText,
    Trophy,
    Phone,
    Mail,
    PlusCircle,
    Upload,
    MoreHorizontal,
    Download,
    LogOut
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminSearchClient } from "@/components/admin/AdminSearchClient";
import { LogoutButton } from "@/components/LogoutButton";

async function getAdminStats() {
    // Get total students
    const totalStudents = await prisma.user.count({
        where: { role: 'STUDENT' }
    });

    // Get total tests taken
    const totalAttempts = await prisma.attempt.count();

    // Get average score
    const attempts = await prisma.attempt.findMany({
        select: { score: true, test: { select: { totalMarks: true } } }
    });

    const avgScore = attempts.length > 0
        ? Math.round(attempts.reduce((sum, a) => sum + (a.score / a.test.totalMarks) * 100, 0) / attempts.length)
        : 0;

    // Get scholarship leads (students with >80% average)
    const users = await prisma.user.findMany({
        where: { role: 'STUDENT' },
        include: {
            attempts: {
                include: { test: { select: { totalMarks: true } } }
            }
        }
    });

    const scholarshipLeads = users.filter(user => {
        if (user.attempts.length === 0) return false;
        const userAvg = user.attempts.reduce((sum, a) => sum + (a.score / a.test.totalMarks) * 100, 0) / user.attempts.length;
        return userAvg >= 80;
    }).length;

    // Get recent students with their performance
    const recentStudents = await prisma.user.findMany({
        where: { role: 'STUDENT' },
        include: {
            attempts: {
                include: { test: { select: { totalMarks: true } } }
            }
        },
        orderBy: { createdAt: 'desc' },
        take: 20
    });

    const studentsWithStats = recentStudents.map(user => {
        const testsTaken = user.attempts.length;
        const avgScore = testsTaken > 0
            ? Math.round(user.attempts.reduce((sum, a) => sum + (a.score / a.test.totalMarks) * 100, 0) / testsTaken)
            : 0;

        return {
            id: user.id,
            name: user.name || 'Unknown',
            email: user.email,
            whatsapp: user.whatsapp || 'N/A',
            major: user.major || 'Not specified',
            avgScore,
            testsTaken,
            joinedDate: user.createdAt.toISOString().split('T')[0]
        };
    });

    return {
        totalStudents,
        totalAttempts,
        avgScore,
        scholarshipLeads,
        students: studentsWithStats
    };
}

export default async function AdminDashboard() {
    const stats = await getAdminStats();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-4 sm:p-6 md:p-8">

            {/* 1. HEADER & QUICK ACTIONS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">CSCA Master Admin</h1>
                    <p className="text-sm sm:text-base text-slate-500">Manage students, content, and scholarship leads.</p>
                </div>
                <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                    <Button variant="outline" className="bg-white flex-1 sm:flex-none">
                        <Download className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">Export</span>
                    </Button>
                    <Link href="/content" className="flex-1 sm:flex-none">
                        <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                            <PlusCircle className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">Content</span>
                        </Button>
                    </Link>
                    <LogoutButton />
                </div>
            </div>

            {/* 2. KPI CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalStudents}</div>
                        <p className="text-xs text-slate-500">Registered users</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Tests Taken</CardTitle>
                        <FileText className="h-4 w-4 text-indigo-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalAttempts}</div>
                        <p className="text-xs text-slate-500">Avg score: {stats.avgScore}%</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Scholarship Leads</CardTitle>
                        <Trophy className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.scholarshipLeads}</div>
                        <p className="text-xs text-slate-500">Students with &gt;80% score</p>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-100">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-blue-700">Quick Actions</CardTitle>
                        <Upload className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-medium text-blue-900 mb-2">Manage Platform</div>
                        <Link href="/content">
                            <Button size="sm" variant="outline" className="w-full bg-white border-blue-200 text-blue-700 h-7">
                                Manage Content
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* 3. CRM TABLE SECTION */}
            <Card className="shadow-sm">
                <CardHeader className="border-b border-slate-100 bg-white px-4 sm:px-6 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h2 className="text-lg sm:text-xl font-bold text-slate-800">Recent Student Leads</h2>
                        <AdminSearchClient students={stats.students} />
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 font-semibold border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Student Name</th>
                                    <th className="px-6 py-4">Contact Info</th>
                                    <th className="px-6 py-4">Target Major</th>
                                    <th className="px-6 py-4">Performance</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {stats.students.map((student) => (
                                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors bg-white">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">{student.name}</div>
                                            <div className="text-xs text-slate-500">Joined: {student.joinedDate}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Phone className="h-3 w-3 text-slate-400" />
                                                <span className="font-mono text-slate-600 text-xs">{student.whatsapp}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-3 w-3 text-slate-400" />
                                                <span className="text-slate-600 text-xs">{student.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className="font-normal text-slate-700 bg-slate-50">
                                                {student.major}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            {student.testsTaken > 0 ? (
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`font-bold ${student.avgScore >= 80 ? 'text-green-600' : student.avgScore < 50 ? 'text-red-600' : 'text-amber-600'}`}>
                                                            {student.avgScore}% Avg
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-slate-500">{student.testsTaken} tests taken</div>
                                                </div>
                                            ) : (
                                                <span className="text-slate-400 italic">No tests yet</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {student.whatsapp !== 'N/A' && (
                                                    <Link href={`https://wa.me/${student.whatsapp.replace(/\+/g, '')}`} target="_blank">
                                                        <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 px-2" title="Chat on WhatsApp">
                                                            <Phone className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                )}
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden divide-y divide-slate-100">
                        {stats.students.map((student) => (
                            <div key={student.id} className="p-4 hover:bg-slate-50">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="font-bold text-slate-900">{student.name}</div>
                                        <div className="text-xs text-slate-500">Joined: {student.joinedDate}</div>
                                    </div>
                                    {student.whatsapp !== 'N/A' && (
                                        <Link href={`https://wa.me/${student.whatsapp.replace(/\+/g, '')}`} target="_blank">
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 px-2">
                                                <Phone className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Mail className="h-3 w-3" />
                                        <span className="text-xs">{student.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-xs">{student.major}</Badge>
                                        {student.testsTaken > 0 && (
                                            <span className={`text-xs font-bold ${student.avgScore >= 80 ? 'text-green-600' : student.avgScore < 50 ? 'text-red-600' : 'text-amber-600'}`}>
                                                {student.avgScore}% ({student.testsTaken} tests)
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {stats.students.length === 0 && (
                        <div className="p-8 text-center text-slate-500">
                            No students registered yet.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
