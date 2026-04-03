"use client";

import { useAuth } from "@clerk/clerk-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Resume } from "../lib/types/resume";

interface UseResumesResult {
  resumes: Resume[];
  loading: boolean;
  fetchResumes: () => Promise<void>;
  createResume: (title: string) => Promise<Resume>;
  deleteResume: (id: string) => Promise<void>;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

function mapResume(document: any): Resume {
  const createdAt = document.createdAt || document.created_at || document.$createdAt || new Date().toISOString();
  const updatedAt = document.updatedAt || document.updated_at || document.$updatedAt || createdAt;

  return {
    id: document.id || document.$id,
    userId: document.userId || document.user_id || document.userid || "",
    title: document.title || "Untitled Resume",
    content: document.content || "",
    atsScore: Number(document.atsScore ?? document.ats_score ?? 0),
    template: document.template || "Modern",
    createdAt,
    updatedAt,
  };
}

export function useResumes(_userId: string): UseResumesResult {
  const { getToken } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  const authFetch = useCallback(
    async (path: string, init?: RequestInit) => {
      const token = await getToken();
      const headers: Record<string, string> = {
        ...(init?.headers instanceof Headers
          ? Object.fromEntries(init.headers)
          : (init?.headers as Record<string, string>) || {}),
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      return fetch(`${API_BASE}${path}`, {
        ...init,
        headers,
      });
    },
    [getToken],
  );

  const fetchResumes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authFetch("/api/resumes");
      if (!response.ok) {
        throw new Error(`Failed to load resumes: ${response.status}`);
      }

      const data = await response.json();
      const mapped = Array.isArray(data) ? data.map(mapResume) : [];
      console.log("Resumes response", mapped);
      setResumes(mapped);
    } catch (error) {
      console.error("Could not fetch resumes", error);
      setResumes([]);
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    void fetchResumes();
  }, [fetchResumes]);

  const createResume = useCallback(
    async (title: string) => {
      const trimmedTitle = title.trim() || "Untitled Resume";

      const response = await authFetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmedTitle }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create resume: ${response.status}`);
      }

      const data = await response.json();
      const mapped = mapResume(data);
      setResumes((current) => [mapped, ...current]);
      return mapped;
    },
    [authFetch],
  );

  const deleteResume = useCallback(
    async (id: string) => {
      const response = await authFetch(`/api/resumes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok && response.status !== 204) {
        throw new Error(`Failed to delete resume: ${response.status}`);
      }

      setResumes((current) => current.filter((resume) => resume.id !== id));
    },
    [authFetch],
  );

  return useMemo(
    () => ({
      resumes,
      loading,
      fetchResumes,
      createResume,
      deleteResume,
    }),
    [createResume, deleteResume, fetchResumes, loading, resumes],
  );
}