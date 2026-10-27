"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type TrendPoint = { label: string; score: number };

export function ScoreTrend({ data }: { data: TrendPoint[] }) {
  if (data.length < 2) {
    return (
      <div className="flex h-[180px] items-center justify-center rounded-lg border border-dashed border-line text-[12px] text-ink-faint">
        Finish two papers to see your trend.
      </div>
    );
  }

  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 6, left: -22, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c8102e" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#c8102e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 4" stroke="#e6dccc" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: "#8b8378" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 50, 100]}
            tick={{ fontSize: 10, fill: "#8b8378" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #e6dccc",
              fontSize: 12,
              background: "#fff",
            }}
            labelStyle={{ color: "#5a534b", fontSize: 11 }}
            formatter={(value) => [`${value}/100`, "Score"]}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#c8102e"
            strokeWidth={2}
            fill="url(#scoreFill)"
            dot={{ r: 3, fill: "#c8102e", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
