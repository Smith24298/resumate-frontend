import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import EditorPage from "../editor/[resumeId]/page";

export function EditorPageWrapper() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <SignedIn>
        {id ? (
          <EditorPage params={{ resumeId: id }} />
        ) : (
          <Navigate to="/dashboard" replace />
        )}
      </SignedIn>
      <SignedOut>
        <Navigate to="/login" replace />
      </SignedOut>
    </>
  );
}
