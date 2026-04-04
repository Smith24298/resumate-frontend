/**
 * ATS Analysis types and interfaces
 */

export interface ATSAnalysisResult {
  score: number;
  matchPercentage?: number;
  keywords: {
    matched: string[];
    missing: string[];
  };
  suggestions: string[];
  sectionScores: {
    experience: number;
    skills: number;
    projects: number;
  };
  detectedSections: {
    experience: string | null;
    skills: string | null;
    projects: string | null;
  };
}

export interface ResumeAnalysisCache {
  resumeId: string;
  fileHash: string;
  jobDescription: string;
  analysis: ATSAnalysisResult;
  analyzedAt: number;
  expiresAt: number; // Cache expiry timestamp
}

// Local storage cache management (1 hour TTL)
const CACHE_KEY_PREFIX = "ats_analysis_";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Cache analysis results locally for better performance
 */
export function cacheAnalysis(
  resumeId: string,
  fileHash: string,
  jobDescription: string,
  analysis: ATSAnalysisResult
): void {
  try {
    const cache: ResumeAnalysisCache = {
      resumeId,
      fileHash,
      jobDescription,
      analysis,
      analyzedAt: Date.now(),
      expiresAt: Date.now() + CACHE_TTL_MS,
    };

    const key = `${CACHE_KEY_PREFIX}${resumeId}`;
    localStorage.setItem(key, JSON.stringify(cache));
  } catch (error) {
    console.error("Failed to cache analysis:", error);
  }
}

/**
 * Retrieve cached analysis if valid
 */
export function getCachedAnalysis(
  resumeId: string,
  jobDescription: string
): ATSAnalysisResult | null {
  try {
    const key = `${CACHE_KEY_PREFIX}${resumeId}`;
    const cached = localStorage.getItem(key);

    if (!cached) return null;

    const cache: ResumeAnalysisCache = JSON.parse(cached);

    // Check if cache is expired
    if (Date.now() > cache.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }

    // Check if job description matches (important for meaningful comparison)
    if (cache.jobDescription !== jobDescription) {
      return null;
    }

    return cache.analysis;
  } catch (error) {
    console.error("Failed to retrieve cached analysis:", error);
    return null;
  }
}

/**
 * Clear analysis cache for a resume
 */
export function clearAnalysisCache(resumeId: string): void {
  try {
    const key = `${CACHE_KEY_PREFIX}${resumeId}`;
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to clear analysis cache:", error);
  }
}

/**
 * Clear all ATS analysis caches
 */
export function clearAllAnalysisCaches(): void {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(CACHE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error("Failed to clear all analysis caches:", error);
  }
}
