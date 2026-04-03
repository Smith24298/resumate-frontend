// FILE: components/dashboard/StatsBar.tsx
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
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 animate-pulse shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100" />
            <div className="space-y-2 w-full">
              <div className="h-3 w-20 bg-slate-100 rounded" />
              <div className="h-4 w-24 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const isEmpty = totalResumes === 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <StatCard
        label="Total Resumes"
        value={isEmpty ? "—" : totalResumes.toString()}
        muted={isEmpty}
        icon={
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-indigo-400"
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
        }
      />
      <StatCard
        label="Avg. ATS Score"
        value={
          !isEmpty && avgAtsScore !== null ? `${avgAtsScore}%` : "No data yet"
        }
        highlight={!isEmpty && avgAtsScore !== null}
        muted={isEmpty || avgAtsScore === null}
        accent="emerald"
        icon={
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-emerald-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M4 20h16" strokeLinecap="round" />
            <path d="M7 20v-7m5 7V9m5 11V4" strokeLinecap="round" />
          </svg>
        }
      />
      <StatCard
        label="Last Updated"
        value={!isEmpty && lastUpdated ? lastUpdated : "—"}
        muted={isEmpty}
        icon={
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-indigo-400"
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
        }
      />
      <StatCard
        label="Top ATS"
        value={!isEmpty && bestAtsScore !== null ? `${bestAtsScore}%` : "—"}
        muted={isEmpty || bestAtsScore === null}
        accent="indigo"
        icon={
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-indigo-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="m12 3 2.09 4.23 4.68.68-3.39 3.3.8 4.66L12 14.77 7.82 15.9l.8-4.66-3.39-3.3 4.68-.68L12 3Z" />
          </svg>
        }
      />
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
}

function StatCard({
  label,
  value,
  icon,
  highlight = false,
  muted = false,
  accent = "slate",
}: StatCardProps) {
  const accentBg =
    accent === "emerald"
      ? "from-emerald-50 via-emerald-50 to-transparent"
      : accent === "indigo"
        ? "from-blue-50 via-blue-50 to-transparent"
        : "from-slate-50 via-slate-50 to-transparent";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 flex items-center gap-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${highlight ? "border-emerald-200" : ""}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accentBg}`}
        aria-hidden
      />
      <div className="relative z-10 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 bg-slate-50">
          {icon}
        </div>
        <div>
          <div className="text-slate-500 text-[11px] uppercase tracking-[0.18em] font-medium">
            {label}
          </div>
          <div
            className={`text-2xl font-semibold mt-0.5 ${highlight ? "text-emerald-700" : "text-slate-900"} ${muted ? "opacity-60" : ""}`}
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}
