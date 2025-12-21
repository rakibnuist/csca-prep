"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

// Mock Data
export const mockLeads = [
    { id: 1, name: "Alice Wand", email: "alice@example.com", whatsapp: "+86 138 0000 0000", major: "Computer Science", score: 85, scholarshipProb: "High" },
    { id: 2, name: "Bob Chen", email: "bob@example.com", whatsapp: "+86 139 1111 2222", major: "Clinical Medicine", score: 55, scholarshipProb: "Low" },
    { id: 3, name: "Charlie Kim", email: "charlie@example.com", whatsapp: "+82 10 1234 5678", major: "Civil Engineering", score: 72, scholarshipProb: "Medium" },
    { id: 4, name: "David Li", email: "david@example.com", whatsapp: "+62 812 3456 7890", major: "Computer Science", score: 92, scholarshipProb: "High" },
    { id: 5, name: "Eve Zhang", email: "eve@example.com", whatsapp: "+60 12 345 6789", major: "Business Admin", score: 65, scholarshipProb: "Medium" },
];

export function LeadsTable() {
    return (
        <div className="rounded-md border bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Target Major</TableHead>
                        <TableHead>Avg Score</TableHead>
                        <TableHead>Scholarship Prob.</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockLeads.map((lead) => (
                        <TableRow key={lead.id}>
                            <TableCell className="font-medium">
                                <div>{lead.name}</div>
                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                    <Mail className="w-3 h-3" /> {lead.email}
                                </div>
                            </TableCell>
                            <TableCell>{lead.major}</TableCell>
                            <TableCell>
                                <span className={`font-bold ${lead.score >= 80 ? 'text-green-600' : lead.score < 60 ? 'text-red-500' : 'text-slate-700'}`}>
                                    {lead.score}%
                                </span>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className={
                                    lead.scholarshipProb === "High" ? "bg-green-50 text-green-700 border-green-200" :
                                        lead.scholarshipProb === "Low" ? "bg-red-50 text-red-700 border-red-200" :
                                            "bg-amber-50 text-amber-700 border-amber-200"
                                }>
                                    {lead.scholarshipProb}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Phone className="w-4 h-4" /> {lead.whatsapp}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">View Profile</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
