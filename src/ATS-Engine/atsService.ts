import type { AtsAnalyzePayload, AtsAnalysisResult } from "./types";

const RAW_API_BASE = (
  (import.meta as ImportMeta & { env?: { VITE_API_BASE_URL?: string } }).env
    ?.VITE_API_BASE_URL
)?.trim();
const API_BASE = (RAW_API_BASE || "http://localhost:4000").replace(/\/+$/, "");

async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(`${API_BASE}${path}`, init);
  } catch (error) {
    const httpLocalhostBase = API_BASE.replace(/^https:\/\/localhost/i, "http://localhost");
    if (httpLocalhostBase !== API_BASE) {
      return fetch(`${httpLocalhostBase}${path}`, init);
    }
    throw error;
  }
}

export async function analyzeAts(
  payload: AtsAnalyzePayload,
  getToken: () => Promise<string | null>,
): Promise<AtsAnalysisResult> {
  const token = await getToken();
  if (!token) {
    throw new Error("No auth token");
  }

  const response = await apiFetch("/api/ats/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({} as { error?: string }));
    throw new Error(data.error || `ATS analysis failed: ${response.status}`);
  }

  return response.json();
}
