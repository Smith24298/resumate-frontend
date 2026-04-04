import type { AtsAnalysisResult } from "../types";

interface ScoreCardProps {
  result: AtsAnalysisResult;
}

function getTone(score: number) {
  if (score >= 80) {
    return { ring: "#86efac", bg: "#ecfdf5", text: "#15803d", label: "Strong" };
  }
  if (score >= 60) {
    return {
      ring: "#fcd34d",
      bg: "#fffbeb",
      text: "#b45309",
      label: "Average",
    };
  }
  return {
    ring: "#fda4af",
    bg: "#fff1f2",
    text: "#be123c",
    label: "Needs Work",
  };
}

export function ScoreCard({ result }: ScoreCardProps) {
  const tone = getTone(result.score);

  return (
    <section
      className="rounded-2xl border p-5"
      style={{ borderColor: "#bfdbfe", background: "#ffffff" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-blue-600">
            ATS SCORE
          </p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-4xl font-bold" style={{ color: tone.text }}>
              {result.score}
            </span>
            <span className="pb-1 text-slate-500">/100</span>
          </div>
          <div
            className="mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{
              background: tone.bg,
              color: tone.text,
              border: `1px solid ${tone.ring}`,
            }}
          >
            {tone.label}
          </div>
        </div>

        {typeof result.matchPercentage === "number" && (
          <div
            className="rounded-xl border px-4 py-3 text-right"
            style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
          >
            <p className="text-xs text-blue-600 uppercase tracking-[0.1em]">
              JD Match
            </p>
            <p className="mt-1 text-2xl font-semibold text-blue-700">
              {result.matchPercentage}%
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
