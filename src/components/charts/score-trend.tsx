export type TrendPoint = { label: string; score: number };

const W = 560;
const H = 180;
const PAD_X = 30;
const PAD_Y = 22;

/**
 * Dependency-free score trend. Rendered on the server as inline SVG, so the
 * dashboard ships no chart runtime (recharts was ~300 kB of client JS).
 */
export function ScoreTrend({ data, lang = "en" }: { data: TrendPoint[]; lang?: "en" | "zh" }) {
  const zh = lang === "zh";
  if (data.length < 2) {
    return (
      <div className="flex h-[180px] items-center justify-center rounded-lg border border-dashed border-line px-4 text-center text-[12px] text-ink-faint">
        {zh ? "完成两套试卷后查看分数趋势。" : "Finish two papers to see your trend."}
      </div>
    );
  }

  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_Y * 2;
  const x = (index: number) => PAD_X + (index / (data.length - 1)) * innerW;
  const y = (score: number) =>
    PAD_Y + innerH - (Math.max(0, Math.min(100, score)) / 100) * innerH;

  const line = data
    .map((point, index) => `${index === 0 ? "M" : "L"}${x(index).toFixed(1)},${y(point.score).toFixed(1)}`)
    .join(" ");
  const area = `${line} L${x(data.length - 1).toFixed(1)},${PAD_Y + innerH} L${x(0).toFixed(1)},${PAD_Y + innerH} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={zh ? "分数趋势" : "Score trend"}>
        {[0, 25, 50, 75, 100].map((value) => {
          // On phones the grid keeps three references (0 / 50 / 100); the extra
          // two would crowd a 375 px-wide chart.
          const minor = value === 25 || value === 75;
          return (
            <g key={value} className={minor ? "hidden sm:inline" : undefined}>
              <line
                x1={PAD_X}
                y1={y(value)}
                x2={W - PAD_X}
                y2={y(value)}
                stroke="#e7dfd2"
                strokeWidth="1"
              />
              <text
                x={PAD_X - 6}
                y={y(value) + 3}
                textAnchor="end"
                className="chart-axis"
                fill="#7a736a"
              >
                {value}
              </text>
            </g>
          );
        })}

        <path d={area} className="chart-area" fill="#d31d3c" />
        <path
          d={line}
          className="chart-line"
          fill="none"
          stroke="#d31d3c"
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {data.map((point, index) => {
          const latest = index === data.length - 1;
          return (
            <circle
              key={`${point.label}-${index}`}
              className="chart-dot"
              style={{ animationDelay: `${700 + index * 80}ms` }}
              cx={x(index)}
              cy={y(point.score)}
              r={latest ? 4 : 2.6}
              fill={latest ? "#101418" : "#d31d3c"}
            >
              <title>{zh ? `${point.label}：${point.score}/100` : `${point.label}: ${point.score}/100`}</title>
            </circle>
          );
        })}
      </svg>
      <div className="mt-1 flex justify-between gap-2 text-[9.5px] text-ink-faint">
        <span className="min-w-0 truncate">{data[0]?.label}</span>
        <span className="min-w-0 truncate text-right">{data[data.length - 1]?.label}</span>
      </div>
    </div>
  );
}
