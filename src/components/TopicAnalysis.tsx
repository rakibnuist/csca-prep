"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, Target, ArrowRight } from "lucide-react";
import { MathRender } from "@/components/MathRender";

interface TopicPerformance {
    topic: string;
    correct: number;
    total: number;
    score: number;
}

interface TopicAnalysisProps {
    performance: TopicPerformance[];
}

const TOPIC_RECOMMENDATIONS: Record<string, string> = {
    "Sets and Inequalities": "Master definition, operations ($$ \\cup, \\cap $$), and representation. Focus on quadratic and rational inequality solution methods.",
    "Functions": "Review domain, range, monotonicity, and parity. Deep dive into power, exponential, and logarithmic transformations.",
    "Algebra & Calculus": "Practice arithmetic/geometric sequence summations. Focus on geometric meaning of derivatives and vector operations.",
    "Geometry": "Strengthen Analytic Geometry (Conic sections) and Solid Geometry (coordinate systems and simple solid properties).",
    "Probability & Statistics": "Focus on classical probability models, data characteristics (Mean/Variance), and Normal Distribution concepts.",
    "Default": "Continue practicing mock sets to identify specific weak points in this area."
};

export function TopicAnalysis({ performance }: TopicAnalysisProps) {
    // Sort performance: lower scores first to highlight weaknesses
    const sortedPerformance = [...performance].sort((a, b) => (a.score / a.total) - (b.score / b.total));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
                    <Target className="w-6 h-6 text-blue-600" /> Topic-Wise Analysis
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {sortedPerformance.map((item) => {
                    const percentage = Math.round((item.score / item.total) * 100);
                    const isWeak = percentage < 60;
                    const recommendation = TOPIC_RECOMMENDATIONS[item.topic] || TOPIC_RECOMMENDATIONS["Default"];

                    return (
                        <Card key={item.topic} className={`overflow-hidden border-2 transition-all ${isWeak ? 'border-amber-100 bg-amber-50/20' : 'border-slate-100'}`}>
                            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                <div>
                                    <Badge variant={isWeak ? "destructive" : "secondary"} className="mb-2 uppercase text-[10px] font-bold tracking-widest">
                                        {isWeak ? 'Needs Improvement' : 'Satisfactory'}
                                    </Badge>
                                    <CardTitle className="text-lg font-bold text-slate-800">{item.topic}</CardTitle>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-slate-900">{percentage}%</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Topic Score</div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-tight">
                                        <span>Mastery Level</span>
                                        <span>{item.correct} / {item.total} Questions Correct</span>
                                    </div>
                                    <Progress value={percentage} className={`h-2 ${isWeak ? 'bg-amber-100' : 'bg-slate-100'}`} />
                                </div>

                                <div className={`p-4 rounded-xl flex gap-3 items-start text-sm ${isWeak ? 'bg-amber-100/50 text-amber-900' : 'bg-blue-50/50 text-blue-900'}`}>
                                    <Lightbulb className={`w-5 h-5 shrink-0 mt-0.5 ${isWeak ? 'text-amber-600' : 'text-blue-600'}`} />
                                    <div className="flex-1">
                                        <div className="font-bold mb-1 uppercase text-[10px] tracking-widest">Recommendation</div>
                                        <div className="leading-relaxed opacity-90">
                                            <MathRender content={recommendation} />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
