interface SectionBreakdownProps {
  sectionScores: {
    experience: number;
    skills: number;
    projects: number;
  };
}

function tone(score: number) {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
}

function Row({ label, score }: { label: string; score: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-700">{label}</span>
        <span className="font-semibold" style={{ color: tone(score) }}>
          {score}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-blue-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${Math.max(0, Math.min(100, score))}%`,
            background: tone(score),
          }}
        />
      </div>
    </div>
  );
}

export function SectionBreakdown({ sectionScores }: SectionBreakdownProps) {
  return (
    <section
      className="rounded-2xl border p-5"
      style={{ borderColor: "#bfdbfe", background: "#ffffff" }}
    >
      <h3 className="text-sm font-semibold text-blue-700">Section Breakdown</h3>
      <div className="mt-4 space-y-4">
        <Row label="Experience" score={sectionScores.experience} />
        <Row label="Skills" score={sectionScores.skills} />
        <Row label="Projects" score={sectionScores.projects} />
      </div>
    </section>
  );
}
