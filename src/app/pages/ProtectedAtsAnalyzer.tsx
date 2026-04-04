import { Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ATSAnalyzerPage } from "../ATS-Engine/ATSAnalyzerPage";

export function ProtectedAtsAnalyzer() {
  return (
    <>
      <SignedIn>
        <ATSAnalyzerPage />
      </SignedIn>
      <SignedOut>
        <Navigate to="/login" replace />
      </SignedOut>
    </>
  );
}
