import React, { Suspense, lazy, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Lock } from "lucide-react";
import { ATSUpload } from "@/components/ATS/ATSUpload";
import { analyzeResumeFromFile } from "@/lib/services/atsService";
import type { ATSAnalysisResult } from "@/lib/services/atsService";
import type { ClientExtractionResult } from "@/components/ATS/clientTextExtractor";

const ATSLoadingScreen = lazy(() =>
  import("@/components/ATS/ATSLoadingScreen").then((mod) => ({
    default: mod.ATSLoadingScreen,
  })),
);

const ATSResults = lazy(() =>
  import("@/components/ATS/ATSResults").then((mod) => ({
    default: mod.ATSResults,
  })),
);

type AnalysisState = "upload" | "loading" | "results" | "error";

export function ATSAnalyzerPage() {
  const { getToken } = useAuth();
  const [state, setState] = useState<AnalysisState>("upload");
  const [result, setResult] = useState<ATSAnalysisResult | null>(null);
  const [error, setError] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedResume, setExtractedResume] =
    useState<ClientExtractionResult | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  useEffect(() => {
    document.title = "ATS Analyzer - Resumate";
  }, []);

  const handleFileSelect = (payload: {
    file: File;
    extracted: ClientExtractionResult;
  }) => {
    setSelectedFile(payload.file);
    setExtractedResume(payload.extracted);
    setError("");
  };

  const handleJobDescriptionChange = (text: string) => {
    setJobDescription(text);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select a resume file");
      return;
    }

    if (!extractedResume?.text) {
      setError("Couldn't read this file. Try a different version.");
      return;
    }

    setState("loading");
    setError("");

    const response = await analyzeResumeFromFile(
      selectedFile,
      jobDescription,
      getToken,
      extractedResume.text,
    );

    if (response.success && response.data) {
      setResult(response.data);
      setState("results");
    } else {
      setError(response.error || "Failed to analyze resume");
      setState("error");
    }
  };

  const handleRetry = () => {
    setSelectedFile(null);
    setExtractedResume(null);
    setJobDescription("");
    setResult(null);
    setError("");
    setState("upload");
  };

  return (
    <>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f5f9ff_42%,#eff6ff_100%)] px-4 py-8 sm:px-6 sm:py-10">
        {state === "upload" && (
          <div className="mx-auto w-full max-w-[860px]">
            <div className="mb-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 shadow-[0_0_0_1px_rgba(124,58,237,0.08)]">
                  AI-Powered
                </span>
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 shadow-[0_0_0_1px_rgba(37,99,235,0.08)]">
                  ATS Analyzer
                </span>
              </div>

              <h1 className="bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 bg-clip-text text-4xl font-semibold tracking-[-0.03em] text-transparent">
                Resume ATS Analyzer
              </h1>
              <p className="text-xl leading-7 text-slate-600">
                Upload your resume and let our AI analyze keyword strength,
                section quality, and ATS compatibility.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-200 bg-white p-6 sm:p-8 shadow-[0_16px_45px_rgba(37,99,235,0.12)]">
              <ATSUpload
                onFileSelect={handleFileSelect}
                isLoading={false}
                onJobDescriptionChange={handleJobDescriptionChange}
                jobDescription={jobDescription}
              />

              {error && (
                <div className="mt-4 rounded-xl border border-red-500/35 bg-red-500/10 p-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={!selectedFile}
                className="mt-6 w-full rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-base font-medium text-blue-400 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-100 enabled:border-blue-500 enabled:bg-gradient-to-r enabled:from-blue-600 enabled:to-indigo-600 enabled:text-white enabled:hover:shadow-[0_16px_34px_rgba(37,99,235,0.2)]"
              >
                {selectedFile ? (
                  "Analyze Resume"
                ) : (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Lock className="h-4 w-4" /> Upload a resume to begin
                    analysis
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {state === "loading" && (
          <Suspense fallback={null}>
            <ATSLoadingScreen />
          </Suspense>
        )}

        {state === "results" && result && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h1 className="bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 bg-clip-text text-4xl md:text-5xl font-bold tracking-[-0.03em] text-transparent mb-3">
                Your Analysis Results
              </h1>
              <p className="text-lg text-slate-600">
                Here's how your resume performs against ATS systems
              </p>
            </div>

            <div className="bg-white border border-blue-200 rounded-2xl p-8">
              <Suspense fallback={null}>
                <ATSResults result={result} onRetry={handleRetry} />
              </Suspense>
            </div>
          </div>
        )}

        {state === "error" && (
          <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-red-500 mb-4">
                Analysis Failed
              </h1>
              <p className="text-slate-600 mb-8">{error}</p>
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
