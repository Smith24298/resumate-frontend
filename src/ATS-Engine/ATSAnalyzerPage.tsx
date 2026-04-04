import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { analyzeAts } from "./atsService";
import type { AtsAnalysisResult } from "./types";
import { ScoreCard } from "./components/ScoreCard";
import { KeywordTags } from "./components/KeywordTags";
import { SuggestionsList } from "./components/SuggestionsList";
import { SectionBreakdown } from "./components/SectionBreakdown";

export function ATSAnalyzerPage() {
  const { getToken } = useAuth();
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AtsAnalysisResult | null>(null);

  const handleUpload = async (file: File | null) => {
    if (!file) return;

    const text = await file.text();
    setResumeText(text);
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError("Paste resume text or upload a text file first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const next = await analyzeAts(
        {
          resumeText: resumeText.trim(),
          jobDescription: jobDescription.trim() || undefined,
        },
        getToken,
      );
      setResult(next);
    } catch (err) {
      setError((err as Error).message || "ATS analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f9ff] text-slate-900 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">ATS Analyzer</h1>
          <p className="text-slate-600 text-sm">
            Analyze resume strength, keyword match, and section quality with
            actionable recommendations.
          </p>
        </header>

        <section
          className="grid gap-4 rounded-2xl border p-5"
          style={{ borderColor: "#bfdbfe", background: "#ffffff" }}
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.12em] text-blue-600">
                Resume Text
              </label>
              <textarea
                value={resumeText}
                onChange={(event) => setResumeText(event.target.value)}
                rows={12}
                className="mt-2 w-full rounded-lg border bg-blue-50 px-3 py-2 text-sm text-slate-900 outline-none"
                style={{ borderColor: "#bfdbfe" }}
                placeholder="Paste resume text here..."
              />
              <div className="mt-2">
                <input
                  type="file"
                  accept=".txt,.md"
                  onChange={(event) =>
                    void handleUpload(event.target.files?.[0] || null)
                  }
                  className="text-xs text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.12em] text-blue-600">
                Job Description (Optional)
              </label>
              <textarea
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                rows={12}
                className="mt-2 w-full rounded-lg border bg-blue-50 px-3 py-2 text-sm text-slate-900 outline-none"
                style={{ borderColor: "#bfdbfe" }}
                placeholder="Paste JD to calculate match percentage and missing keywords..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => void handleAnalyze()}
              disabled={loading}
              className="rounded-lg px-4 py-2 text-sm font-semibold"
              style={{
                background: loading ? "#93c5fd" : "#1d4ed8",
                color: "#ffffff",
              }}
            >
              {loading ? "Analyzing..." : "Analyze ATS"}
            </button>
            {error && <span className="text-sm text-rose-300">{error}</span>}
          </div>
        </section>

        {result && (
          <section className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <ScoreCard result={result} />
              <SectionBreakdown sectionScores={result.sectionScores} />
            </div>
            <div className="space-y-4">
              <KeywordTags
                matched={result.keywords.matched}
                missing={result.keywords.missing}
              />
              <SuggestionsList suggestions={result.suggestions} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
