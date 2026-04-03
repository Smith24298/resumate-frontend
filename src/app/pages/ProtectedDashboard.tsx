import React from "react";
import { Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import DashboardClient from "../dashboard/DashboardClient";

export function ProtectedDashboard() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] text-white flex items-center justify-center">
        <div
          className="animate-spin h-8 w-8 rounded-full border-2 border-white/20 border-t-white"
          aria-label="Loading dashboard"
        />
      </div>
    );
  }

  return (
    <>
      <SignedIn>
        {user ? (
          <DashboardClient
            userId={user.id}
            firstName={user.firstName ?? "there"}
            email={user.emailAddresses[0]?.emailAddress ?? ""}
          />
        ) : (
          <Navigate to="/login" replace />
        )}
      </SignedIn>
      <SignedOut>
        <Navigate to="/login" replace />
      </SignedOut>
    </>
  );
}
