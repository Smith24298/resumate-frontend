import React, { useEffect, useState } from "react";
import { RefreshCw, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { analyzeResumeFromText } from "@/lib/services/atsService";
import type { ATSAnalysisResult } from "@/lib/services/atsService";

interface ATSPanelProps {
  resumeContent: string;
  jobDescription?: string;
  isCompiling?: boolean;
  onScoreChange?: (score: number) => void;
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-emerald-700";
  if (score >= 60) return "text-amber-700";
  return "text-rose-700";
}

function getScoreBgColor(score: number) {
  if (score >= 80) return "bg-emerald-50 border-emerald-200";
  if (score >= 60) return "bg-amber-50 border-amber-200";
  return "bg-rose-50 border-rose-200";
}

export function ATSPanel({
  resumeContent,
  jobDescription = "",
  isCompiling = false,
  onScoreChange,
}: ATSPanelProps) {
  const { getToken } = useAuth();
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [lastHash, setLastHash] = useState("");
  const [resultCache, setResultCache] = useState<
    Record<string, ATSAnalysisResult>
  >({});

  const debouncedContent = useDebounce(resumeContent, 1500);
  const score = analysis?.atsScore ?? 0;
  const scoreState =
    score >= 80 ? "strong" : score >= 60 ? "average" : "needs-work";

  const buildCacheKey = async (text: string, jd: string) => {
    const payload = `${text.trim()}::${jd.trim()}`;
    const bytes = new TextEncoder().encode(payload);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  // Auto-analyze on content change (debounced)
  useEffect(() => {
    if (!debouncedContent || debouncedContent.length < 50) {
      setAnalysis(null);
      return;
    }

    const performAnalysis = async () => {
      const cacheKey = await buildCacheKey(debouncedContent, jobDescription);
      setLastHash(cacheKey);

      if (resultCache[cacheKey]) {
        setAnalysis(resultCache[cacheKey]);
        onScoreChange?.(resultCache[cacheKey].atsScore);
        return;
      }

      setLoading(true);
      setError("");

      const response = await analyzeResumeFromText(
        debouncedContent,
        jobDescription,
        getToken,
      );

      if (response.success && response.data) {
        setAnalysis(response.data);
        setResultCache((prev) => ({ ...prev, [cacheKey]: response.data! }));
        onScoreChange?.(response.data.atsScore);
      } else {
        setError(response.error || "Failed to analyze resume");
      }

      setLoading(false);
    };

    performAnalysis();
  }, [debouncedContent, getToken, jobDescription, onScoreChange, resultCache]);

  const manualRetry = async () => {
    if (!resumeContent || loading) return;

    setLoading(true);
    setError("");

    const response = await analyzeResumeFromText(
      resumeContent,
      jobDescription,
      getToken,
    );

    if (response.success && response.data) {
      setAnalysis(response.data);
      if (lastHash) {
        setResultCache((prev) => ({ ...prev, [lastHash]: response.data! }));
      }
      onScoreChange?.(response.data.atsScore);
    } else {
      setError(response.error || "Failed to analyze resume");
    }

    setLoading(false);
  };

  if (!resumeContent || resumeContent.length < 50) {
    return (
      <div className="p-4 text-center text-slate-500">
        <p className="text-sm">Start editing your resume to see ATS analysis</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto space-y-4 p-4">
      {/* Score Card */}
      {analysis && (
        <div
          className={`rounded-2xl border p-5 text-center shadow-sm ${getScoreBgColor(analysis.atsScore)}`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Current ATS Score
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="relative h-24 w-24">
              <svg viewBox="0 0 36 36" className="h-24 w-24 -rotate-90">
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
                  className={
                    scoreState === "strong"
                      ? "stroke-emerald-500"
                      : scoreState === "average"
                        ? "stroke-amber-500"
                        : "stroke-rose-500"
                  }
                  strokeWidth="3"
                  strokeDasharray={`${Math.max(0, Math.min(100, score))}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div
                  className={`text-2xl font-bold ${getScoreColor(analysis.atsScore)}`}
                >
                  {analysis.atsScore}
                </div>
              </div>
            </div>
            <div className="text-left">
              <div
                className={`text-sm font-semibold ${getScoreColor(analysis.atsScore)}`}
              >
                {analysis.atsScore >= 80
                  ? "Excellent"
                  : analysis.atsScore >= 60
                    ? "Average"
                    : "Needs Work"}
              </div>
              {typeof analysis.matchPercentage === "number" && (
                <p className="mt-1 text-sm text-slate-600">
                  Match:{" "}
                  <span className="font-semibold">
                    {analysis.matchPercentage.toFixed(0)}%
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center gap-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-blue-700">Analyzing…</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex gap-2 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-red-300 font-medium">Error</p>
            <p className="text-xs text-red-400 mt-1">{error}</p>
          </div>
        </div>
      )}

      {analysis && analysis.matchedKeywords.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            <p className="text-xs font-semibold text-slate-600">
              Matched: {analysis.matchedKeywords.length} keywords
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {analysis.matchedKeywords.slice(0, 5).map((keyword) => (
              <span
                key={keyword}
                className="inline-block px-2 py-1 text-xs bg-emerald-50 border border-emerald-200 rounded text-emerald-700"
              >
                {keyword}
              </span>
            ))}
            {analysis.matchedKeywords.length > 5 && (
              <span className="text-xs text-slate-500 px-2 py-1">
                +{analysis.matchedKeywords.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {analysis && analysis.missingKeywords.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <p className="text-xs font-semibold text-slate-600">
              Missing keywords
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {analysis.missingKeywords.slice(0, 6).map((keyword) => (
              <span
                key={keyword}
                className="inline-block px-2 py-1 text-xs bg-rose-50 border border-rose-200 rounded text-rose-700"
              >
                {keyword}
              </span>
            ))}
            {analysis.missingKeywords.length > 6 && (
              <span className="text-xs text-slate-500 px-2 py-1">
                +{analysis.missingKeywords.length - 6} more
              </span>
            )}
          </div>
        </div>
      )}

      {analysis && analysis.suggestions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            <p className="text-xs font-semibold text-slate-600">
              Top 3 suggestions
            </p>
          </div>
          <div className="space-y-2">
            {analysis.suggestions.slice(0, 3).map((suggestion, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-slate-700"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                  {idx + 1}
                </span>
                <p className="leading-5">
                  {suggestion.substring(0, 80)}
                  {suggestion.length > 80 ? "…" : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={manualRetry}
        disabled={loading || isCompiling}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 disabled:opacity-50 border border-blue-200 rounded text-blue-700 text-sm font-medium transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Recalculate
      </button>

      <p className="text-xs text-slate-500 text-center">
        Auto-recalculates 1.5s after your last edit
      </p>
    </div>
  );
}
