/**
 * ATS Service - Frontend API integration for ATS-Engine microservice
 */

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

export interface ATSAnalysisResult {
  atsScore: number;
  matchPercentage?: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  sectionScores: {
    experience: number;
    skills: number;
    projects: number;
    education?: number;
  };
}

export interface ATSAnalysisResponse {
  success: boolean;
  data?: ATSAnalysisResult;
  error?: string;
  status?: number;
  retryAfterSeconds?: number;
}

interface RawATSAnalysisResult {
  atsScore?: number;
  score?: number;
  matchPercentage?: number | null;
  matchedKeywords?: string[];
  missingKeywords?: string[];
  keywords?: {
    matched?: string[];
    missing?: string[];
  };
  suggestions?: string[];
  sectionScores?: {
    experience?: number;
    skills?: number;
    projects?: number;
    education?: number;
  };
}

function mapAtsError(status: number, upstreamMessage?: string): string {
  if (status === 429) {
    return "ATS is receiving too many requests. Please wait a few seconds and try again.";
  }

  if (status === 502 || status === 503 || status === 504) {
    return "ATS service is temporarily unavailable. Please retry shortly.";
  }

  return upstreamMessage || `API Error: ${status}`;
}

function normalizeATSResult(raw: RawATSAnalysisResult): ATSAnalysisResult {
  return {
    atsScore: Number(raw.atsScore ?? raw.score ?? 0),
    matchPercentage:
      typeof raw.matchPercentage === "number" ? raw.matchPercentage : undefined,
    matchedKeywords: Array.isArray(raw.matchedKeywords)
      ? raw.matchedKeywords
      : Array.isArray(raw.keywords?.matched)
        ? raw.keywords!.matched!
        : [],
    missingKeywords: Array.isArray(raw.missingKeywords)
      ? raw.missingKeywords
      : Array.isArray(raw.keywords?.missing)
        ? raw.keywords!.missing!
        : [],
    suggestions: Array.isArray(raw.suggestions) ? raw.suggestions : [],
    sectionScores: {
      experience: Number(raw.sectionScores?.experience ?? 0),
      skills: Number(raw.sectionScores?.skills ?? 0),
      projects: Number(raw.sectionScores?.projects ?? 0),
      ...(typeof raw.sectionScores?.education === "number"
        ? { education: Number(raw.sectionScores.education) }
        : {}),
    },
  };
}

/**
 * Analyze resume from file upload
 */
export async function analyzeResumeFromFile(
  file: File,
  jobDescription?: string,
  getToken?: () => Promise<string | null>,
  extractedResumeText?: string,
): Promise<ATSAnalysisResponse> {
  try {
    if (!file) {
      return {
        success: false,
        error: "No file provided",
      };
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "Only PDF and DOCX files are supported.",
      };
    }

    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      return {
        success: false,
        error: `File must be under ${maxSizeMB}MB.`,
      };
    }

    const formData = new FormData();
    formData.append("resume", file);
    if (jobDescription) {
      formData.append("jobDescription", jobDescription);
    }
    if (extractedResumeText) {
      formData.append("resumeText", extractedResumeText);
    }

    const headers: HeadersInit = {};
    if (getToken) {
      const token = await getToken();
      if (!token) {
        return {
          success: false,
          error: "Unauthorized. Please sign in again.",
        };
      }
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await apiFetch("/api/ats/analyze", {
      method: "POST",
      headers,
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const retryAfterRaw = response.headers.get("retry-after");
      const retryAfterSeconds = retryAfterRaw ? Number(retryAfterRaw) : undefined;
      return {
        success: false,
        status: response.status,
        retryAfterSeconds:
          typeof retryAfterSeconds === "number" && Number.isFinite(retryAfterSeconds)
            ? retryAfterSeconds
            : undefined,
        error: mapAtsError(response.status, errorData.error),
      };
    }

    const data = normalizeATSResult((await response.json()) as RawATSAnalysisResult);
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("ATS analysis error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to analyze resume",
    };
  }
}

/**
 * Analyze resume from text (for editor integration)
 */
export async function analyzeResumeFromText(
  resumeText: string,
  jobDescription?: string,
  getToken?: () => Promise<string | null>,
): Promise<ATSAnalysisResponse> {
  try {
    if (!resumeText || !resumeText.trim()) {
      return {
        success: false,
        error: "Resume text is empty",
      };
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (getToken) {
      const token = await getToken();
      if (!token) {
        return {
          success: false,
          error: "Unauthorized. Please sign in again.",
        };
      }
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await apiFetch("/api/ats/analyze", {
      method: "POST",
      headers,
      body: JSON.stringify({
        resumeText: resumeText.trim(),
        jobDescription: jobDescription ? jobDescription.trim() : "",
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const retryAfterRaw = response.headers.get("retry-after");
      const retryAfterSeconds = retryAfterRaw ? Number(retryAfterRaw) : undefined;
      return {
        success: false,
        status: response.status,
        retryAfterSeconds:
          typeof retryAfterSeconds === "number" && Number.isFinite(retryAfterSeconds)
            ? retryAfterSeconds
            : undefined,
        error: mapAtsError(response.status, errorData.error),
      };
    }

    const data = normalizeATSResult((await response.json()) as RawATSAnalysisResult);
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("ATS analysis error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to analyze resume",
    };
  }
}

/**
 * Check ATS-Engine health
 */
export async function checkAtsHealth(): Promise<boolean> {
  try {
    const response = await apiFetch("/api/ats/health", {
      credentials: "include",
    });
    return response.ok;
  } catch {
    return false;
  }
}
