import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowRight,
    CheckCircle2,
    Lock,
    PlayCircle,
    Clock,
    Trophy,
    Smartphone,
    AlertTriangle,
    Monitor,
    Eye
} from "lucide-react";
import Link from "next/link";
import { MathRender } from "@/components/MathRender";

import { getSession } from "@/lib/auth";

export default async function Home() {
    const session = await getSession();
    const isLoggedIn = !!session;

    return (
        <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-white">
            <Navbar isLoggedIn={isLoggedIn} />

            <main className="flex-grow pt-16">

                {/* =========================================
            1. HERO SECTION: INTERACTIVE & ENGAGING
           ========================================= */}
                <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden bg-slate-900 text-white">
                    {/* Background Gradient */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-blue-600 blur-[100px] opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] rounded-full bg-purple-600 blur-[100px] opacity-20"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">

                            {/* LEFT: The Value Prop */}
                            <div className="space-y-6 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Study in China • Accepting 2026 Applicants
                                </div>

                                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                                    Crack the CSCA Exam.<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                        Secure Your Future.
                                    </span>
                                </h1>

                                <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0">
                                    The only <strong>100% Free</strong> preparation platform for English & Chinese tracks.
                                    Access 15+ Mock Tests, "Whiteboard-Mode" practice, and verified scholarship leads.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                    {isLoggedIn ? (
                                        <Link href="/dashboard">
                                            <Button size="lg" className="h-14 px-8 text-lg bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/25 w-full sm:w-auto">
                                                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link href="/sign-up">
                                            <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 w-full sm:w-auto">
                                                Create Free Account
                                            </Button>
                                        </Link>
                                    )}
                                    <Link href="/scholarships">
                                        <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-white text-white bg-transparent hover:bg-white hover:text-slate-900 w-full sm:w-auto">
                                            Browse Scholarships
                                        </Button>
                                    </Link>
                                </div>

                                {!isLoggedIn && (
                                    <p className="text-xs text-slate-500 mt-4">
                                        * Login required for Exam Engine & Dashboard access.
                                    </p>
                                )}
                            </div>

                            {/* RIGHT: THE "HOOK" - INTERACTIVE QUESTION CARD */}
                            <div className="relative mx-auto w-full max-w-md">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>
                                <Card className="relative bg-slate-800 border-slate-700 shadow-2xl">
                                    <CardHeader className="border-b border-slate-700 pb-3">
                                        <div className="flex justify-between items-center">
                                            <Badge variant="outline" className="text-blue-400 border-blue-400">Question of the Day</Badge>
                                            <span className="text-xs text-slate-400 font-mono">Physics • Mechanics</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-6">
                                        <div className="relative z-20">
                                            <div className="text-lg font-medium text-slate-100 mb-4">
                                                <MathRender content="A particle moves with velocity $$ v(t) = 3t^2 + 2 $$. What is its acceleration at $$ t = 2 $$ seconds?" />
                                            </div>

                                            {/* Options - Gated */}
                                            <div className="relative mt-4">
                                                <div className={`space-y-2 ${!isLoggedIn ? 'blur-sm select-none opacity-50' : ''}`}>
                                                    {["10 m/s^2", "12 m/s^2", "6 m/s^2", "14 m/s^2"].map((opt, i) => (
                                                        <div key={i} className={`p-3 rounded border text-sm transition-colors ${isLoggedIn
                                                            ? 'border-slate-600 bg-slate-900/50 text-slate-300 hover:bg-slate-700 cursor-pointer'
                                                            : 'border-slate-600 bg-slate-900/50 text-slate-400'
                                                            }`}>
                                                            {String.fromCharCode(65 + i)}. {opt}
                                                        </div>
                                                    ))}
                                                    {isLoggedIn && (
                                                        <div className="mt-4 p-3 bg-emerald-900/30 border border-emerald-800 text-emerald-400 text-sm rounded">
                                                            <strong>Correct Answer: B</strong> (12 m/s²).<br />
                                                            Differentiation of v(t) gives a(t) = 6t. At t=2, a = 12.
                                                        </div>
                                                    )}
                                                </div>

                                                {/* The Gate */}
                                                {!isLoggedIn && (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                                                        <div className="bg-slate-900/80 p-4 rounded-xl backdrop-blur-md border border-slate-700 text-center shadow-xl">
                                                            <Lock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                                                            <p className="text-white font-bold text-sm mb-3">Login to Solve</p>
                                                            <Link href="/sign-up">
                                                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 animate-pulse">
                                                                    Unlock Answer
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                        </div>
                    </div>
                </section>

                {/* =========================================
            2. THE "GATEKEEPING" FEATURE GRID
           ========================================= */}
                <section className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900">What do you get?</h2>
                            <p className="text-lg text-slate-600 mt-2">
                                We separate public resources from personalized student tools.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                            {/* PUBLIC CARD */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
                                <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                                    NO LOGIN REQUIRED
                                </div>
                                <div className="flex items-center gap-4 mb-6 mt-2">
                                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <Eye className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Public Resources</h3>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                                        <span className="text-slate-600"><strong>2026 Exam Guidelines:</strong> Read the official rules for Home-Based Testing.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                                        <span className="text-slate-600"><strong>Complete Syllabus:</strong> Browse topics for Math, Physics, and Chemistry.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                                        <span className="text-slate-600"><strong>Scholarship List:</strong> View deadlines for CSC & Provincial scholarships.</span>
                                    </li>
                                </ul>
                                <Link href="/guidelines">
                                    <Button variant="outline" className="w-full">Explore Public Guides</Button>
                                </Link>
                            </div>

                            {/* STUDENT CARD (LOCKED) */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 relative overflow-hidden ring-1 ring-blue-100">
                                <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg flex items-center gap-1">
                                    <Lock className="h-3 w-3" /> STUDENT ACCOUNT REQUIRED
                                </div>
                                <div className="flex items-center gap-4 mb-6 mt-2">
                                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Monitor className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">The Exam Engine</h3>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                                        <span className="text-slate-600"><strong>15+ Mock Tests:</strong> Take full 60-minute simulations per subject.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                                        <span className="text-slate-600"><strong>Performance Dashboard:</strong> Track your scores and identify weak areas.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                                        <span className="text-slate-600"><strong>Detailed Solutions:</strong> Unlock step-by-step explanations for every question.</span>
                                    </li>
                                </ul>
                                <Link href="/sign-up">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Create Free Account</Button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </section>

                {/* =========================================
            3. REALITY CHECK: THE STRICT RULES
           ========================================= */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why you need to practice here</h2>
                        <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
                            The 2026 CSCA is not a normal exam. It has strict anti-cheating protocols.
                            Our platform trains you for the specific restrictions mentioned in the official guide.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="p-6 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertTriangle className="h-6 w-6 text-red-600" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">No Paper Allowed</h3>
                                <p className="text-sm text-slate-600">
                                    You must use a <strong>small whiteboard</strong> or erasable sheet. Our mock tests force you to solve without relying on long paper notes.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="p-6 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Clock className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">60-90 Minute Exams</h3>
                                <p className="text-sm text-slate-600">
                                    Science exams vary by track: <strong>60 mins</strong> for English Track and <strong>90 mins</strong> for Chinese Track. Our system supports both.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="p-6 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Smartphone className="h-6 w-6 text-indigo-600" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Dual Device Awareness</h3>
                                <p className="text-sm text-slate-600">
                                    You need a secondary device for 45° monitoring. We provide checklists to ensure your setup doesn't get you disqualified.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================
            4. LEAD GEN FOOTER: SCHOLARSHIP ALERT
           ========================================= */}
                <section className="py-24 bg-gradient-to-br from-blue-900 to-slate-900 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 opacity-10">
                        <Trophy className="w-96 h-96 -mr-20 -mt-20" />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 mb-6 px-4 py-1 text-base">
                            Limited Opportunity
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                            Get the CSC Scholarship List (2026)
                        </h2>
                        <p className="text-xl text-blue-100 mb-10">
                            CSCA Master has curated the list of Elite programs offering full scholarships.
                            Don't miss the March 31st deadline.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            {isLoggedIn ? (
                                <Link href="/guidelines">
                                    <Button size="lg" className="h-14 px-10 text-lg bg-green-500 hover:bg-green-600 text-white font-bold shadow-xl">
                                        Access List Now
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/sign-up">
                                    <Button size="lg" className="h-14 px-10 text-lg bg-green-500 hover:bg-green-600 text-white font-bold shadow-xl">
                                        Sign Up to Get List
                                    </Button>
                                </Link>
                            )}

                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
