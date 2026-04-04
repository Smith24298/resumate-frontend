interface SuggestionsListProps {
  suggestions: string[];
}

export function SuggestionsList({ suggestions }: SuggestionsListProps) {
  return (
    <section
      className="rounded-2xl border p-5"
      style={{ borderColor: "#bfdbfe", background: "#ffffff" }}
    >
      <h3 className="text-sm font-semibold text-blue-700">
        Actionable Suggestions
      </h3>
      <ul className="mt-3 space-y-2">
        {suggestions.map((suggestion, index) => (
          <li
            key={`${index}-${suggestion}`}
            className="rounded-xl border px-3 py-2 text-sm text-slate-700"
            style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </section>
  );
}
