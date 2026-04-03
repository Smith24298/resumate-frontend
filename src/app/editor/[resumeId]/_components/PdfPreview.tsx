import { AlertCircle } from "lucide-react";

interface PdfPreviewProps {
  pdfUrl: string | null;
  isCompiling: boolean;
  compileError: string | null;
}

function CompileErrorPanel({ error }: { error: string }) {
  return (
    <div
      className="mx-3 mb-3 p-3 rounded-lg"
      style={{
        background: "#fff1f2",
        border: "1px solid #fecdd3",
        borderRadius: "8px",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle size={11} strokeWidth={2} style={{ color: "#e11d48" }} />
        <span
          className="font-semibold uppercase tracking-wide"
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "#e11d48",
            letterSpacing: "0.1em",
          }}
        >
          LATEX ERROR
        </span>
      </div>

      <pre
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "11px",
          color: "#be123c",
          lineHeight: 1.6,
          margin: 0,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {error}
      </pre>
    </div>
  );
}

export function PdfPreview({
  pdfUrl,
  isCompiling,
  compileError,
}: PdfPreviewProps) {
  return (
    <div className="h-full flex flex-col bg-[#f8fafc]">
      <div
        className="h-10 flex items-center justify-between px-4"
        style={{
          background: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
          fontFamily: "Inter, Poppins, sans-serif",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#1e40af" }}
          />
          <span
            className="uppercase tracking-wide text-[9.5px] text-slate-500"
            style={{ letterSpacing: "0.12em" }}
          >
            PDF PREVIEW
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="px-2 py-1 rounded text-xs font-medium"
            style={{
              background: "#eff6ff",
              color: "#1e40af",
              fontFamily: "Inter, Poppins, sans-serif",
              border: "1px solid #bfdbfe",
            }}
          >
            Live
          </div>
        </div>
      </div>

      <div
        className="flex-1 relative overflow-auto"
        style={{ background: "#f8fafc" }}
      >
        {isCompiling && (
          <div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{
              background: "rgba(248,250,252,0.75)",
              backdropFilter: "blur(4px)",
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-9 h-9 rounded-full border-2 border-blue-700 animate-spin"
                style={{
                  borderTopColor: "transparent",
                  animationDuration: "0.8s",
                }}
              />
              <span
                className="uppercase tracking-wide font-semibold"
                style={{
                  fontSize: "12px",
                  color: "#1e40af",
                  letterSpacing: "0.08em",
                  fontFamily: "Inter, Poppins, sans-serif",
                }}
              >
                COMPILING LATEX
              </span>
            </div>
          </div>
        )}

        {pdfUrl && !compileError && (
          <iframe
            src={pdfUrl}
            className="w-full h-full border-none"
            title="PDF Preview"
            style={{ background: "#ffffff" }}
          />
        )}

        {!pdfUrl && !isCompiling && !compileError && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl mb-4" style={{ opacity: 0.25 }}>
                📄
              </div>
              <div
                className="mb-2"
                style={{
                  fontSize: "14px",
                  color: "#475569",
                  fontFamily: "Inter, Poppins, sans-serif",
                }}
              >
                No preview yet
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  fontFamily: "Inter, Poppins, sans-serif",
                }}
              >
                Click Compile to generate a preview
              </div>
            </div>
          </div>
        )}
      </div>

      {compileError && <CompileErrorPanel error={compileError} />}
    </div>
  );
}
