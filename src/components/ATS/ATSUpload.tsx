import React, { useRef, useState } from "react";
import { Monitor, Upload, X } from "lucide-react";
import type { ClientExtractionResult } from "./clientTextExtractor";
import { extractResumeTextClientSide } from "./clientTextExtractor";

interface ATSUploadProps {
  onFileSelect: (payload: {
    file: File;
    extracted: ClientExtractionResult;
  }) => void;
  isLoading: boolean;
  onJobDescriptionChange: (text: string) => void;
  jobDescription: string;
}

export function ATSUpload({
  onFileSelect,
  isLoading,
  onJobDescriptionChange,
  jobDescription,
}: ATSUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>("");
  const jobDescriptionCount = jobDescription.trim().length;

  const validateAndSelect = async (file: File) => {
    setError("");

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF and DOCX files are supported.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5MB.");
      return;
    }

    try {
      const extracted = await extractResumeTextClientSide(file);
      setSelectedFile(file);
      onFileSelect({ file, extracted });
    } catch (extractError) {
      setError(
        extractError instanceof Error
          ? extractError.message
          : "Couldn't read this file. Try a different version.",
      );
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      void validateAndSelect(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      void validateAndSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-3">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative rounded-3xl border border-blue-200 bg-blue-50/50 p-5 text-center transition-all ${
            dragActive ? "shadow-[0_0_0_1px_rgba(59,130,246,0.45)]" : ""
          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div className="rounded-2xl border border-dashed border-blue-300 bg-white px-6 py-12 sm:py-14">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              disabled={isLoading}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-blue-400/35 bg-blue-500/10">
                <Upload className="w-6 h-6 text-blue-700" />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  {
                    label: "PDF",
                    tone: "bg-blue-50 text-blue-700 border-blue-200",
                  },
                  {
                    label: "DOCX",
                    tone: "bg-indigo-50 text-indigo-700 border-indigo-200",
                  },
                ].map((chip) => (
                  <span
                    key={chip.label}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${chip.tone}`}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-semibold text-slate-900">
                  {selectedFile ? selectedFile.name : "Drop your resume here"}
                </p>
                <p className="mt-1 text-base text-slate-500">
                  PDF or DOCX · Max 5MB
                </p>
              </div>

              {!selectedFile && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="mt-3 rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                >
                  Browse Files
                </button>
              )}
            </div>
          </div>

          {selectedFile && !isLoading && (
            <button
              onClick={() => {
                setSelectedFile(null);
                setError("");
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="absolute right-4 top-4 rounded-lg p-1.5 transition-colors hover:bg-blue-100"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {selectedFile && (
          <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
            <span className="text-sm text-green-400">
              ✓ {selectedFile.name}
            </span>
            <span className="text-xs text-green-400/70">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
        )}

        {isLoading && (
          <div className="rounded-xl border border-blue-200 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
              <span>Processing</span>
              <span>Extracting text</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-blue-100">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-pulse" />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm uppercase tracking-[0.08em] text-slate-600">
          <Monitor className="h-4 w-4" />
          <span>Job Description</span>
          <span className="rounded-full border border-blue-300 bg-blue-50 px-2 py-0.5 text-[11px] normal-case text-blue-700">
            Optional
          </span>
          <span className="ml-auto text-[11px] normal-case tracking-normal text-slate-500">
            {jobDescriptionCount.toLocaleString()} chars
          </span>
        </div>
        <textarea
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          disabled={isLoading}
          placeholder="Paste the job description here to get keyword match %, gap analysis, and role-specific suggestions..."
          className="h-28 w-full resize-none rounded-xl border border-blue-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
        />
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>Focus keywords, responsibilities, and must-have skills.</span>
          <span>
            {jobDescriptionCount > 0
              ? "Live counter on"
              : "Add a job description for richer matches"}
          </span>
        </div>
      </div>
    </div>
  );
}
