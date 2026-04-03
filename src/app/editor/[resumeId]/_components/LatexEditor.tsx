import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import { Loader2 } from "lucide-react";

interface LatexEditorProps {
  content: string;
  onChange: (content: string) => void;
  isCompiling: boolean;
}

export function LatexEditor({
  content,
  onChange,
  isCompiling,
}: LatexEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    if (!editorRef.current) return;

    monaco.editor.defineTheme("resumate-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "1d4ed8" },
        { token: "string", foreground: "15803d" },
        { token: "comment", foreground: "64748b", fontStyle: "italic" },
        { token: "operator", foreground: "0f172a" },
      ],
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#0f172a",
        "editor.lineHighlightBackground": "#eff6ff",
        "editor.selectionBackground": "#bfdbfe",
        "editorLineNumber.foreground": "#94a3b8",
        "editorLineNumber.activeForeground": "#1e40af",
        "editorCursor.foreground": "#1e40af",
        "editorGutter.background": "#ffffff",
        "scrollbarSlider.background": "#cbd5e1",
        "scrollbarSlider.hoverBackground": "#94a3b8",
        "scrollbarSlider.activeBackground": "#64748b",
      },
    });

    const editor = monaco.editor.create(editorRef.current, {
      value: content,
      language: "latex",
      theme: "resumate-light",
      fontFamily: "JetBrains Mono, Fira Code, monospace",
      fontSize: 13,
      lineHeight: 22,
      fontLigatures: true,
      padding: { top: 16, bottom: 16 },
      minimap: { enabled: false },
      renderLineHighlight: "gutter",
      cursorBlinking: "phase",
      cursorSmoothCaretAnimation: "on",
      smoothScrolling: true,
      wordWrap: "on",
      bracketPairColorization: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
    });

    monacoRef.current = editor;

    const disposable = editor.onDidChangeModelContent(() => {
      const newContent = editor.getValue();
      if (newContent !== contentRef.current) {
        onChange(newContent);
      }
    });

    return () => {
      disposable.dispose();
      editor.dispose();
    };
  }, []);

  useEffect(() => {
    if (monacoRef.current && content !== monacoRef.current.getValue()) {
      monacoRef.current.setValue(content);
    }
  }, [content]);

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.updateOptions({ readOnly: isCompiling });
    }
  }, [isCompiling]);

  return (
    <div className="h-full flex flex-col bg-white">
      <div
        className="h-10 flex items-center justify-between px-4"
        style={{
          background: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
          fontFamily: "Inter, Poppins, sans-serif",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1e40af]" />
          <span
            className="uppercase tracking-wide text-[9.5px] text-slate-500"
            style={{ letterSpacing: "0.12em" }}
          >
            LATEX SOURCE
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-xs text-slate-500 font-medium"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {content.length.toLocaleString()} chars •{" "}
            {content.split("\n").length} lines
          </span>
        </div>
      </div>

      <div className="flex-1 relative bg-white">
        <div ref={editorRef} className="w-full h-full" />

        {isCompiling && (
          <div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{
              background: "rgba(255,255,255,0.7)",
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
      </div>

      <div
        className="h-6 flex items-center justify-between px-4"
        style={{
          background: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "10px",
          color: "#64748b",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "#22c55e" }}
            />
            <span>LaTeX</span>
          </div>
          <span>{isCompiling ? "⟳ Compiling" : "✓ Ready"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span>•</span>
          <span>TeX</span>
          <span>•</span>
          <span>LF</span>
        </div>
      </div>
    </div>
  );
}
