import React, { useEffect, useState } from "react";
import { Bot } from "lucide-react";
import { GhostInsightFeed } from "./GhostInsightFeed";

const LOADING_MESSAGES = [
  "Parsing resume structure…",
  "Extracting skills and experience…",
  "Analyzing keyword relevance…",
  "Comparing with job description…",
  "Calculating ATS score…",
];

const GHOST_INSIGHTS = [
  "Detected 12 relevant skills…",
  "Your experience section appears strong…",
  "Some high-priority keywords may be missing…",
];

export function ATSLoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(8);
  const [ghostInsights, setGhostInsights] = useState<string[]>([
    GHOST_INSIGHTS[0],
  ]);
  const [isMessageVisible, setIsMessageVisible] = useState(true);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setIsMessageVisible(false);
      window.setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        setIsMessageVisible(true);
      }, 220);
    }, 1500);
    return () => clearInterval(messageInterval);
  }, []);

  useEffect(() => {
    const insightInterval = window.setInterval(() => {
      setGhostInsights((prev) => {
        if (prev.length < GHOST_INSIGHTS.length) {
          return [...prev, GHOST_INSIGHTS[prev.length]];
        }
        return prev;
      });
    }, 1350);
    return () => window.clearInterval(insightInterval);
  }, []);

  useEffect(() => {
    const progressInterval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 96) return prev;
        const delta = prev < 50 ? 7 : prev < 75 ? 4 : 2;
        return Math.min(96, prev + delta);
      });
    }, 500);
    return () => window.clearInterval(progressInterval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(circle_at_20%_0%,#dbeafe_0%,#f5f9ff_60%)] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full rounded-3xl border border-blue-200 bg-white/90 backdrop-blur-xl p-8 md:p-10 space-y-8 shadow-[0_20px_55px_rgba(37,99,235,0.14)]">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative w-20 h-20 rounded-2xl bg-blue-50 border border-blue-200 grid place-items-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100/80 to-blue-50 animate-pulse" />
              <div className="relative">
                <Bot className="w-8 h-8 text-blue-700" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
              AI Resume Review in Progress
            </h2>
            <p
              className={`text-base text-slate-600 h-6 transition-opacity duration-200 ${isMessageVisible ? "opacity-100" : "opacity-0"}`}
            >
              <span>{LOADING_MESSAGES[messageIndex]}</span>
            </p>

            <div className="space-y-2 pt-1">
              <div className="h-2 rounded-full bg-blue-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">
                Analysis progress: {progress}%
              </p>
            </div>
          </div>
        </div>

        <GhostInsightFeed insights={ghostInsights} />
      </div>

      <style>{`
        @keyframes ghostReveal {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-ghost-reveal {
          animation: ghostReveal 420ms ease-out forwards;
        }
      `}</style>
    </div>
  );
}
