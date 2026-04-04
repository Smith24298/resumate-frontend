export interface AtsAnalysisResult {
  score: number;
  matchPercentage: number | null;
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
}

export interface AtsAnalyzePayload {
  resumeText: string;
  jobDescription?: string;
}
