import { MoreVertical, Trash2 } from "lucide-react";
import type { Resume } from "../lib/types/resume";

interface ResumeCardProps {
  resume: Resume;
  onEdit: (resumeId: string) => void;
  onDelete: (resumeId: string) => void;
}

function getDaysAgo(dateString: string): string {
  const now = new Date().getTime();
  const updated = new Date(dateString).getTime();
  const diffMs = Math.max(now - updated, 0);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function getAtsBadgeClass(score: number): string {
  if (score < 50) return "bg-red-50 text-red-700 border border-red-200";
  if (score < 75) return "bg-amber-50 text-amber-700 border border-amber-200";
  return "bg-emerald-50 text-emerald-700 border border-emerald-200";
}

export function ResumeCard({ resume, onEdit, onDelete }: ResumeCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-blue-200 bg-white p-5 shadow-sm transition-all duration-200 hover:scale-[1.01] hover:border-blue-300">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-slate-900">
            {resume.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Last updated: {getDaysAgo(resume.updatedAt)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onDelete(resume.id)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-blue-200 text-slate-500 transition-all hover:border-red-300 hover:text-red-600"
          aria-label={`Delete ${resume.title}`}
          title="Delete resume"
        >
          <span className="sr-only">Delete resume</span>
          <MoreVertical className="h-4 w-4 group-hover:hidden" />
          <Trash2 className="hidden h-4 w-4 group-hover:block" />
        </button>
      </div>

      <div className="mb-6">
        <span
          className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${getAtsBadgeClass(resume.atsScore)}`}
        >
          ATS: {resume.atsScore}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onEdit(resume.id)}
        className="mt-auto w-full rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition-all hover:border-blue-300 hover:bg-blue-100"
      >
        Edit
      </button>
    </article>
  );
}
