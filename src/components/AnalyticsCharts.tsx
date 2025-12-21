"use client";

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Card } from "@/components/ui/card";
import { Loader2, TrendingUp, Target } from 'lucide-react';

export default function AnalyticsCharts() {
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch analytics stats", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (isLoading) {
        return (
            <div className="h-64 flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-2" />
                <p className="text-slate-500">Processing your performance analytics...</p>
            </div>
        );
    }

    const performanceData = stats?.performanceData || [];
    const topicMastery = stats?.topicMastery || [];
    const avgScore = stats?.avgScore || 0;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Score History Bar Chart */}
                <Card className="p-6 border-slate-200">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase text-xs">Score Progression</h3>
                    </div>
                    <div className="h-64">
                        {performanceData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="score" fill="#2563eb" radius={[4, 4, 0, 0]} name="Score (%)" barSize={32} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-400 italic text-sm">
                                Complete your first mock to see progression.
                            </div>
                        )}
                    </div>
                </Card>

                {/* 2. Topic Mastery Radar Chart */}
                <Card className="p-6 border-slate-200">
                    <div className="flex items-center gap-2 mb-6">
                        <Target className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase text-xs">Topic Proficiency</h3>
                    </div>
                    <div className="h-64">
                        {topicMastery.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topicMastery}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} axisLine={false} tick={false} />
                                    <Radar
                                        name="Mastery"
                                        dataKey="score"
                                        stroke="#4f46e5"
                                        fill="#4f46e5"
                                        fillOpacity={0.4}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-400 italic text-sm">
                                No topic data available yet.
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            {/* 3. Personalized Intelligence Insights */}
            <Card className="p-6 border-none shadow-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 text-blue-100 uppercase text-[10px] font-black tracking-[0.2em]">
                            <Target className="w-4 h-4" /> AI Performance Assistant
                        </div>
                        <h3 className="text-xl font-bold mb-3">Priority Recommendation</h3>
                        <p className="text-blue-50 text-sm leading-relaxed opacity-90">
                            {topicMastery.length > 0
                                ? `Your performance in "${topicMastery[topicMastery.length - 1].name}" is currently lower than other areas (${topicMastery[topicMastery.length - 1].score}%). We recommend focusing your next 3 sessions on this topic to maximize your admission chances.`
                                : "Start with any Mock Set to generate your first intelligence report. We'll identify your weak points automatically."
                            }
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 min-w-[120px]">
                        <div className="text-3xl font-black">{avgScore}%</div>
                        <div className="text-[10px] font-bold uppercase opacity-60">Avg Score</div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
