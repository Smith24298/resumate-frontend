// FILE: components/dashboard/StatsBar.tsx
import { useEffect, useState } from "react";

interface StatsBarProps {
  totalResumes: number;
  avgAtsScore: number | null;
  lastUpdated: string | null;
  bestAtsScore?: number | null;
  loading?: boolean;
}

export function StatsBar({
  totalResumes,
  avgAtsScore,
  lastUpdated,
  bestAtsScore = null,
  loading = false,
}: StatsBarProps) {
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [animatedAvg, setAnimatedAvg] = useState(0);
  const [animatedBest, setAnimatedBest] = useState(0);

  useEffect(() => {
    if (loading) return;

    const duration = 700;
    const started = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      setAnimatedTotal(Math.round(totalResumes * progress));
      setAnimatedAvg(Math.round((avgAtsScore ?? 0) * progress));
      setAnimatedBest(Math.round((bestAtsScore ?? 0) * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loading, totalResumes, avgAtsScore, bestAtsScore]);

  if (loading) {
    return (
      <div className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm animate-pulse"
          >
            <div className="h-8 w-8 rounded-lg bg-blue-50" />
            <div className="w-full space-y-1.5">
              <div className="h-2.5 w-20 rounded bg-blue-50" />
              <div className="h-4 w-24 rounded bg-blue-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const isEmpty = totalResumes === 0;

  const cards = [
    {
      label: "Total Resumes",
      value: isEmpty ? "—" : animatedTotal.toString(),
      muted: isEmpty,
      accent: "indigo" as const,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-blue-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path
            d="M8 3h8l3 3v12a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6l3-3Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 3v5h8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Avg. ATS Score",
      value:
        !isEmpty && avgAtsScore !== null ? `${animatedAvg}%` : "No data yet",
      highlight: !isEmpty && avgAtsScore !== null,
      muted: isEmpty || avgAtsScore === null,
      accent: "emerald" as const,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-emerald-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M4 20h16" strokeLinecap="round" />
          <path d="M7 20v-7m5 7V9m5 11V4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Last Updated",
      value: !isEmpty && lastUpdated ? lastUpdated : "—",
      muted: isEmpty,
      accent: "indigo" as const,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-indigo-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <circle
            cx="12"
            cy="12"
            r="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8v4l2.5 2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Top ATS",
      value: !isEmpty && bestAtsScore !== null ? `${animatedBest}%` : "—",
      muted: isEmpty || bestAtsScore === null,
      accent: "indigo" as const,
      ringValue: bestAtsScore ?? 0,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-indigo-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="m12 3 2.09 4.23 4.68.68-3.39 3.3.8 4.66L12 14.77 7.82 15.9l.8-4.66-3.39-3.3 4.68-.68L12 3Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: JSX.Element;
  highlight?: boolean;
  muted?: boolean;
  accent?: "indigo" | "emerald" | "slate";
  ringValue?: number;
}

function StatCard({
  label,
  value,
  icon,
  highlight = false,
  muted = false,
  accent = "slate",
  ringValue,
}: StatCardProps) {
  const accentBg =
    accent === "emerald"
      ? "from-emerald-50 via-emerald-50 to-transparent"
      : accent === "indigo"
        ? "from-blue-50 via-blue-50 to-transparent"
        : "from-slate-50 via-slate-50 to-transparent";

  const ringColor =
    typeof ringValue === "number"
      ? ringValue >= 85
        ? "stroke-emerald-500"
        : ringValue >= 70
          ? "stroke-amber-500"
          : "stroke-rose-500"
      : "stroke-blue-500";

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/70 bg-white/80 p-3 shadow-[0_8px_22px_rgba(37,99,235,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(37,99,235,0.12)] ${highlight ? "border-emerald-200" : ""}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accentBg}`}
        aria-hidden
      />
      <div className="relative z-10 flex w-full items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500">
            {label}
          </div>
          <div className="mt-0.5 flex items-center justify-between gap-2">
            <div
              className={`text-lg font-semibold ${highlight ? "text-emerald-700" : "text-slate-900"} ${muted ? "opacity-60" : ""}`}
            >
              {value}
            </div>

            {typeof ringValue === "number" ? (
              <div className="relative h-10 w-10 shrink-0">
                <svg viewBox="0 0 36 36" className="h-10 w-10 -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    className="stroke-blue-100"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    className={ringColor}
                    strokeWidth="3"
                    strokeDasharray={`${Math.max(0, Math.min(100, ringValue))}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 grid place-items-center text-[9px] font-bold text-slate-700">
                  {ringValue}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
