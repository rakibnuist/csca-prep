"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

const checklistItems = [
    { id: "os", label: "Windows 10/11 or 7 SP1 (No Mac/iOS)" },
    { id: "cam", label: "Primary Device: Webcam, Mic, Speaker" },
    { id: "sec_dev", label: "Secondary Device (Phone/Tablet) + Stand" },
    { id: "room", label: "Private, enclosed room (No public spaces)" },
    { id: "desk", label: "Clean desk (Only PC + Whiteboard)" },
    { id: "net", label: "Stable Internet (>20Mbps) + Hotspot backup" },
];

export function ReadinessChecklist() {
    // Initial state from local storage or default false
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Could load from localStorage here for persistence
        const saved = localStorage.getItem("csca_checklist");
        if (saved) {
            try {
                setCheckedItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse checklist", e);
            }
        }
    }, []);

    const handleCheck = (id: string, checked: boolean) => {
        const newItems = { ...checkedItems, [id]: checked };
        setCheckedItems(newItems);
        localStorage.setItem("csca_checklist", JSON.stringify(newItems));
    };

    const count = Object.values(checkedItems).filter(Boolean).length;
    const progress = (count / checklistItems.length) * 100;
    const isComplete = count === checklistItems.length;

    if (!isClient) return null; // Avoid hydration mismatch

    return (
        <Card className={cn(
            "border-2 transition-all duration-500 overflow-hidden relative",
            isComplete ? "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] bg-green-50/50" : "border-slate-200 shadow-lg"
        )}>
            {/* Confetti Background Effect (Simplified CSS) */}
            {isComplete && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-bounce delay-75"></div>
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                    <div className="absolute top-0 left-3/4 w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-300"></div>
                </div>
            )}

            <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                            {isComplete ? (
                                <span className="text-green-700 flex items-center gap-2 animate-in slide-in-from-bottom-2">
                                    <PartyPopper className="h-6 w-6" /> You're Ready!
                                </span>
                            ) : (
                                <span className="text-slate-900 flex items-center gap-2">
                                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                                    System Readiness Check
                                </span>
                            )}
                        </CardTitle>
                        <CardDescription className="mt-1">
                            Verify your setup to avoid disqualification.
                        </CardDescription>
                    </div>
                    <div className="text-right">
                        <span className={cn("text-2xl font-bold font-mono", isComplete ? "text-green-600" : "text-slate-400")}>
                            {Math.round(progress)}%
                        </span>
                    </div>
                </div>
                <Progress value={progress} className={cn("h-2 mt-2", isComplete ? "bg-green-100" : "bg-slate-100")} />
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {checklistItems.map((item) => (
                        <div
                            key={item.id}
                            className={cn(
                                "flex items-start space-x-3 p-3 rounded-lg border transition-all duration-200 hover:bg-slate-50 cursor-pointer",
                                checkedItems[item.id] ? "bg-blue-50/50 border-blue-200" : "border-transparent"
                            )}
                            onClick={() => handleCheck(item.id, !checkedItems[item.id])}
                        >
                            <Checkbox
                                id={item.id}
                                checked={checkedItems[item.id] || false}
                                onCheckedChange={(c) => handleCheck(item.id, c as boolean)}
                                className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor={item.id}
                                    className={cn(
                                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
                                        checkedItems[item.id] ? "text-blue-900 line-through opacity-70" : "text-slate-700"
                                    )}
                                >
                                    {item.label}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>

                {isComplete && (
                    <div className="mt-6 p-4 bg-green-100 rounded-xl border border-green-200 text-green-800 text-sm flex items-start gap-3 animate-in zoom-in-95 duration-300">
                        <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold">Great job!</p>
                            <p>Your hardware setup meets the 2025 requirements. Remember to log in 60 minutes before your exam start time.</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
