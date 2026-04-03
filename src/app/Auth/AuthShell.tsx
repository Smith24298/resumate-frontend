import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface AuthShellProps {
  mode: "login" | "signup";
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthShell({ mode, title, subtitle, children }: AuthShellProps) {
  const opposite =
    mode === "login"
      ? { label: "Sign Up", href: "/signup" }
      : { label: "Sign In", href: "/login" };

  return (
    <div className="min-h-[100svh] w-full bg-[#f8fafc]">
      <div className="mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-6 py-14 lg:px-12">
          <div className="w-full max-w-[460px]">
            <div className="mb-8 flex items-center justify-between">
              <Link to="/" className="group inline-flex items-center gap-2">
                <div className="grid size-9 place-items-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
                  <span className="text-sm font-semibold tracking-tight">
                    R
                  </span>
                </div>
                <div className="leading-none">
                  <div className="text-[14px] font-semibold tracking-[-0.02em] text-slate-900">
                    Resumate
                  </div>
                  <div className="text-[12px] text-slate-500">
                    AI resume workspace
                  </div>
                </div>
              </Link>

              <Link
                to={opposite.href}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[13px] font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                {opposite.label}
                <ArrowRight className="size-4 opacity-80" />
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)] md:p-8">
              <div className="mb-6">
                <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-slate-900">
                  {title}
                </h1>
                <p className="mt-2 text-[14px] text-slate-600">{subtitle}</p>
              </div>

              {children}
            </div>

            <p className="mt-6 text-center text-[12px] text-slate-500">
              By continuing you agree to our{" "}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-slate-900"
                style={{ color: "#475569" }}
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-slate-900"
                style={{ color: "#475569" }}
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        <div className="relative hidden overflow-hidden border-l border-slate-200 lg:block bg-white">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(900px 500px at 70% 35%, rgba(30,64,175,0.10), transparent 60%), radial-gradient(700px 500px at 20% 70%, rgba(59,130,246,0.08), transparent 62%), linear-gradient(180deg, rgba(248,250,252,0.8), rgba(255,255,255,1))",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(circle at 60% 35%, black 0%, transparent 65%)",
            }}
          />

          <div className="relative flex h-full flex-col justify-between p-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[12px] text-blue-700">
                <span className="size-1.5 rounded-full bg-blue-700" />
                Built for ATS-first hiring
              </div>

              <h2 className="mt-5 text-[44px] font-semibold leading-[1.05] tracking-[-0.04em] text-slate-900">
                Your Resume Isn’t Failing You.{" "}
                <span className="text-blue-700">ATS Is.</span>
              </h2>
              <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-slate-600">
                Fix your resume in minutes. Get higher ATS scores and more
                callbacks without rewriting everything from scratch.
              </p>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[12px] uppercase tracking-[0.14em] text-slate-500">
                      Resume preview
                    </div>
                    <div className="mt-1 text-[14px] font-semibold text-slate-900">
                      Tailored for “Software Engineer”
                    </div>
                  </div>
                  <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-700">
                    ATS: 89/100
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-12 gap-3">
                  <div className="col-span-7 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="h-2 w-2/3 rounded bg-slate-200" />
                    <div className="mt-3 space-y-2">
                      <div className="h-2 w-full rounded bg-slate-200" />
                      <div className="h-2 w-11/12 rounded bg-slate-200" />
                      <div className="h-2 w-10/12 rounded bg-slate-200" />
                    </div>
                  </div>
                  <div className="col-span-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="text-[12px] font-semibold text-slate-900">
                      Improvements
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="h-2 w-full rounded bg-slate-200" />
                      <div className="h-2 w-5/6 rounded bg-slate-200" />
                      <div className="h-2 w-4/6 rounded bg-slate-200" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-blue-100 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
