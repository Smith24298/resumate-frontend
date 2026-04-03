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
  <ClerkProvider publishableKey={publishableKey ?? ""}>
    <BrowserRouter>
      <App />
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'rgba(22,27,34,0.95)',
            border: '1px solid rgba(34,211,160,0.3)',
            color: '#22d3a0',
            padding: '11px 20px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 500,
            fontFamily: 'DM Sans, sans-serif',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(20px)',
          },
          success: {
            style: {
              background: 'rgba(22,27,34,0.95)',
              border: '1px solid rgba(34,211,160,0.3)',
              color: '#22d3a0',
            },
            iconTheme: {
              primary: '#22d3a0',
              secondary: 'rgba(22,27,34,0.95)',
            },
          },
          error: {
            style: {
              background: 'rgba(30,10,15,0.95)',
              border: '1px solid rgba(255,94,126,0.3)',
              color: '#ff5e7e',
            },
            iconTheme: {
              primary: '#ff5e7e',
              secondary: 'rgba(30,10,15,0.95)',
            },
          },
        }}
        className="toast-notification"
      />
    </BrowserRouter>
  </ClerkProvider>,
);
