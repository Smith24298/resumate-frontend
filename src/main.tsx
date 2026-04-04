import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "sonner";
import App from "./app/App.tsx";
import "./styles/index.css";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.warn(
    "[Resumate] Missing VITE_CLERK_PUBLISHABLE_KEY. Add it to .env — see .env.example",
  );
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={publishableKey ?? ""}
    signInForceRedirectUrl="/dashboard"
    signUpForceRedirectUrl="/dashboard"
    signInFallbackRedirectUrl="/dashboard"
    signUpFallbackRedirectUrl="/dashboard"
  >
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "rgba(255,255,255,0.96)",
            border: "1px solid rgba(37,99,235,0.25)",
            color: "#1d4ed8",
            padding: "11px 20px",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: 500,
            fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
            boxShadow: "0 8px 28px rgba(37,99,235,0.14)",
            backdropFilter: "blur(20px)",
          },
          success: {
            style: {
              background: "rgba(255,255,255,0.96)",
              border: "1px solid rgba(14,165,233,0.25)",
              color: "#0369a1",
            },
            iconTheme: {
              primary: "#0369a1",
              secondary: "#ffffff",
            },
          },
          error: {
            style: {
              background: "rgba(255,255,255,0.96)",
              border: "1px solid rgba(255,94,126,0.3)",
              color: "#ff5e7e",
            },
            iconTheme: {
              primary: "#ff5e7e",
              secondary: "#ffffff",
            },
          },
        }}
        className="toast-notification"
      />
    </BrowserRouter>
  </ClerkProvider>,
);
