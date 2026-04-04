import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "./LandingPage/LandingPage";
import { LoginPage } from "./Auth/LoginPage";
import { SignupPage } from "./Auth/SignupPage";
import { AuthPanel } from "./Auth/AuthPanel";
import { ProtectedDashboard } from "./pages/ProtectedDashboard";
import { EditorPageWrapper } from "./pages/EditorPageWrapper";
import { ClerkOAuthComplete } from "./pages/ClerkOAuthComplete";
import { ProtectedAtsAnalyzer } from "./pages/ProtectedAtsAnalyzer";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPanel />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<ProtectedDashboard />} />
      <Route path="/ats-analyzer" element={<ProtectedAtsAnalyzer />} />
      <Route path="/editor/:id" element={<EditorPageWrapper />} />
      <Route path="/auth/complete" element={<ClerkOAuthComplete />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
