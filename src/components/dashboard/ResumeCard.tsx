import { useEffect, useRef, useState } from "react";
import { FileText, MoreVertical } from "lucide-react";
import { Resume } from "../../lib/types/resume";
import { timeAgo } from "../../lib/utils/time";

interface ResumeCardProps {
  resume: Resume;
  onEdit: () => void;
  onDelete: () => void;
  onDownload?: () => void;
  isTop?: boolean;
  dimLow?: boolean;
  className?: string;
}

export function ResumeCard({
  resume,
  onEdit,
  onDelete,
  onDownload,
  isTop = false,
  dimLow = false,
  className,
}: ResumeCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const scoreTone = (() => {
    if (resume.atsScore >= 85)
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    if (resume.atsScore >= 70)
      return "border-amber-200 bg-amber-50 text-amber-700";
    return "border-rose-200 bg-rose-50 text-rose-700";
  })();

  const statusLabel =
    resume.atsScore >= 85
      ? "Ready"
      : resume.atsScore >= 70
        ? "Almost there"
        : "Needs Improvement";

  return (
    <article
      className={`group relative flex w-full cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-[0_8px_20px_rgba(37,99,235,0.08)] ${isTop ? "ring-2 ring-emerald-200" : ""} ${dimLow ? "opacity-95" : ""} ${className ?? ""}`}
      onClick={onEdit}
    >
      <div className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 ring-1 ring-blue-100">
        <FileText className="h-4 w-4 text-blue-700" />
        {isTop ? (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.08em] text-emerald-700">
            Top
          </span>
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3
            className="truncate text-xs font-semibold leading-tight text-slate-900"
            title={resume.title}
          >
            {resume.title || "Untitled Resume"}
          </h3>
          <span className="hidden rounded-full border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700 sm:inline-flex">
            {statusLabel}
          </span>
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-slate-500">
          <span>Template: {resume.template || "Modern"}</span>
          <span>Updated {timeAgo(resume.updatedAt)}</span>
        </div>
      </div>

      <div className="relative grid h-10 w-10 shrink-0 place-items-center">
        <div className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-full border border-slate-200" />
        <div
          className={`relative grid size-10 place-items-center rounded-full border ${scoreTone}`}
        >
          <div className="text-[7px] uppercase tracking-[0.1em] text-current/70">
            ATS
          </div>
          <div className="text-[10px] font-semibold">{resume.atsScore}</div>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="rounded-md border border-blue-200 bg-[#eff6ff] px-2.5 py-1.5 text-[10px] font-semibold text-blue-800 transition-all duration-150 hover:bg-blue-50"
      >
        Edit
      </button>

      <div
        className="relative"
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
          aria-label="Open resume actions"
        >
          <MoreVertical className="h-3.5 w-3.5" />
        </button>
        {showMenu && (
          <div className="absolute right-0 top-9 z-10 min-w-[140px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
            <button
              type="button"
              className="w-full px-3 py-2 text-left text-xs text-slate-700 transition hover:bg-slate-50"
              onClick={() => {
                setShowMenu(false);
                onDownload?.();
              }}
            >
              Download PDF
            </button>
            <button
              type="button"
              className="w-full px-3 py-2 text-left text-xs text-red-600 transition hover:bg-slate-50"
              onClick={() => {
                onDelete();
                setShowMenu(false);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
