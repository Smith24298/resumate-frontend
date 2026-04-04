import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Sparkles, X } from "lucide-react";
import { useResumeEditor } from "../../../lib/hooks/useResumeEditor";
import { EditorTopBar, type EditorViewMode } from "./_components/EditorTopBar";
import { LatexEditor } from "./_components/LatexEditor";
import { PdfPreview } from "./_components/PdfPreview";
import { ATSPanel } from "../../../components/ATS/ATSPanel";

export default function EditorPage({
  params,
}: {
  params: { resumeId: string };
}) {
  const navigate = useNavigate();
  const { resumeId } = params;
  const [viewMode, setViewMode] = useState<EditorViewMode>("split");
  const [splitRatio, setSplitRatio] = useState(56);
  const [liveAtsScore, setLiveAtsScore] = useState<number>(0);
  const [atsDrawerOpen, setAtsDrawerOpen] = useState(false);
  const splitContainerRef = useRef<HTMLDivElement>(null);

  const {
    state,
    handleContentChange,
    handleAtsScoreChange,
    handleSave,
    handleDownload,
    handleDownloadTex,
    handleCompile,
    autoCompileEnabled,
    autoCompileIntervalMs,
    setAutoCompileEnabled,
    setAutoCompileIntervalMs,
    isInitialized,
    notFound,
  } = useResumeEditor(resumeId);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        handleSave();
      }

      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        handleCompile();
      }

      if ((event.ctrlKey || event.metaKey) && event.key === "d") {
        event.preventDefault();
        navigate("/dashboard");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave, handleCompile, navigate]);

  useEffect(() => {
    if (isInitialized && notFound) {
      navigate("/dashboard");
    }
  }, [isInitialized, notFound, navigate]);

  useEffect(() => {
    setLiveAtsScore(state.atsScore);
  }, [state.atsScore]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f8fafc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4" />
          <p className="text-slate-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  const showEditor = viewMode === "split" || viewMode === "code";
  const showPreview = viewMode === "split" || viewMode === "preview";

  const startSplitDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (viewMode !== "split") return;

    const container = splitContainerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const minRatio = 38;
    const maxRatio = 68;

    const updateRatio = (clientX: number) => {
      const nextRatio =
        ((clientX - containerRect.left) / containerRect.width) * 100;
      setSplitRatio(Math.min(maxRatio, Math.max(minRatio, nextRatio)));
    };

    const handlePointerMove = (moveEvent: PointerEvent) => {
      updateRatio(moveEvent.clientX);
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    updateRatio(event.clientX);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  return (
    <div
      className="h-screen flex flex-col bg-[#f8fafc]"
      style={{ fontFamily: "Inter, Poppins, sans-serif" }}
    >
      <EditorTopBar
        title={state.title}
        contentLength={state.content.length}
        atsScore={liveAtsScore}
        isSaving={state.isSaving}
        isCompiling={state.isCompiling}
        autoCompileEnabled={autoCompileEnabled}
        autoCompileIntervalMs={autoCompileIntervalMs}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSave={handleSave}
        onDownload={handleDownload}
        onDownloadTex={handleDownloadTex}
        onCompile={handleCompile}
        onAutoCompileEnabledChange={setAutoCompileEnabled}
        onAutoCompileIntervalChange={setAutoCompileIntervalMs}
      />

      <div className="px-4 pt-3 pb-2 lg:hidden">
        <div
          className="inline-flex items-center gap-1 rounded-lg p-1 border"
          style={{ background: "#f1f5f9", borderColor: "#e2e8f0" }}
        >
          {[
            { key: "split", label: "Split View" },
            { key: "code", label: "Code Only" },
            { key: "preview", label: "Preview Only" },
          ].map((mode) => {
            const active = viewMode === mode.key;
            return (
              <button
                key={mode.key}
                onClick={() => setViewMode(mode.key as EditorViewMode)}
                style={{
                  borderRadius: "8px",
                  padding: "6px 10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: active ? "#ffffff" : "transparent",
                  color: active ? "#0f172a" : "#475569",
                }}
              >
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-4 pt-2">
        {viewMode === "split" ? (
          <div
            ref={splitContainerRef}
            className="h-full flex items-stretch gap-4"
          >
            {showEditor && (
              <section
                className="h-full rounded-2xl border bg-white overflow-hidden"
                style={{
                  borderColor: "#e2e8f0",
                  boxShadow: "0 10px 24px rgba(15,23,42,0.06)",
                  flex: `0 0 ${splitRatio}%`,
                  minWidth: "320px",
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-3 border-b"
                  style={{ borderColor: "#e2e8f0", background: "#f8fafc" }}
                >
                  <div>
                    <p
                      className="uppercase"
                      style={{
                        margin: 0,
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                        color: "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      Resume Editor
                    </p>
                    <p
                      style={{
                        margin: 0,
                        marginTop: "3px",
                        fontSize: "12px",
                        color: "#475569",
                      }}
                    >
                      Tip: Keep bullets concise and impact-driven for better ATS
                      readability.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        toast.info("AI improvements are coming soon.")
                      }
                      className="inline-flex items-center gap-2"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #bfdbfe",
                        background: "#eff6ff",
                        color: "#1e40af",
                        fontSize: "12px",
                        fontWeight: 600,
                        padding: "6px 10px",
                      }}
                    >
                      <Sparkles size={14} />
                      Improve with AI
                    </button>
                  </div>
                </div>

                <div className="h-[calc(100%-64px)]">
                  <LatexEditor
                    content={state.content}
                    onChange={handleContentChange}
                    isCompiling={state.isCompiling}
                  />
                </div>
              </section>
            )}

            <button
              type="button"
              onPointerDown={startSplitDrag}
              className="hidden lg:flex h-full items-center justify-center rounded-full"
              style={{
                width: "12px",
                cursor: "col-resize",
                background: "transparent",
              }}
              aria-label="Resize split view"
            >
              <div
                style={{
                  width: "4px",
                  height: "72px",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%)",
                  boxShadow: "0 4px 10px rgba(15,23,42,0.12)",
                }}
              />
            </button>

            {showPreview && (
              <div
                className="h-full flex gap-4"
                style={{
                  flex: `0 0 ${100 - splitRatio}%`,
                  minWidth: "320px",
                }}
              >
                <section
                  className="h-full rounded-2xl border bg-white overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: "#e2e8f0",
                    boxShadow: "0 10px 24px rgba(15,23,42,0.05)",
                    flex: "1 1 auto",
                    minWidth: "240px",
                  }}
                >
                  <PdfPreview
                    pdfUrl={state.pdfUrl}
                    isCompiling={state.isCompiling}
                    compileError={state.compileError}
                  />
                </section>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full grid grid-cols-1 gap-4">
            {showEditor && (
              <section
                className="h-full rounded-2xl border bg-white overflow-hidden"
                style={{
                  borderColor: "#e2e8f0",
                  boxShadow: "0 10px 24px rgba(15,23,42,0.06)",
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-3 border-b"
                  style={{ borderColor: "#e2e8f0", background: "#f8fafc" }}
                >
                  <div>
                    <p
                      className="uppercase"
                      style={{
                        margin: 0,
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                        color: "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      Resume Editor
                    </p>
                    <p
                      style={{
                        margin: 0,
                        marginTop: "3px",
                        fontSize: "12px",
                        color: "#475569",
                      }}
                    >
                      Tip: Keep bullets concise and impact-driven for better ATS
                      readability.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        toast.info("AI improvements are coming soon.")
                      }
                      className="inline-flex items-center gap-2"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #bfdbfe",
                        background: "#eff6ff",
                        color: "#1e40af",
                        fontSize: "12px",
                        fontWeight: 600,
                        padding: "6px 10px",
                      }}
                    >
                      <Sparkles size={14} />
                      Improve with AI
                    </button>
                  </div>
                </div>

                <div className="h-[calc(100%-64px)]">
                  <LatexEditor
                    content={state.content}
                    onChange={handleContentChange}
                    isCompiling={state.isCompiling}
                  />
                </div>
              </section>
            )}

            {showPreview && (
              <section
                className="h-full rounded-2xl border bg-white overflow-hidden transition-all duration-300"
                style={{
                  borderColor: "#e2e8f0",
                  boxShadow: "0 10px 24px rgba(15,23,42,0.05)",
                }}
              >
                <PdfPreview
                  pdfUrl={state.pdfUrl}
                  isCompiling={state.isCompiling}
                  compileError={state.compileError}
                />
              </section>
            )}
          </div>
        )}
      </div>

      <div className="pointer-events-none fixed bottom-4 left-4 z-40">
        <button
          type="button"
          onClick={() => setAtsDrawerOpen((prev) => !prev)}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-blue-300 bg-white px-3 py-2 text-xs font-semibold text-blue-700 shadow-[0_12px_24px_rgba(37,99,235,0.16)] transition hover:bg-blue-50"
        >
          <span className="inline-grid h-6 w-6 place-items-center rounded-lg bg-blue-100 text-[11px] font-bold text-blue-700">
            ATS
          </span>
          {atsDrawerOpen ? "Hide ATS Insights" : "Show ATS Insights"}
        </button>
      </div>

      <aside
        className={`fixed bottom-16 left-4 z-40 h-[72vh] w-[300px] max-w-[92vw] rounded-2xl border border-slate-200 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.18)] transition-transform duration-200 ${atsDrawerOpen ? "translate-y-0" : "translate-y-[120%]"}`}
        aria-hidden={!atsDrawerOpen}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
            ATS Insights
          </p>
          <button
            type="button"
            onClick={() => setAtsDrawerOpen(false)}
            className="grid h-7 w-7 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close ATS insights"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="h-[calc(100%-41px)]">
          <ATSPanel
            resumeContent={state.content}
            isCompiling={state.isCompiling}
            onScoreChange={(score) => {
              setLiveAtsScore(score);
              handleAtsScoreChange(score);
            }}
          />
        </div>
      </aside>
    </div>
  );
}
