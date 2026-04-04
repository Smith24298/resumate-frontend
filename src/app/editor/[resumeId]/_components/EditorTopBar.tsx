import {
  Download,
  Save,
  Loader2,
  Play,
  ArrowLeft,
  PanelLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type EditorViewMode = "split" | "code" | "preview";

interface EditorTopBarProps {
  title: string;
  contentLength: number;
  atsScore: number;
  isSaving: boolean;
  isCompiling: boolean;
  autoCompileEnabled: boolean;
  autoCompileIntervalMs: number;
  viewMode: EditorViewMode;
  onViewModeChange: (mode: EditorViewMode) => void;
  onSave: () => Promise<void>;
  onDownload: () => Promise<void>;
  onDownloadTex: () => Promise<void>;
  onCompile: () => Promise<void>;
  onAutoCompileEnabledChange: (enabled: boolean) => void;
  onAutoCompileIntervalChange: (intervalMs: number) => void;
}

const AUTO_COMPILE_INTERVAL_OPTIONS = [
  { value: 5000, label: "5s" },
  { value: 10000, label: "10s" },
  { value: 15000, label: "15s" },
  { value: 30000, label: "30s" },
  { value: 60000, label: "60s" },
  { value: 120000, label: "120s" },
];

function AtsScorePill({
  score,
  isCompiling,
}: {
  score: number;
  isCompiling: boolean;
}) {
  const getScoreTier = (value: number) => {
    if (value >= 80)
      return {
        color: "#15803d",
        label: "Excellent",
        bg: "#ecfdf5",
        border: "#bbf7d0",
      };
    if (value >= 60)
      return {
        color: "#b45309",
        label: "Needs Improvement",
        bg: "#fffbeb",
        border: "#fde68a",
      };
    return {
      color: "#be123c",
      label: "Needs Improvement",
      bg: "#fff1f2",
      border: "#fecdd3",
    };
  };

  const tier = getScoreTier(score);

  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-transform duration-200 ${isCompiling ? "animate-pulse" : ""}`}
      style={{
        backgroundColor: tier.bg,
        borderColor: tier.border,
        boxShadow: `0 0 0 1px ${tier.border}, 0 10px 24px rgba(37,99,235,0.08)`,
      }}
    >
      {isCompiling ? (
        <Loader2
          className="h-3.5 w-3.5 animate-spin"
          style={{ color: tier.color }}
        />
      ) : (
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: tier.color, boxShadow: `0 0 0 6px ${tier.bg}` }}
        />
      )}
      <span
        className="text-[12px] font-semibold"
        style={{ color: tier.color, fontWeight: 700 }}
      >
        ATS Score: {score} - {tier.label}
      </span>
    </div>
  );
}

function ViewModeToggle({
  viewMode,
  onChange,
}: {
  viewMode: EditorViewMode;
  onChange: (mode: EditorViewMode) => void;
}) {
  const modes: Array<{ key: EditorViewMode; label: string }> = [
    { key: "split", label: "Split View" },
    { key: "code", label: "Code Only" },
    { key: "preview", label: "Preview Only" },
  ];

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full p-1"
      style={{ background: "#eff6ff", border: "1px solid #dbeafe" }}
      role="tablist"
      aria-label="Editor view mode"
    >
      {modes.map((mode) => {
        const active = viewMode === mode.key;
        return (
          <button
            key={mode.key}
            onClick={() => onChange(mode.key)}
            className="transition-all duration-200"
            style={{
              borderRadius: "9999px",
              padding: "6px 10px",
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: "Inter, Poppins, sans-serif",
              background: active ? "#ffffff" : "transparent",
              color: active ? "#0f172a" : "#475569",
              boxShadow: active ? "0 1px 3px rgba(15,23,42,0.12)" : "none",
            }}
            aria-selected={active}
            role="tab"
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}

export function EditorTopBar({
  title,
  contentLength,
  atsScore,
  isSaving,
  isCompiling,
  autoCompileEnabled,
  autoCompileIntervalMs,
  viewMode,
  onViewModeChange,
  onSave,
  onDownload,
  onDownloadTex,
  onCompile,
  onAutoCompileEnabledChange,
  onAutoCompileIntervalChange,
}: EditorTopBarProps) {
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">(
    "saved",
  );
  const [lastSaved, setLastSaved] = useState<Date>(new Date());

  useEffect(() => {
    if (isSaving) {
      setSaveStatus("saving");
    } else if (saveStatus === "saving") {
      setSaveStatus("saved");
      setLastSaved(new Date());
    }
  }, [isSaving, saveStatus]);

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case "saving":
        return "⟳ Saving…";
      case "saved": {
        const minutes = Math.floor(
          (new Date().getTime() - lastSaved.getTime()) / 60000,
        );
        return minutes === 0 ? "✓ Saved just now" : `✓ Saved ${minutes}m ago`;
      }
      case "unsaved":
        return "Unsaved · ⌘S to save";
      default:
        return "✓ Saved just now";
    }
  };

  const getSaveStatusColor = () => {
    switch (saveStatus) {
      case "saving":
        return "#64748b";
      case "saved":
        return "#15803d";
      case "unsaved":
        return "#64748b";
      default:
        return "#15803d";
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleCompile = async () => {
    try {
      await onCompile();
      toast.success("LaTeX compiled successfully");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleSave = async () => {
    try {
      await onSave();
      toast.success("Resume saved");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleDownload = async () => {
    try {
      await onDownload();
      toast.success("Resume downloaded");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleDownloadTex = async () => {
    try {
      await onDownloadTex();
      toast.success("Source file downloaded");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <div
      className="min-h-[72px] flex items-center justify-between px-6 py-3 gap-4"
      style={{
        background: "rgba(255,255,255,0.92)",
        borderBottom: "1px solid #e2e8f0",
        backdropFilter: "blur(12px)",
        fontFamily: "Inter, Poppins, sans-serif",
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={handleBackToDashboard}
          className="flex items-center justify-center transition-all duration-200 ease-in-out"
          style={{
            borderRadius: "8px",
            width: "36px",
            height: "36px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            color: "#475569",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#eef2ff";
            e.currentTarget.style.borderColor = "#c7d2fe";
            e.currentTarget.style.color = "#1e40af";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f8fafc";
            e.currentTarget.style.borderColor = "#e2e8f0";
            e.currentTarget.style.color = "#475569";
          }}
          title="Back to Dashboard (Ctrl+D)"
        >
          <ArrowLeft size={16} strokeWidth={2} />
        </button>

        <div
          className="w-[30px] h-[30px] rounded-lg flex items-center justify-center font-bold text-white"
          style={{
            background: "#1e40af",
            borderRadius: "8px",
          }}
        >
          R
        </div>

        <div className="flex flex-col min-w-0">
          <h1
            className="font-semibold truncate"
            style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}
          >
            {title} — Resume
          </h1>
          <div
            className="text-xs"
            style={{ color: getSaveStatusColor(), fontSize: "11px" }}
          >
            {getSaveStatusText()}
          </div>
        </div>

        <div className="hidden md:block ml-4 min-w-[220px]">
          <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-slate-500">
            <span>Character count</span>
            <span>{contentLength.toLocaleString()}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-blue-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 transition-all duration-300"
              style={{
                width: `${Math.min(100, Math.max(12, (contentLength / 5000) * 100))}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 justify-center">
        <ViewModeToggle viewMode={viewMode} onChange={onViewModeChange} />
      </div>

      <div className="flex items-center gap-3 flex-wrap justify-end">
        <AtsScorePill score={atsScore} isCompiling={isCompiling} />

        <div
          className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5"
          style={{ border: "1px solid #dbe3ee", background: "#ffffff" }}
        >
          <label
            className="inline-flex items-center gap-2"
            style={{ fontSize: "12px", color: "#334155", fontWeight: 600 }}
          >
            <input
              type="checkbox"
              checked={autoCompileEnabled}
              onChange={(event) =>
                onAutoCompileEnabledChange(event.target.checked)
              }
              style={{ accentColor: "#1e40af", cursor: "pointer" }}
            />
            Auto Compile
          </label>

          <select
            value={autoCompileIntervalMs}
            onChange={(event) =>
              onAutoCompileIntervalChange(Number(event.target.value))
            }
            disabled={!autoCompileEnabled}
            aria-label="Auto compile interval"
            style={{
              fontSize: "12px",
              padding: "4px 6px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              background: autoCompileEnabled ? "#ffffff" : "#f1f5f9",
              color: autoCompileEnabled ? "#0f172a" : "#64748b",
            }}
          >
            {AUTO_COMPILE_INTERVAL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div
          className="w-px"
          style={{ height: "20px", backgroundColor: "#e2e8f0" }}
        />

        <div
          className="inline-flex items-center rounded-lg overflow-hidden"
          style={{ border: "1px solid #dbe3ee", background: "#ffffff" }}
        >
          <button
            onClick={handleSave}
            className="flex items-center gap-2 transition-all duration-200 ease-in-out"
            style={{
              borderRadius: 0,
              fontSize: "12.5px",
              fontWeight: 600,
              padding: "8px 14px",
              fontFamily: "Inter, Poppins, sans-serif",
              background: "#1e40af",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            {isSaving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            {isSaving ? "Saving..." : "Save"}
          </button>

          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className="flex items-center gap-2 transition-all duration-200 ease-in-out"
            style={{
              borderRadius: 0,
              fontSize: "12.5px",
              fontWeight: 600,
              padding: "8px 14px",
              fontFamily: "Inter, Poppins, sans-serif",
              background: isCompiling ? "#e2e8f0" : "#eff6ff",
              border: "none",
              borderLeft: "1px solid #dbe3ee",
              color: isCompiling ? "#64748b" : "#1e40af",
              cursor: isCompiling ? "not-allowed" : "pointer",
            }}
          >
            {isCompiling ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Play size={14} fill="currentColor" />
            )}
            {isCompiling ? "Compiling..." : "Compile"}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 transition-all duration-200 ease-in-out"
            style={{
              borderRadius: 0,
              fontSize: "12.5px",
              fontWeight: 600,
              padding: "8px 14px",
              fontFamily: "Inter, Poppins, sans-serif",
              background: "#ffffff",
              border: "none",
              borderLeft: "1px solid #dbe3ee",
              color: "#334155",
              cursor: "pointer",
            }}
          >
            <Download size={14} />
            PDF
          </button>

          <button
            onClick={handleDownloadTex}
            className="flex items-center gap-2 transition-all duration-200 ease-in-out"
            style={{
              borderRadius: 0,
              fontSize: "12.5px",
              fontWeight: 600,
              padding: "8px 14px",
              fontFamily: "Inter, Poppins, sans-serif",
              background: "#ffffff",
              border: "none",
              borderLeft: "1px solid #dbe3ee",
              color: "#334155",
              cursor: "pointer",
            }}
          >
            <Download size={14} />
            .tex
          </button>
        </div>

        <button
          className="lg:hidden flex items-center justify-center"
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            border: "1px solid #dbe3ee",
            background: "#ffffff",
            color: "#334155",
          }}
          title="View mode controls available below"
        >
          <PanelLeft size={15} />
        </button>
      </div>
    </div>
  );
}
