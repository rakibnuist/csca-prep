"use client";

import { Button } from "@/components/ui/button";
import { Download, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";

interface ReportActionsProps {
    testId: string;
}

export function ReportActions({ testId }: ReportActionsProps) {
    const handleDownload = () => {
        window.print();
    };

    return (
        <div className="space-y-4 pt-4">
            <Button
                onClick={handleDownload}
                variant="outline"
                className="w-full justify-between group hover:bg-white border-slate-200 hover:border-blue-300 font-bold transition-all print:hidden"
            >
                <span className="flex items-center gap-2 text-slate-600 group-hover:text-blue-600">
                    <Download className="w-4 h-4" /> Download Full Report
                </span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:text-blue-600 transition-all" />
            </Button>

            <Link href={`/exam/${testId}`} className="block print:hidden">
                <Button
                    variant="ghost"
                    className="w-full justify-between group hover:bg-slate-50 border border-transparent hover:border-slate-200 font-bold"
                >
                    <span className="flex items-center gap-2 text-slate-600">
                        <RotateCcw className="w-4 h-4" /> Retake Mock Set
                    </span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </Button>
            </Link>
        </div>
    );
}
