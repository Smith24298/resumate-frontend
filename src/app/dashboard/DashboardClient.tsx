// FILE: app/dashboard/DashboardClient.tsx
"use client";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResumes } from "../../hooks/useResumes";
import { StatsBar } from "../../components/dashboard/StatsBar";
import { EmptyState } from "../../components/dashboard/EmptyState";
import { ResumeGrid } from "../../components/dashboard/ResumeGrid";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { CreateResumeModal } from "../../components/dashboard/CreateResumeModal";

interface DashboardClientProps {
  userId: string;
  firstName: string;
  email: string;
}

export default function DashboardClient({
  userId,
  firstName,
  email,
}: DashboardClientProps) {
  const { resumes, loading, fetchResumes, deleteResume } = useResumes(userId);
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSuccess = (resumeId: string) => {
    // Navigate to editor after successful creation
    console.log("handleCreateSuccess called with resumeId:", resumeId);
    navigate(`/editor/${resumeId}`);
  };

  const handleRefresh = async () => {
    await fetchResumes();
  };

  const { totalResumes, avgAtsScore, lastUpdated, topResumeId, bestAtsScore } =
    useMemo(() => {
      const total = resumes.length;
      const avg =
        total > 0
          ? Math.round(
              resumes.reduce(
                (sum: number, r: (typeof resumes)[0]) => sum + r.atsScore,
                0,
              ) / total,
            )
          : null;

      const top = total
        ? resumes.reduce(
            (best: (typeof resumes)[0], r: (typeof resumes)[0]) =>
              r.atsScore > best.atsScore ? r : best,
            resumes[0],
          )
        : null;

      const latest =
        total > 0
          ? Math.max(
              ...resumes.map((resume: (typeof resumes)[0]) =>
                new Date(resume.updatedAt).getTime(),
              ),
            )
          : null;

      return {
        totalResumes: total,
        avgAtsScore: avg,
        lastUpdated: latest ? new Date(latest).toLocaleString() : null,
        topResumeId: top?.id ?? null,
        bestAtsScore: top?.atsScore ?? null,
      };
    }, [resumes]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex">
      <Sidebar firstName={firstName} email={email} />

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                Your Resumes
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Manage and optimize your resumes for ATS
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Welcome back, {firstName} 👋
              </p>
              <p className="text-slate-500 text-[11px] mt-1">
                Logged in as: {userId}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCreate}
              className="bg-[#1e40af] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#1d4ed8] active:scale-[0.98] transition-all duration-150 flex items-center gap-2 shadow-[0_10px_24px_rgba(30,64,175,0.18)]"
            >
              + Create New Resume
            </button>
          </div>

          <StatsBar
            totalResumes={totalResumes}
            avgAtsScore={avgAtsScore}
            lastUpdated={lastUpdated}
            loading={loading}
            bestAtsScore={bestAtsScore}
          />

          <div className="text-xs text-slate-500 flex items-center gap-3">
            <span>Total resumes: {resumes.length}</span>
            <button
              type="button"
              onClick={handleRefresh}
              className="underline decoration-dotted text-slate-400 hover:text-white"
            >
              Refresh
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">
            <div className="space-y-6">
              {loading ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 text-sm text-slate-500 shadow-sm">
                  Loading resumes...
                </div>
              ) : resumes.length === 0 ? (
                <EmptyState onCreateResume={handleCreate} />
              ) : (
                <ResumeGrid
                  resumes={resumes}
                  onEdit={(id) => navigate(`/editor/${id}`)}
                  onDelete={async (id) => {
                    try {
                      await deleteResume(id);
                    } catch (error) {
                      console.error("Delete failed", error);
                    }
                  }}
                  topResumeId={topResumeId}
                />
              )}
            </div>

            <div className="space-y-4">
              <div className="text-sm text-slate-700 mb-2 flex items-center justify-between">
                <span className="font-medium">Next steps</span>
                <span className="text-xs text-slate-500">
                  {resumes.length > 0 ? "1/3 completed" : "0/3 completed"}
                </span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-sm">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className="h-full rounded-full bg-[#1e40af] transition-all duration-300"
                    style={{ width: resumes.length > 0 ? "33%" : "0%" }}
                  />
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    "Add experience with measurable impact",
                    "Match keywords from job description",
                    "Run ATS check",
                  ].map((label, idx) => (
                    <li
                      key={label}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 transition hover:border-blue-200 hover:bg-white"
                    >
                      <span
                        className={`grid h-5 w-5 place-items-center rounded-md border text-[11px] font-semibold ${idx === 0 ? "border-emerald-200 text-emerald-700" : "border-slate-300 text-slate-500"}`}
                      >
                        {idx + 1}
                      </span>
                      <span className="flex-1">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 text-sm text-slate-600 shadow-sm">
                <div className="font-semibold text-slate-900 mb-2">
                  Recent activity
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>ATS improved +10 on last edit.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
                    <span>Resume updated {lastUpdated ?? "just now"}.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CreateResumeModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleCreateSuccess}
        />
      </main>
    </div>
  );
}
