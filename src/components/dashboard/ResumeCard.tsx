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

  return (
    <article
      className={`group flex h-full cursor-pointer flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${isTop ? "ring-2 ring-emerald-200" : ""} ${dimLow ? "opacity-95" : ""} ${className ?? ""}`}
      onClick={onEdit}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="relative grid h-12 w-12 place-items-center rounded-full bg-blue-50 ring-1 ring-blue-100">
          <FileText className="h-5 w-5 text-blue-700" />
          {isTop ? (
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700 border border-emerald-200">
              Top
            </span>
          ) : null}
        </div>

        <div className="relative grid place-items-center">
          <div className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-full border border-slate-200" />
          <div
            className={`relative grid size-14 place-items-center rounded-full border bg-gradient-to-br ${scoreTone}`}
          >
            <div className="text-[10px] uppercase tracking-[0.16em] text-current/70">
              ATS
            </div>
            <div className="text-xl font-semibold">{resume.atsScore}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3
          className="text-xl font-semibold leading-tight text-slate-900"
          title={resume.title}
        >
          {resume.title || "Untitled Resume"}
        </h3>
        <p className="text-sm text-slate-600">
          Template: {resume.template || "Modern"}
        </p>
        <p className="text-xs text-slate-500">
          Updated {timeAgo(resume.updatedAt)}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center gap-3 border-t border-slate-200 pt-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="w-full rounded-xl border border-blue-200 bg-[#eff6ff] px-4 py-2.5 text-sm font-semibold text-blue-800 transition-all duration-150 hover:bg-blue-50 hover:-translate-y-0.5"
        >
          Edit Resume →
        </button>

        <div
          className="relative"
          ref={menuRef}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setShowMenu((prev) => !prev)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
            aria-label="Open resume actions"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {showMenu && (
            <div className="absolute bottom-12 right-0 z-10 min-w-[150px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              <button
                type="button"
                className="w-full px-4 py-2.5 text-sm text-left text-slate-700 transition hover:bg-slate-50"
                onClick={() => {
                  setShowMenu(false);
                  onDownload?.();
                }}
              >
                Download PDF
              </button>
              <button
                type="button"
                className="w-full px-4 py-2.5 text-sm text-left text-red-600 transition hover:bg-slate-50"
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
      </div>
    </article>
  );
}
