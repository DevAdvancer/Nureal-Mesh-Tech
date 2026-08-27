"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ProjectReport, ReportChart } from "@/data/projects";

// On-brand categorical palette, tuned to read on the white report cards.
const PALETTE = ["#7B2FFF", "#FF4D6D", "#FFB830", "#1C1A26"];
const AXIS = "rgba(28,26,38,0.55)";
const GRID = "rgba(28,26,38,0.08)";

interface TooltipEntry {
  name?: string;
  value?: number | string;
  color?: string;
}

function ChartTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
  unit?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#1C1A26]/10 bg-white px-3 py-2 shadow-[0_12px_30px_-12px_rgba(28,26,38,0.4)]">
      {label !== undefined && label !== "" && (
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#1C1A26]/55">
          {label}
        </div>
      )}
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 mt-1">
          <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
          <span className="font-body text-[13px] text-[#1C1A26]">
            {entry.name ? `${entry.name}: ` : ""}
            <span className="font-semibold">{entry.value}</span>
            {unit ? ` ${unit}` : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

function Chart({ chart, animate, uid }: { chart: ReportChart; animate: boolean; uid: string }) {
  const axisProps = {
    tick: { fontSize: 11, fill: AXIS, fontFamily: "var(--font-mono)" },
    axisLine: false,
    tickLine: false,
  } as const;

  if (chart.kind === "bar") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chart.data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
          <XAxis dataKey="name" {...axisProps} />
          <YAxis {...axisProps} width={40} />
          <Tooltip cursor={{ fill: "rgba(123,47,255,0.06)" }} content={<ChartTooltip unit={chart.unit} />} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} isAnimationActive={animate} maxBarSize={44}>
            {chart.data.map((_, i) => (
              <Cell key={i} fill={i === chart.data.length - 1 ? "#7B2FFF" : "rgba(123,47,255,0.45)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chart.kind === "area") {
    const [labelA, labelB] = chart.seriesLabels ?? ["Series A", "Series B"];
    const hasB = chart.data.some((d) => d.b !== undefined);
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chart.data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
          <defs>
            <linearGradient id={`fillA-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7B2FFF" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#7B2FFF" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
          <XAxis dataKey="name" {...axisProps} />
          <YAxis {...axisProps} width={40} />
          <Tooltip content={<ChartTooltip unit={chart.unit} />} />
          {hasB && <Legend wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />}
          <Area
            type="monotone"
            dataKey="a"
            name={labelA}
            stroke="#7B2FFF"
            strokeWidth={2.5}
            fill={`url(#fillA-${uid})`}
            isAnimationActive={animate}
            dot={false}
          />
          {hasB && (
            <Area
              type="monotone"
              dataKey="b"
              name={labelB}
              stroke="#FF4D6D"
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="transparent"
              isAnimationActive={animate}
              dot={false}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // donut
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chart.data}
          dataKey="value"
          nameKey="name"
          innerRadius="55%"
          outerRadius="82%"
          paddingAngle={2}
          stroke="none"
          isAnimationActive={animate}
        >
          {chart.data.map((_, i) => (
            <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip unit={chart.unit} />} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ProjectReport({ report }: { report: ProjectReport }) {
  // Start static (matches SSR), enable chart animation on mount unless the user
  // prefers reduced motion.
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimate(!mq.matches);
  }, []);

  return (
    <div>
      <div className="eyebrow text-violet mb-4">IMPACT REPORT</div>
      <h2
        id="impact-report"
        className="font-display font-bold text-[#1C1A26] mb-3"
        style={{ fontSize: "clamp(24px, 3.4vw, 34px)" }}
      >
        {report.headline}
      </h2>
      <p className="font-body text-[16px] leading-[1.7] text-[#1C1A26]/70 max-w-2xl mb-10">
        {report.summary}
      </p>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {report.kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-xl border border-[#1C1A26]/10 bg-white px-5 py-6 shadow-sm"
          >
            <div className="font-display font-extrabold text-violet leading-none text-[clamp(1.4rem,3vw,2rem)] break-words">
              {k.value}
            </div>
            {k.delta && (
              <span
                className={`mt-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] ${
                  k.trend === "down"
                    ? "bg-coral/10 text-coral"
                    : "bg-[#B8F2C8]/40 text-[#1C7a3f]"
                }`}
              >
                {k.trend === "down" ? (
                  <ArrowDownRight className="h-3 w-3" />
                ) : (
                  <ArrowUpRight className="h-3 w-3" />
                )}
                {k.delta}
              </span>
            )}
            <div className="font-body text-[13px] leading-[1.5] text-[#1C1A26]/70 mt-3">
              {k.label}
            </div>
          </div>
        ))}
      </div>

      {/* charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {report.charts.map((chart, i) => {
          const wide = report.charts.length % 2 === 1 && i === report.charts.length - 1;
          return (
            <div
              key={i}
              className={`rounded-xl border border-[#1C1A26]/10 bg-white p-5 shadow-sm ${
                wide ? "md:col-span-2" : ""
              }`}
            >
              <div className="eyebrow text-[#1C1A26]/55 mb-4">{chart.title}</div>
              <div className="h-[240px] w-full">
                <Chart chart={chart} animate={animate} uid={`c${i}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
