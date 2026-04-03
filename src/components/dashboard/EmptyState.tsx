// FILE: components/dashboard/EmptyState.tsx
interface EmptyStateProps {
  onCreateResume: () => void;
}

export function EmptyState({ onCreateResume }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center col-span-full bg-white border border-slate-200 rounded-2xl shadow-sm">
      <div className="relative mb-7">
        <div className="relative w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-200 shadow-sm">
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-blue-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M9 13h6M12 10v6" />
          </svg>
        </div>
      </div>
      <h2 className="text-slate-900 text-2xl font-semibold mt-2">
        No resumes yet
      </h2>
      <p className="text-slate-600 text-sm mt-3 max-w-md">
        Start building your first ATS-optimized resume in minutes
      </p>
      <button
        type="button"
        onClick={onCreateResume}
        className="mt-7 bg-[#1e40af] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#1d4ed8] active:scale-[0.98] transition-all duration-150 flex items-center gap-2 shadow-[0_10px_24px_rgba(30,64,175,0.18)]"
      >
        + Create your first resume
      </button>
    </div>
  );
}
