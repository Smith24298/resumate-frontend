import { create } from 'zustand';
import { Resume } from '../types/resume';

interface ResumeStore {
  resumes: Resume[];
  setResumes: (resumes: Resume[]) => void;
  upsertResume: (resume: Resume) => void;
  removeResume: (id: string) => void;
  getResume: (id: string) => Resume | undefined;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resumes: [],

  setResumes: (resumes: Resume[]) => {
    set({ resumes });
  },

  upsertResume: (resume: Resume) => {
    set((state) => {
      const existing = state.resumes.some((r) => r.id === resume.id);
      return {
        resumes: existing
          ? state.resumes.map((r) => (r.id === resume.id ? resume : r))
          : [...state.resumes, resume],
      };
    });
  },

  removeResume: (id: string) => {
    set((state) => ({
      resumes: state.resumes.filter((r) => r.id !== id),
    }));
  },

  getResume: (id: string) => {
    return get().resumes.find((r) => r.id === id);
  },
}));
