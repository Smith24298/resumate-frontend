import { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import { createResume } from "../../lib/services/resumeService";
import { useResumeStore } from "../../lib/store/resumeStore";
import { DEFAULT_LATEX_TEMPLATE } from "../../lib/constants/latex";

interface CreateResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (resumeId: string) => void;
}

export function CreateResumeModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateResumeModalProps) {
  const { getToken } = useAuth();
  const { upsertResume } = useResumeStore();
  const [title, setTitle] = useState("");
  const [template, setTemplate] = useState("Minimal");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsLoading(true);

    try {
      const newResume = await createResume(
        {
          title: title.trim(),
          template,
          content: DEFAULT_LATEX_TEMPLATE,
        },
        getToken,
      );

      console.log("Resume created:", newResume);

      // Add to global store
      upsertResume(newResume);

      toast.success("Resume created successfully!");
      setTitle("");
      setTemplate("Minimal");
      onClose();

      // Call onSuccess to navigate
      console.log("Navigating to editor with resumeId:", newResume.id);
      onSuccess(newResume.id);
    } catch (err) {
      const message = (err as Error).message || "Failed to create resume";
      console.error("Create resume error:", err);
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/25 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
              <Plus size={18} className="text-blue-700" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">
              Create Resume
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Resume Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
              placeholder="e.g., Software Engineer Resume"
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            />
          </div>

          {/* Template Select */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Template (Optional)
            </label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              <option value="Minimal">Minimal</option>
              <option value="Classic">Classic</option>
              <option value="Modern">Modern</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Resume"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
