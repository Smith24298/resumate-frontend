import type { Resume } from "../lib/types/resume";

interface StatsBarProps {
  resumes: Resume[];
}

function formatLastUpdated(resumes: Resume[]) {
  if (resumes.length === 0) return "N/A";

  const latest = resumes.reduce((currentLatest, resume) =>
    new Date(resume.updatedAt) > new Date(currentLatest.updatedAt) ? resume : currentLatest,
  );

  return new Date(latest.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function StatsBar({ resumes }: StatsBarProps) {
  const totalResumes = resumes.length;
  const averageAts =
    totalResumes === 0
      ? "0"
      : Math.round(resumes.reduce((sum, resume) => sum + resume.atsScore, 0) / totalResumes).toString();

  const stats = [
    { label: "Total Resumes", value: totalResumes.toString() },
    { label: "Average ATS Score", value: averageAts },
    { label: "Last Updated", value: formatLastUpdated(resumes) },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-white/10 bg-[#12121A] px-5 py-4 transition-all duration-200 hover:border-indigo-400/40"
        >
          <p className="text-xs font-medium tracking-wide text-gray-400">{stat.label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
