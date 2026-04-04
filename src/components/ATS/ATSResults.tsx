import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle, TrendingUp } from "lucide-react";
import type { ATSAnalysisResult } from "@/lib/services/atsService";

interface ATSResultsProps {
  result: ATSAnalysisResult;
  onRetry: () => void;
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

function getScoreLabel(score: number) {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  return "Needs Improvement";
}

export function ATSResults({ result, onRetry }: ATSResultsProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const target = Math.max(0, Math.min(100, result.atsScore));
    const durationMs = 1000;
    const startedAt = performance.now();

    const frame = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / durationMs);
      setAnimatedScore(Math.round(target * progress));
      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    const raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [result.atsScore]);

  const sectionEntries = useMemo(
    () =>
      Object.entries(result.sectionScores).filter(
        ([, value]) => typeof value === "number",
      ) as Array<[string, number]>,
    [result.sectionScores],
  );

  const normalizedScore = Math.max(0, Math.min(100, animatedScore));

  return (
    <div className="w-full space-y-6">
      {result.atsScore > 85 ? (
        <div className="flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
          <span>Confetti ready</span>
          <span aria-hidden>✨</span>
          <span>Strong ATS match</span>
        </div>
      ) : null}

      <div
        className={`rounded-xl border p-8 text-center ${getScoreBgColor(result.atsScore)}`}
      >
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            ATS Score
          </p>
          <div className="flex items-center justify-center gap-4">
            <div>
              <div
                className={`text-6xl font-bold ${getScoreColor(result.atsScore)}`}
              >
                {normalizedScore}
                <span className="text-2xl text-slate-500"> / 100</span>
              </div>
              <p
                className={`text-lg font-semibold mt-2 ${getScoreColor(result.atsScore)}`}
              >
                {getScoreLabel(result.atsScore)}
              </p>
            </div>
            <div className="w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-blue-100"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className={getScoreColor(result.atsScore)}
                  strokeDasharray={`${(normalizedScore / 100) * 283} 283`}
                  style={{ transition: "stroke-dasharray 500ms ease" }}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
          </div>

          {result.matchPercentage !== undefined && (
            <div className="pt-4 border-t border-current border-opacity-20">
              <p className="text-sm text-slate-600">
                Job Description Match:{" "}
                <span className="font-semibold">
                  {result.matchPercentage.toFixed(1)}%
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Section Scores
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sectionEntries.map(([section, score]) => (
            <div
              key={section}
              className="bg-white border border-blue-100 rounded-lg p-4"
            >
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                {section}
              </p>
              <div className="relative h-2 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    score >= 80
                      ? "bg-green-500"
                      : score >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min(score, 100)}%` }}
                />
              </div>
              <p className="text-sm font-bold text-slate-800 mt-2">
                {score}/100
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <h3 className="text-sm font-semibold text-slate-700">
              Matched Keywords ({result.matchedKeywords.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.matchedKeywords.length > 0 ? (
              result.matchedKeywords.slice(0, 15).map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700"
                >
                  ✓ {keyword}
                </span>
              ))
            ) : (
              <p className="text-xs text-slate-500">
                No matched keywords detected
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-semibold text-slate-700">
              Missing Keywords ({result.missingKeywords.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.missingKeywords.length > 0 ? (
              result.missingKeywords.slice(0, 15).map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-50 border border-rose-200 text-rose-700"
                >
                  ✗ {keyword}
                </span>
              ))
            ) : (
              <p className="text-xs text-slate-500">
                Great! You have all key keywords
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-slate-700">
            Improvement Suggestions
          </h3>
        </div>
        <div className="space-y-2">
          {result.suggestions.length > 0 ? (
            result.suggestions.map((suggestion, idx) => (
              <div
                key={idx}
                className="flex gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200"
              >
                <span className="text-blue-400 font-bold flex-shrink-0 text-sm">
                  {idx + 1}.
                </span>
                <p className="text-sm text-slate-700">{suggestion}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No suggestions at this time
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onRetry}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
      >
        Analyze Another Resume
      </button>
    </div>
  );
}
