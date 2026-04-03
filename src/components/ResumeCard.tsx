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
  if (score < 50) return "bg-red-500/15 text-red-300 border border-red-400/30";
  if (score < 75) return "bg-amber-500/15 text-amber-300 border border-amber-400/30";
  return "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30";
}

export function ResumeCard({ resume, onEdit, onDelete }: ResumeCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-white/10 bg-[#12121A] p-5 transition-all duration-200 hover:scale-[1.01] hover:border-indigo-400/45">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-white">{resume.title}</h3>
          <p className="mt-1 text-sm text-gray-400">Last updated: {getDaysAgo(resume.updatedAt)}</p>
        </div>

        <button
          type="button"
          onClick={() => onDelete(resume.id)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-all hover:border-red-400/40 hover:text-red-300"
          aria-label={`Delete ${resume.title}`}
          title="Delete resume"
        >
          <span className="sr-only">Delete resume</span>
          <MoreVertical className="h-4 w-4 group-hover:hidden" />
          <Trash2 className="hidden h-4 w-4 group-hover:block" />
        </button>
      </div>

      <div className="mb-6">
        <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${getAtsBadgeClass(resume.atsScore)}`}>
          ATS: {resume.atsScore}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onEdit(resume.id)}
        className="mt-auto w-full rounded-lg border border-white/12 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-all hover:border-indigo-400/45 hover:bg-indigo-500/10"
      >
        Edit
      </button>
    </article>
  );
}
