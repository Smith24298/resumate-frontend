import React from "react";

interface GhostInsightFeedProps {
  insights: string[];
}

export function GhostInsightFeed({ insights }: GhostInsightFeedProps) {
  return (
    <div className="space-y-2 min-h-24">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Ghost Insight Feed
      </p>
      <div className="space-y-2">
        {insights.map((insight, index) => (
          <div
            key={`${insight}-${index}`}
            className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-slate-700 animate-ghost-reveal"
            style={{ animationDelay: `${index * 180}ms` }}
          >
            {insight}
          </div>
        ))}
      </div>
    </div>
  );
}
