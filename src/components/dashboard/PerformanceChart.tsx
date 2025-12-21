"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

interface PerformanceChartProps {
    data: Array<{ name: string; score: number }>;
}

export function PerformanceChart({ data }: PerformanceChartProps) {
    if (data.length === 0) {
        return (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                Complete at least one test to see your trend.
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                    }}
                    itemStyle={{ fontSize: '12px' }}
                />
                <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#2563eb' }}
                    activeDot={{ r: 6 }}
                    name="Result"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
