import React from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export function ClerkOAuthComplete() {
  return (
    <AuthenticateWithRedirectCallback
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/dashboard"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    />
  );
}

