import { useAuth } from "@clerk/clerk-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { analyzeAts } from "../atsService";
import type { AtsAnalysisResult } from "../types";
import { ScoreCard } from "./ScoreCard";
import { KeywordTags } from "./KeywordTags";
import { SuggestionsList } from "./SuggestionsList";
import { SectionBreakdown } from "./SectionBreakdown";

interface ATSPanelProps {
  resumeText: string;
  onScoreChange?: (score: number) => void;
}

export function ATSPanel({ resumeText, onScoreChange }: ATSPanelProps) {
  const { getToken } = useAuth();
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AtsAnalysisResult | null>(null);
  const lastRequestRef = useRef("");

  const analyze = useCallback(
    async (force = false) => {
      const trimmedResume = resumeText.trim();
      if (!trimmedResume) return;

      const payloadKey = JSON.stringify({
        resumeText: trimmedResume,
        jobDescription: jobDescription.trim(),
      });

      if (!force && payloadKey === lastRequestRef.current) {
        return;
      }

      lastRequestRef.current = payloadKey;
      setLoading(true);
      setError(null);

      try {
        const next = await analyzeAts(
          {
            resumeText: trimmedResume,
            jobDescription: jobDescription.trim() || undefined,
          },
          getToken,
        );
        setResult(next);
        onScoreChange?.(next.score);
      } catch (err) {
        setError((err as Error).message || "Failed to analyze ATS");
      } finally {
        setLoading(false);
      }
    },
    [getToken, jobDescription, onScoreChange, resumeText],
  );

  useEffect(() => {
    if (!resumeText.trim()) return;

    const timerId = window.setTimeout(() => {
      void analyze(false);
    }, 1500);

    return () => window.clearTimeout(timerId);
  }, [analyze, resumeText, jobDescription]);

  const recalculate = useCallback(async () => {
    await analyze(true);
  }, [analyze]);

  const panelTitle = useMemo(
    () => (loading ? "Analyzing ATS..." : "ATS Feedback"),
    [loading],
  );

  return (
    <aside
      className="h-full rounded-2xl border bg-[#0b1220] text-slate-100 flex flex-col"
      style={{ borderColor: "#1f2937" }}
    >
      <div className="border-b border-slate-800 px-4 py-3">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-300">
          {panelTitle}
        </h3>
        <p className="mt-1 text-xs text-slate-400">
          Live score is debounced. Preview updates after successful compile.
        </p>
      </div>

      <div className="px-4 py-3 border-b border-slate-800">
        <label className="text-xs uppercase tracking-[0.12em] text-slate-400">
          Job Description (optional)
        </label>
        <textarea
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          rows={5}
          className="mt-2 w-full rounded-lg border bg-[#111827] px-3 py-2 text-sm text-slate-100 outline-none"
          style={{ borderColor: "#334155" }}
          placeholder="Paste job description to get keyword matching..."
        />
        <button
          type="button"
          onClick={() => void recalculate()}
          disabled={loading || !resumeText.trim()}
          className="mt-2 w-full rounded-lg px-3 py-2 text-sm font-semibold"
          style={{
            background: loading ? "#1f2937" : "#1d4ed8",
            color: "#ffffff",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Calculating..." : "Recalculate ATS"}
        </button>
      </div>

      <div className="flex-1 overflow-auto space-y-4 p-4">
        {error && (
          <div
            className="rounded-lg border px-3 py-2 text-sm"
            style={{
              borderColor: "#7f1d1d",
              background: "#450a0a",
              color: "#fecaca",
            }}
          >
            {error}
          </div>
        )}

        {result ? (
          <>
            <ScoreCard result={result} />
            <KeywordTags
              matched={result.keywords.matched}
              missing={result.keywords.missing}
            />
            <SuggestionsList suggestions={result.suggestions} />
            <SectionBreakdown sectionScores={result.sectionScores} />
          </>
        ) : (
          <div
            className="rounded-xl border px-3 py-4 text-sm text-slate-400"
            style={{ borderColor: "#334155", background: "#111827" }}
          >
            Start editing your resume and ATS analysis will appear here.
          </div>
        )}
      </div>
    </aside>
  );
}
