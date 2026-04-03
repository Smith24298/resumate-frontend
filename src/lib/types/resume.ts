// FILE: lib/types/resume.ts
export interface Resume {
  id: string;
  title: string;
  atsScore: number;
  updatedAt: string;
  userId?: string;
  content?: string;
  texFileId?: string | null;
  texFileName?: string | null;
  texFileLink?: string | null;
  template?: "Modern" | "Classic" | "Minimal" | string;
  createdAt?: string;
}
