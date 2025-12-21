"use client";

import { LeadsTable } from "@/components/leads-table";
import { Button } from "@/components/ui/button";
import { Download, Users } from "lucide-react";

export default function LeadsPage() {
    const handleExport = () => {
        // Mock export functionality
        alert("Downloading leads.csv...");
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-8 pt-24">
            <div className="max-w-6xl mx-auto space-y-6">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <Users className="h-8 w-8 text-blue-600" />
                            Student Leads
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Track performance-qualified leads for scholarship consultancy.
                        </p>
                    </div>
                    <Button onClick={handleExport} variant="outline" className="bg-white">
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                </div>

                <LeadsTable />

            </div>
        </div>
    );
}
