"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Student {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
    major: string;
    avgScore: number;
    testsTaken: number;
    joinedDate: string;
}

interface AdminSearchClientProps {
    students: Student[];
}

export function AdminSearchClient({ students }: AdminSearchClientProps) {
    const [searchTerm, setSearchTerm] = useState("");

    // This component is just for the search input
    // The actual filtering will be done by the parent component
    return (
        <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
                placeholder="Search by name or major..."
                className="pl-9 bg-slate-50 border-slate-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}
