import { Quote } from "lucide-react";
import { useState } from "react";

const stats = [
  { value: "500+", label: "Resumes Generated" },
  { value: "92%", label: "Average ATS Score" },
  { value: "20+", label: "Colleges Represented" },
];

const testimonials = [
  {
    quote:
      "My ATS score went from 54 to 89 after one pass with ResumeAI. I applied to 6 jobs that week and got 4 callbacks. Before this, I was getting ghosted for months.",
    name: "Aditya Sharma",
    school: "UC Berkeley, CS '25",
    initials: "AS",
    color: "#A78BFA",
    highlight: "54 → 89 ATS score. 4 callbacks in one week.",
    highlightColor: "#A78BFA",
    glowColor: "rgba(167,139,250,0.2)",
    borderHover: "rgba(167,139,250,0.35)",
  },
  {
    quote:
      "I tailored my resume for a Google SWE role in 40 seconds. It matched 91% of the job description keywords. I got the recruiter screen 3 days later.",
    name: "Priya Menon",
    school: "Georgia Tech, ECE '24",
    initials: "PM",
    color: "#34D399",
    highlight: "91% keyword match. Recruiter call in 3 days.",
    highlightColor: "#34D399",
    glowColor: "rgba(52,211,153,0.18)",
    borderHover: "rgba(52,211,153,0.35)",
  },
];

export function SocialProof() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        paddingTop: "84px",
        paddingBottom: "84px",
      }}
      className="px-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p
            style={{
              color: "#64748b",
              fontFamily: "Inter, Poppins, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.08em",
            }}
            className="uppercase mb-3"
          >
            Social Proof
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
            Real results. Real people.
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-16 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div
                style={{
                  fontFamily: "Inter, Poppins, sans-serif",
                  fontSize: "clamp(42px, 6vw, 62px)",
                  fontWeight: 760,
                  lineHeight: 1,
                  marginBottom: "8px",
                  color: "#0f172a",
                  letterSpacing: "-0.03em",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  color: "#64748b",
                  fontFamily: "Inter, Poppins, sans-serif",
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #e2e8f0", marginBottom: "48px" }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => {
            const isHov = hovered === idx;
            return (
              <div
                key={t.name}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  backgroundColor: "#f8fafc",
                  border: isHov ? "1px solid #bfdbfe" : "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "default",
                  transform: isHov ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHov
                    ? "0 14px 34px rgba(15,23,42,0.1)"
                    : "0 4px 10px rgba(15,23,42,0.05)",
                  transition:
                    "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
                }}
              >
                <Quote
                  size={22}
                  color="#1e40af"
                  style={{
                    marginBottom: "16px",
                    opacity: isHov ? 1 : 0.6,
                    transition: "opacity 0.2s ease",
                  }}
                />

                <div
                  style={{
                    backgroundColor: "#eff6ff",
                    border: `1px solid ${isHov ? "#93c5fd" : "#bfdbfe"}`,
                    borderRadius: "8px",
                    padding: "10px 14px",
                    marginBottom: "16px",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <span
                    style={{
                      color: "#1e40af",
                      fontFamily: "Inter, Poppins, sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      filter: "none",
                      transition: "filter 0.2s ease",
                    }}
                  >
                    {t.highlight}
                  </span>
                </div>

                <p
                  style={{
                    color: "#475569",
                    fontFamily: "Inter, Poppins, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.78,
                    marginBottom: "22px",
                    flex: 1,
                    fontStyle: "italic",
                  }}
                >
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#eff6ff",
                      border: `2px solid ${isHov ? "#93c5fd" : "#bfdbfe"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "border-color 0.2s ease",
                      boxShadow: "none",
                    }}
                  >
                    <span
                      style={{
                        color: "#1e40af",
                        fontFamily: "Inter, Poppins, sans-serif",
                        fontSize: "13px",
                        fontWeight: 700,
                      }}
                    >
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        color: "#0f172a",
                        fontFamily: "Inter, Poppins, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        color: "#64748b",
                        fontFamily: "Inter, Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      {t.school}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
