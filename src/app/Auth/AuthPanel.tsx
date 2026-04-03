import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSignIn, useSignUp, useUser } from "@clerk/clerk-react";
import { Chrome, Linkedin, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

type Mode = "login" | "signup";

function modeFromPath(pathname: string): Mode {
  return pathname.startsWith("/signup") ? "signup" : "login";
}

function getClerkErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") return "Something went wrong.";
  const err = error as {
    errors?: Array<{ longMessage?: string; message?: string }>;
    message?: string;
  };
  if (err.errors?.[0]?.longMessage) return err.errors[0].longMessage;
  if (err.errors?.[0]?.message) return err.errors[0].message;
  if (typeof err.message === "string" && err.message) return err.message;
  return "Something went wrong.";
}

export function AuthPanel() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: signUpLoaded, signUp } = useSignUp();
  const { user, isLoaded: userIsLoaded } = useUser();

  const [mode, setMode] = useState<Mode>(() => {
    const m = new URLSearchParams(window.location.search).get("mode");
    if (m === "signup" || m === "login") return m;
    return modeFromPath(window.location.pathname);
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const m = searchParams.get("mode");
    if (m === "signup" || m === "login") {
      setMode(m);
      return;
    }
    setMode(modeFromPath(location.pathname));
  }, [location.pathname, searchParams]);

  useEffect(() => {
    setError("");
    setNeedsVerification(false);
    setVerificationCode("");
  }, [mode]);

  useEffect(() => {
    if (userIsLoaded && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, user, userIsLoaded]);

  const isSignup = mode === "signup";
  const clerkReady =
    signInLoaded && signUpLoaded && signIn && signUp && setActive;

  const overlayCopy = isSignup
    ? {
        title: "Start getting shortlisted.",
        subtitle: "Create your account and build ATS-optimized resumes.",
        cta: { label: "Sign In", to: "/login" },
      }
    : {
        title: "Welcome back.",
        subtitle: "Let’s fix your resume and improve your ATS score.",
        cta: { label: "Sign Up", to: "/signup" },
      };

  async function handleSocialAuth(
    strategy: "oauth_google" | "oauth_linkedin_oidc",
  ) {
    setError("");
    setLoading(true);
    try {
      if (isSignup) {
        if (!signUp) return;
        await signUp.authenticateWithRedirect({
          strategy,
          redirectUrl: "/auth/complete",
          redirectUrlComplete: "/dashboard",
        });
        return;
      }

      if (!signIn) return;
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/auth/complete",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      setError(getClerkErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!clerkReady) return;
    if (loading) return;

    setLoading(true);
    try {
      if (isSignup && needsVerification) {
        const code = verificationCode.trim();
        if (!code) {
          setError("Enter the verification code from your email.");
          setLoading(false);
          return;
        }
        const verified = await signUp.attemptEmailAddressVerification({ code });
        if (verified.status === "complete" && verified.createdSessionId) {
          await setActive({ session: verified.createdSessionId });
          navigate("/dashboard", { replace: true });
          return;
        }
        setError(
          verified.status === "missing_requirements"
            ? "Verification incomplete. Check the code and try again."
            : "Could not verify your email. Try again.",
        );
        return;
      }

      if (isSignup) {
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }
        const created = await signUp.create({
          emailAddress: email.trim(),
          password,
        });

        if (created.status === "complete" && created.createdSessionId) {
          await setActive({ session: created.createdSessionId });
          navigate("/dashboard", { replace: true });
          return;
        }

        if (
          created.status === "missing_requirements" &&
          created.unverifiedFields?.length
        ) {
          await created.prepareEmailAddressVerification({
            strategy: "email_code",
          });
          setNeedsVerification(true);
          setError(
            "We sent a code to your email. Enter it below, then submit again.",
          );
          return;
        }

        setError(
          "Sign-up could not be completed. Check your details or try another email.",
        );
        return;
      }

      const result = await signIn.create({
        strategy: "password",
        identifier: email.trim(),
        password,
      });

      if (result.status === "complete" && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        navigate("/dashboard", { replace: true });
        return;
      }

      setError(
        "Sign-in incomplete. Check your email and password, or complete any extra steps in the Clerk dashboard.",
      );
    } catch (err) {
      setError(getClerkErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // Show loading state while checking auth
  if (!userIsLoaded) {
    return (
      <div className="rm-auth-shell">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Loader2 className="size-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="rm-auth-shell">
      <div className="rm-auth-frame rm-auth" data-mode={mode}>
        <div className="rm-auth-inner">
          {/* Form (left) */}
          <div className="rm-auth-formPane">
            <div className="rm-auth-logoRow rm-auth-fadeIn">
              <Link to="/" className="rm-auth-brand">
                <div className="rm-auth-mark" aria-hidden="true">
                  R
                </div>
                <div style={{ lineHeight: 1.05 }}>
                  <div
                    style={{
                      color: "#0f172a",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      fontSize: "14px",
                    }}
                  >
                    Resumate
                  </div>
                  <div style={{ color: "#64748b", fontSize: 12 }}>
                    AI resume workspace
                  </div>
                </div>
              </Link>

              <button
                type="button"
                className="rm-btn rm-btn-secondary h-9 px-4 text-[13px]"
                onClick={() => {
                  const next: Mode = isSignup ? "login" : "signup";
                  setMode(next);
                  setSearchParams({});
                  navigate(next === "signup" ? "/signup" : "/login");
                }}
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </button>
            </div>

            <div className="rm-auth-fadeIn" style={{ animationDelay: "60ms" }}>
              <h1 className="rm-auth-title">
                {isSignup ? "Create your account" : "Welcome back"}
              </h1>
              <p className="rm-auth-subtitle" style={{ marginTop: 10 }}>
                {isSignup
                  ? "Start building an ATS-optimized resume in minutes."
                  : "Sign in to continue improving your ATS score."}
              </p>
            </div>

            <form
              className="rm-auth-fadeIn"
              style={{ marginTop: 22, animationDelay: "110ms" }}
              onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                {!needsVerification && (
                  <>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-[13px] font-medium"
                        style={{ color: "#334155" }}
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        autoComplete="email"
                        className="rm-auth-input h-11 rounded-xl"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        disabled={loading || !clerkReady}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="text-[13px] font-medium"
                          style={{ color: "#334155" }}
                        >
                          Password
                        </label>
                        {!isSignup && (
                          <a
                            href="#"
                            className="text-[12px] underline underline-offset-4 transition-colors hover:text-slate-900"
                            style={{ color: "#64748b" }}
                          >
                            Forgot password?
                          </a>
                        )}
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete={
                          isSignup ? "new-password" : "current-password"
                        }
                        className="rm-auth-input h-11 rounded-xl"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                        disabled={loading || !clerkReady}
                        required
                      />
                    </div>

                    {isSignup && (
                      <div className="space-y-2">
                        <label
                          htmlFor="confirmPassword"
                          className="text-[13px] font-medium"
                          style={{ color: "#334155" }}
                        >
                          Confirm password
                        </label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Repeat password"
                          autoComplete="new-password"
                          className="rm-auth-input h-11 rounded-xl"
                          value={confirmPassword}
                          onChange={(ev) => setConfirmPassword(ev.target.value)}
                          disabled={loading || !clerkReady}
                          required
                        />
                      </div>
                    )}
                  </>
                )}

                {isSignup && needsVerification && (
                  <div className="space-y-2">
                    <label
                      htmlFor="verificationCode"
                      className="text-[13px] font-medium"
                      style={{ color: "#334155" }}
                    >
                      Verification code
                    </label>
                    <Input
                      id="verificationCode"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="Enter code from email"
                      className="rm-auth-input h-11 rounded-xl"
                      value={verificationCode}
                      onChange={(ev) => setVerificationCode(ev.target.value)}
                      disabled={loading || !clerkReady}
                      required
                    />
                  </div>
                )}

                {error ? (
                  <p
                    role="alert"
                    className="text-[13px] leading-snug"
                    style={{ color: "#f87171" }}
                  >
                    {error}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  className="h-11 w-full rounded-full"
                  disabled={loading || !clerkReady}
                  style={{
                    background: "#1e40af",
                    boxShadow: "0 10px 24px rgba(30,64,175,0.16)",
                    transition: "all 0.2s ease",
                    opacity: loading || !clerkReady ? 0.85 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (loading || !clerkReady) return;
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 14px 30px rgba(30,64,175,0.20)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 24px rgba(30,64,175,0.16)";
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      {needsVerification ? "Verifying…" : "Please wait…"}
                    </>
                  ) : needsVerification ? (
                    "Verify email"
                  ) : isSignup ? (
                    "Create Account"
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="relative pt-3">
                  <div
                    className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
                    style={{ background: "#e2e8f0" }}
                  />
                  <div className="relative mx-auto w-fit px-3 text-[12px]">
                    <span style={{ color: "#64748b" }}>or continue with</span>
                  </div>
                </div>

                <div className="rm-auth-socialRow">
                  <button
                    type="button"
                    className="rm-auth-socialBtn"
                    aria-label="Continue with Google"
                    title="Continue with Google"
                    disabled={loading || !clerkReady}
                    onClick={() => handleSocialAuth("oauth_google")}
                  >
                    <Chrome className="size-4" />
                  </button>
                  <button
                    type="button"
                    className="rm-auth-socialBtn"
                    aria-label="Continue with LinkedIn"
                    title="Continue with LinkedIn"
                    disabled={loading || !clerkReady}
                    onClick={() => handleSocialAuth("oauth_linkedin_oidc")}
                  >
                    <Linkedin className="size-4" />
                  </button>
                </div>

                <p className="pt-2 text-center text-[13px]">
                  <span style={{ color: "#64748b" }}>
                    {isSignup
                      ? "Already have an account?"
                      : "Don't have an account?"}
                  </span>{" "}
                  <button
                    type="button"
                    onClick={() => {
                      const next: Mode = isSignup ? "login" : "signup";
                      setMode(next);
                      setSearchParams({});
                      navigate(next === "signup" ? "/signup" : "/login");
                    }}
                    className="font-medium underline underline-offset-4 hover:text-slate-900"
                    style={{ color: "#1e40af" }}
                  >
                    {isSignup ? "Sign in" : "Sign up"}
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Overlay (right) */}
          <div className="rm-auth-overlayPane">
            <div className="rm-auth-overlayContent">
              <div className="rm-auth-atsBadge">
                <div
                  style={{
                    color: "#64748b",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 2,
                  }}
                >
                  ATS score
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      color: "#15803d",
                      fontWeight: 800,
                      fontSize: 22,
                      letterSpacing: "-0.03em",
                      filter: "none",
                    }}
                  >
                    89
                  </div>
                  <div style={{ color: "#64748b", fontSize: 12 }}>/100</div>
                </div>
              </div>

              <h2
                style={{
                  fontSize: 38,
                  fontWeight: 780,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                }}
              >
                {overlayCopy.title}
              </h2>
              <p
                style={{
                  color: "#475569",
                  fontSize: 15,
                  lineHeight: 1.75,
                  maxWidth: 420,
                }}
              >
                {overlayCopy.subtitle}
              </p>

              <div style={{ marginTop: 16 }}>
                <button
                  type="button"
                  className="rm-btn rm-auth-overlayCta"
                  onClick={() => {
                    const next = overlayCopy.cta.to.includes("signup")
                      ? "signup"
                      : "login";
                    setMode(next);
                    setSearchParams({});
                    navigate(next === "signup" ? "/signup" : "/login");
                  }}
                  style={{ paddingInline: 18 }}
                >
                  {overlayCopy.cta.label}
                </button>
              </div>

              <div style={{ marginTop: 26 }}>
                <div
                  className="rm-card"
                  style={{
                    padding: 16,
                    borderRadius: 16,
                    background: "#ffffff",
                    borderColor: "#e2e8f0",
                    boxShadow: "0 18px 50px rgba(15,23,42,0.08)",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div
                        style={{
                          color: "#64748b",
                          fontSize: 12,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        ATS score
                      </div>
                      <div
                        style={{
                          color: "#0f172a",
                          fontWeight: 750,
                          fontSize: 14,
                          marginTop: 4,
                        }}
                      >
                        Green highlights mean you’re improving
                      </div>
                    </div>
                    <div
                      className="rounded-full border px-3 py-1 text-[12px] font-semibold"
                      style={{
                        borderColor: "#bbf7d0",
                        background: "#ecfdf5",
                        color: "#15803d",
                        boxShadow: "none",
                      }}
                    >
                      +18 pts
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-16 -right-16 size-[260px] rounded-full"
                  style={{
                    background: "rgba(30,64,175,0.08)",
                    filter: "blur(80px)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
