import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Resume } from '../types/resume';
import {
  fetchResume,
  updateResume as updateResumeApi,
  downloadResumeTex as downloadResumeTexApi,
} from '../services/resumeService';
import {
  compileResume as compileResumeApi,
  createPdfUrl,
  revokePdfUrl,
} from '../services/compileService';
import { useResumeStore } from '../store/resumeStore';

export interface EditorState {
  resumeId: string;
  title: string;
  content: string;
  pdfUrl: string | null;
  atsScore: number;
  isSaving: boolean;
  isCompiling: boolean;
  compileError: string | null;
  lastSavedAt: Date | null;
}

export interface UseResumeEditorResult {
  state: EditorState;
  handleContentChange: (newContent: string) => void;
  handleSave: () => Promise<void>;
  handleDownload: () => Promise<void>;
  handleDownloadTex: () => Promise<void>;
  handleCompile: () => Promise<void>;
  isInitialized: boolean;
  notFound: boolean;
}

/**
 * Main hook for editor state management
 * Handles initialization, content changes, saves, and compile lifecycle
 */
export function useResumeEditor(
  resumeId: string
): UseResumeEditorResult {
  const { getToken } = useAuth();
  const { upsertResume } = useResumeStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [state, setState] = useState<EditorState>({
    resumeId,
    title: '',
    content: '',
    pdfUrl: null,
    atsScore: 0,
    isSaving: false,
    isCompiling: false,
    compileError: null,
    lastSavedAt: null,
  });

  // Initialize editor with resume data
  useEffect(() => {
    const initialize = async () => {
      try {
        const resume = await fetchResume(resumeId, getToken);
        setState((prev) => ({
          ...prev,
          title: resume.title || '',
          content: resume.content || '',
          atsScore: resume.atsScore || 0,
          lastSavedAt: resume.updatedAt
            ? new Date(resume.updatedAt)
            : null,
        }));
        setIsInitialized(true);
        setNotFound(false);

        // Don't auto-compile on load - let user compile manually
        // if (resume.content) {
        //   await triggerCompile(resume.content);
        // }
      } catch (err) {
        if ((err as any)?.message === 'Not found') {
          setNotFound(true);
        }
        setIsInitialized(true);
      }
    };

    initialize();
  }, [resumeId, getToken]);

  // Trigger compile (called from content changes and downloads)
  const triggerCompile = useCallback(
    async (contentToCompile: string) => {
      setState((prev) => ({
        ...prev,
        isCompiling: true,
        compileError: null,
      }));

      try {
        const blob = await compileResumeApi(contentToCompile, getToken);
        const url = createPdfUrl(blob);
        setState((prev) => ({
          ...prev,
          pdfUrl: url,
          isCompiling: false,
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          isCompiling: false,
          compileError: (err as Error).message || 'Compilation failed',
        }));
      }
    },
    [getToken]
  );

  // Handle content changes (no auto-compile)
  const handleContentChange = useCallback(
    (newContent: string) => {
      setState((prev) => ({
        ...prev,
        content: newContent,
      }));

      // Removed automatic compilation - user must click Compile button
    },
    []
  );

  // Handle manual compilation
  const handleCompile = useCallback(async () => {
    await triggerCompile(state.content);
  }, [triggerCompile, state.content]);

  // Handle save (PUT only, never creates)
  const handleSave = useCallback(async () => {
    setState((prev) => ({ ...prev, isSaving: true }));

    try {
      // Mock ATS score for now (random between 60-100)
      const mockAtsScore = Math.floor(Math.random() * 40) + 60;

      const updated = await updateResumeApi(
        resumeId,
        {
          content: state.content,
          atsScore: mockAtsScore,
        },
        getToken
      );

      setState((prev) => ({
        ...prev,
        isSaving: false,
        atsScore: mockAtsScore,
        lastSavedAt: new Date(),
      }));

      // Update global store
      upsertResume(updated);
    } catch (err) {
      setState((prev) => ({ ...prev, isSaving: false }));
      throw new Error((err as Error).message || 'Save failed');
    }
  }, [resumeId, state.content, getToken, upsertResume]);

  // Handle download
  const handleDownload = useCallback(async () => {
    setState((prev) => ({ ...prev, isCompiling: true }));

    try {
      const blob = await compileResumeApi(state.content, getToken);
      const filename = `${state.title.replace(/\s+/g, '_')}.pdf`;

      // Trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      setState((prev) => ({
        ...prev,
        isCompiling: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isCompiling: false,
        compileError: (err as Error).message || 'Download failed',
      }));
      throw new Error((err as Error).message);
    }
  }, [state.content, state.title, getToken]);

  // Handle tex download
  const handleDownloadTex = useCallback(async () => {
    await downloadResumeTexApi(state.resumeId, state.title, getToken);
  }, [state.resumeId, state.title, getToken]);

  return {
    state,
    handleContentChange,
    handleSave,
    handleDownload,
    handleDownloadTex,
    handleCompile,
    isInitialized,
    notFound,
  };
}
