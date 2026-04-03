import { Upload, BarChart2, Wand2, Download } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    number: 1,
    icon: Upload,
    title: "Upload Resume",
    hint: "PDF or paste your existing content",
    color: "#818CF8",
    glow: "rgba(129,140,248,0.25)",
    border: "rgba(129,140,248,0.4)",
  },
  {
    number: 2,
    icon: BarChart2,
    title: "Analyze ATS Score",
    hint: "Instant feedback against the job description",
    color: "#22C55E",
    glow: "rgba(34,197,94,0.25)",
    border: "rgba(34,197,94,0.4)",
  },
  {
    number: 3,
    icon: Wand2,
    title: "Edit or Tailor with AI",
    hint: "Let AI rewrite or edit manually in the live editor",
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.25)",
    border: "rgba(167,139,250,0.4)",
  },
  {
    number: 4,
    icon: Download,
    title: "Download PDF",
    hint: "Beautifully formatted, recruiter-ready",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.25)",
    border: "rgba(56,189,248,0.4)",
  },
];

export function HowItWorks() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      style={{
        backgroundColor: "#f8fafc",
        paddingTop: "84px",
        paddingBottom: "84px",
      }}
      className="px-6 relative overflow-hidden"
      id="how-it-works"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p
            style={{
              color: "#64748b",
              fontFamily: "Inter, Poppins, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.08em",
            }}
            className="uppercase mb-3"
          >
            How It Works
          </p>
          <h2
            style={{
              color: "#0f172a",
              fontFamily: "Inter, Poppins, sans-serif",
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 730,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
            }}
          >
            Four steps to your best resume
          </h2>
          <p
            style={{
              color: "#64748b",
              fontFamily: "Inter, Poppins, sans-serif",
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            From upload to offer-ready in under 5 minutes.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row items-start justify-between gap-10 md:gap-4">
          {/* Connector line — dashed gradient */}
          <div
            className="hidden md:block absolute"
            style={{
              top: "28px",
              left: "calc(12.5% + 22px)",
              right: "calc(12.5% + 22px)",
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(148,163,184,0.1), rgba(148,163,184,0.6), rgba(148,163,184,0.6), rgba(148,163,184,0.1))",
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isHov = hovered === i;

            return (
              <div
                key={step.number}
                className="flex flex-col items-center text-center flex-1 relative z-10"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "default" }}
              >
                {/* Icon circle */}
                <div
                  style={
                    {
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "#ffffff",
                      border: isHov ? "2px solid #1e40af" : "2px solid #cbd5e1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "18px",
                      position: "relative",
                      boxShadow: isHov
                        ? "0 10px 20px rgba(15,23,42,0.12)"
                        : "none",
                      transition:
                        "border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
                    } as React.CSSProperties
                  }
                >
                  <Icon
                    size={22}
                    color="#1e40af"
                    style={{ transition: "color 0.25s ease" }}
                  />

                  {/* Step badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: isHov ? "#1e40af" : "#334155",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "none",
                      transition:
                        "background 0.25s ease, box-shadow 0.25s ease",
                    }}
                  >
                    <span
                      style={{
                        color: "white",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "11px",
                        fontWeight: 800,
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3
                  style={{
                    color: "#0f172a",
                    fontFamily: "Inter, Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    marginBottom: "6px",
                    transition: "color 0.2s ease",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontFamily: "Inter, Poppins, sans-serif",
                    fontSize: "13px",
                    lineHeight: 1.55,
                    maxWidth: "150px",
                    transition: "color 0.2s ease",
                  }}
                >
                  {step.hint}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
