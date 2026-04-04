interface KeywordTagsProps {
  matched: string[];
  missing: string[];
}

export function KeywordTags({ matched, missing }: KeywordTagsProps) {
  return (
    <section
      className="grid gap-4 rounded-2xl border p-5"
      style={{ borderColor: "#bfdbfe", background: "#ffffff" }}
    >
      <div>
        <h3 className="text-sm font-semibold text-emerald-700">
          Matched Keywords
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {matched.length === 0 ? (
            <p className="text-sm text-slate-500">No matched keywords yet.</p>
          ) : (
            matched.map((word) => (
              <span
                key={`match-${word}`}
                className="rounded-full border px-2.5 py-1 text-xs"
                style={{
                  borderColor: "#86efac",
                  background: "#ecfdf5",
                  color: "#15803d",
                }}
              >
                {word}
              </span>
            ))
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-rose-700">
          Missing Keywords
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {missing.length === 0 ? (
            <p className="text-sm text-slate-500">
              No missing keywords detected.
            </p>
          ) : (
            missing.map((word) => (
              <span
                key={`missing-${word}`}
                className="rounded-full border px-2.5 py-1 text-xs"
                style={{
                  borderColor: "#fda4af",
                  background: "#fff1f2",
                  color: "#be123c",
                }}
              >
                {word}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
