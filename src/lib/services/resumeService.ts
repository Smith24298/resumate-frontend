import { Resume } from '../types/resume';

const RAW_API_BASE = (
  (import.meta as ImportMeta & { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL
)?.trim();
const API_BASE = (RAW_API_BASE || 'http://localhost:4000').replace(/\/+$/, '');

async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(`${API_BASE}${path}`, init);
  } catch (error) {
    const httpLocalhostBase = API_BASE.replace(/^https:\/\/localhost/i, 'http://localhost');
    if (httpLocalhostBase !== API_BASE) {
      return fetch(`${httpLocalhostBase}${path}`, init);
    }
    throw error;
  }
}

interface UpdateResumePayload {
  content: string;
  atsScore: number;
}

interface CreateResumePayload {
  title: string;
  template?: string;
  content: string;
}

function triggerBrowserDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Update an existing resume (PUT only, never creates)
 */
export async function updateResume(
  resumeId: string,
  payload: UpdateResumePayload,
  getToken: () => Promise<string | null>
): Promise<Resume> {
  const token = await getToken();
  if (!token) throw new Error('No auth token');

  const response = await apiFetch(`/api/resumes/${resumeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...payload,
      updatedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || 'Save failed');
  }

  return response.json();
}

/**
 * Create a new resume (POST only)
 */
export async function createResume(
  payload: CreateResumePayload,
  getToken: () => Promise<string | null>
): Promise<Resume> {
  const token = await getToken();
  if (!token) throw new Error('No auth token');

  const response = await apiFetch('/api/resumes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      atsScore: 0,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || 'Create failed');
  }

  return response.json();
}

/**
 * Fetch a single resume by ID
 */
export async function fetchResume(
  resumeId: string,
  getToken: () => Promise<string | null>
): Promise<Resume> {
  const token = await getToken();
  if (!token) throw new Error('No auth token');

  const response = await apiFetch(`/api/resumes/${resumeId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    throw new Error('Not found');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch resume');
  }

  return response.json();
}

/**
 * Delete a resume
 */
export async function deleteResume(
  resumeId: string,
  getToken: () => Promise<string | null>
): Promise<void> {
  const token = await getToken();
  if (!token) throw new Error('No auth token');

  const response = await apiFetch(`/api/resumes/${resumeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Delete failed');
  }
}

/**
 * Download the stored LaTeX source file for a resume
 */
export async function downloadResumeTex(
  resumeId: string,
  title: string,
  getToken: () => Promise<string | null>
): Promise<void> {
  const token = await getToken();
  if (!token) throw new Error('No auth token');

  const response = await apiFetch(`/api/resumes/${resumeId}/source`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    throw new Error('Source file not found');
  }

  if (!response.ok) {
    throw new Error('Tex download failed');
  }

  const blob = await response.blob();
  const filename = `${title.replace(/\s+/g, '_') || 'resume'}.tex`;
  triggerBrowserDownload(blob, filename);
}
