import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PreviewMode = "resume" | "letter";

export function Hero() {
  const navigate = useNavigate();
  const [activePreview, setActivePreview] = useState<PreviewMode>("resume");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  const titleWords = [
    "Build",
    "a",
    "professional",
    "resume",
    "that",
    "gets",
    "shortlisted",
    "faster.",
  ];

  return (
    <section
      id="hero-section"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.14), transparent 32%), radial-gradient(circle at 80% 20%, rgba(124,58,237,0.10), transparent 28%), linear-gradient(135deg, #f8fbff 0%, #eef4ff 55%, #f8fafc 100%)",
        minHeight: "92vh",
        borderBottom: "1px solid #e2e8f0",
        position: "relative",
        overflow: "hidden",
      }}
      className="flex items-center"
    >
      <div className="rm-glow-hero" style={{ top: "-10%", right: "-10%" }} />

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(37,99,235,0.08) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.1) 70%, transparent)",
          pointerEvents: "none",
          opacity: 0.45,
        }}
      />

      {/* Subtle background shape */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-8%",
          width: "450px",
          height: "450px",
          background:
            "radial-gradient(circle, rgba(30, 64, 175, 0.04) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      <div
        className="mx-auto w-full max-w-7xl px-6 pt-28 pb-20 md:px-11 md:pt-30 md:pb-28"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <p
              style={{
                fontFamily: "Inter, Poppins, sans-serif",
                color: "#475569",
                fontSize: "14px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              Resume Builder For Serious Job Seekers
            </p>

            <h1
              style={{
                fontFamily: "var(--rm-sans)",
                color: "#0f172a",
                fontSize: "clamp(56px, 6vw, 64px)",
                lineHeight: 1.1,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: "14px",
              }}
            >
              {titleWords.map((word, index) => (
                <span
                  key={word + index}
                  style={{
                    display: "inline-block",
                    marginRight: "0.18em",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 420ms ease ${index * 45}ms, transform 420ms ease ${index * 45}ms`,
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p
              style={{
                fontFamily: "Inter, Poppins, sans-serif",
                color: "#475569",
                fontSize: "18px",
                lineHeight: 1.7,
                marginBottom: "26px",
              }}
            >
              Create a clean, recruiter-friendly resume in minutes and export it
              as high-quality PDF with an ATS-optimized structure.
            </p>

            <div className="mb-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  fontFamily: "var(--rm-sans)",
                  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  color: "#ffffff",
                  border: "1px solid rgba(37,99,235,0.26)",
                  borderRadius: "12px",
                  padding: "13px 20px",
                  fontSize: "17px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "transform 180ms ease, box-shadow 180ms ease",
                  boxShadow: "0 16px 38px rgba(37,99,235,0.24)",
                }}
              >
                Create Resume
                <ArrowRight size={16} />
              </button>

              <a
                href="#how-it-works"
                style={{
                  fontFamily: "var(--rm-sans)",
                  color: "#1d4ed8",
                  border: "1px solid rgba(191,219,254,0.9)",
                  borderRadius: "12px",
                  padding: "13px 20px",
                  fontSize: "17px",
                  fontWeight: 500,
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(10px)",
                }}
              >
                See How It Works
              </a>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["A", "M", "S", "L", "R"].map((initials, index) => (
                  <div
                    key={`${initials}-${index}`}
                    className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-blue-100 text-[11px] font-semibold text-blue-700"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p
                className="text-sm text-slate-600"
                style={{ fontFamily: "var(--rm-sans)" }}
              >
                Trusted by 10,000+ job seekers
              </p>
            </div>

            <div
              className="grid grid-cols-3 gap-4"
              style={{
                maxWidth: "440px",
                borderTop: "1px solid #e2e8f0",
                paddingTop: "14px",
                marginTop: "16px",
              }}
            >
              {[
                { value: "10,000+", label: "resumes created" },
                { value: "89%", label: "avg ATS score" },
                { value: "4.8/5", label: "user rating" },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    style={{
                      fontFamily: "var(--rm-sans)",
                      color: "#0f172a",
                      fontSize: "20px",
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    {item.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--rm-sans)",
                      color: "#64748b",
                      fontSize: "14px",
                      margin: "2px 0 0",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-start lg:pl-6">
            {/* Soft container background */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "540px",
                height: "620px",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(248,250,252,0.3) 100%)",
                border: "1px solid rgba(226, 232, 240, 0.5)",
                borderRadius: "16px",
                padding: "32px 24px",
                backdropFilter: "blur(8px)",
                transform: "rotate(-2deg)",
                boxShadow: "0 24px 70px rgba(37,99,235,0.12)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-14px",
                  left: "32px",
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "#ffffff",
                  borderRadius: "9999px",
                  padding: "8px 14px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  boxShadow: "0 12px 24px rgba(34,197,94,0.22)",
                  zIndex: 4,
                }}
              >
                ATS Optimized ✓
              </div>

              {/* Deep background layer */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  right: "16px",
                  top: "16px",
                  background: "#ffffff",
                  border: "1px solid #f1f5f9",
                  borderRadius: "12px",
                  zIndex: 0,
                }}
              />

              {/* Middle layer */}
              <div
                style={{
                  position: "absolute",
                  bottom: "8px",
                  left: "8px",
                  right: "8px",
                  top: "8px",
                  background: "#fafbfc",
                  border: "1px solid #f3f4f6",
                  borderRadius: "12px",
                  zIndex: 1,
                }}
              />

              {/* Front card - Resume preview */}
              <div
                style={{
                  position: "absolute",
                  top: "22px",
                  right: "20px",
                  width: "68%",
                  height: "88%",
                  background: "#f8f8f6",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  boxShadow:
                    activePreview === "resume"
                      ? "0 12px 28px rgba(15, 23, 42, 0.08)"
                      : "0 8px 18px rgba(15, 23, 42, 0.05)",
                  transform:
                    activePreview === "resume"
                      ? "rotate(0.3deg) translateY(0)"
                      : "rotate(-0.6deg) translateY(6px)",
                  transition:
                    "transform 220ms ease, box-shadow 220ms ease, width 220ms ease, opacity 220ms ease",
                  opacity: activePreview === "resume" ? 1 : 0.91,
                  cursor: "pointer",
                  zIndex: activePreview === "resume" ? 3 : 1,
                  overflow: "hidden",
                }}
                role="button"
                tabIndex={0}
                onClick={() => setActivePreview("resume")}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActivePreview("resume");
                  }
                }}
                aria-pressed={activePreview === "resume"}
                aria-label="Show resume preview"
              >
                <div
                  style={{
                    padding: "16px 15px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "Inter, Poppins, sans-serif",
                          color: "#0f172a",
                          fontSize: "15px",
                          fontWeight: 700,
                          letterSpacing: "-0.03em",
                          lineHeight: 1.15,
                        }}
                      >
                        ALEX
                        <br />
                        MORRISON
                      </div>
                      <div
                        style={{
                          marginTop: "3px",
                          fontFamily: "Inter, Poppins, sans-serif",
                          color: "#6b7280",
                          fontSize: "9px",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        Senior Product Designer
                      </div>
                    </div>

                    <div
                      style={{
                        width: "116px",
                        fontFamily: "Inter, Poppins, sans-serif",
                        color: "#6b7280",
                        fontSize: "8.5px",
                        lineHeight: 1.45,
                        textAlign: "right",
                        display: "grid",
                        gap: "2px",
                      }}
                    >
                      <span>alex.morrison@email.com</span>
                      <span>+1 (415) 882-3310</span>
                      <span>San Francisco, CA</span>
                      <span>linkedin.com/in/alexmorrison</span>
                    </div>
                  </div>

                  <div
                    style={{
                      height: "0.5px",
                      background: "#e2e8f0",
                      margin: "4px 0",
                    }}
                  />

                  <div>
                    <div
                      style={{
                        fontSize: "8.5px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#111827",
                        marginBottom: "4px",
                        paddingBottom: "2px",
                        borderBottom: "1.5px solid #111827",
                        display: "inline-block",
                      }}
                    >
                      Profile
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "8.5px",
                        color: "#374151",
                        lineHeight: 1.5,
                      }}
                    >
                      Senior designer with 7+ years crafting intuitive digital
                      products for B2B and consumer apps. Skilled in end-to-end
                      design, from early discovery to high-fidelity delivery.
                    </p>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "8.5px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#111827",
                        marginBottom: "4px",
                        paddingBottom: "2px",
                        borderBottom: "1.5px solid #111827",
                        display: "inline-block",
                      }}
                    >
                      Experience
                    </div>
                    <div
                      style={{
                        fontSize: "9.5px",
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      Lead Product Designer - Notion
                    </div>
                    <div
                      style={{
                        fontSize: "8.5px",
                        color: "#6b7280",
                        marginTop: "1px",
                        marginBottom: "3px",
                      }}
                    >
                      Jan 2021 - Present · San Francisco, CA
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "8.5px",
                        color: "#374151",
                        lineHeight: 1.45,
                      }}
                    >
                      • Led redesign of the mobile editor, increasing DAU
                      retention by 24%.
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "8.5px",
                        color: "#374151",
                        lineHeight: 1.45,
                      }}
                    >
                      • Managed a team of 4 designers across 3 product squads.
                    </p>

                    <div style={{ marginTop: "6px" }}>
                      <div
                        style={{
                          fontSize: "9.5px",
                          fontWeight: 600,
                          color: "#111827",
                        }}
                      >
                        UX Designer - Intercom
                      </div>
                      <div
                        style={{
                          fontSize: "8.5px",
                          color: "#6b7280",
                          marginTop: "1px",
                          marginBottom: "3px",
                        }}
                      >
                        Mar 2018 - Dec 2020 · Dublin, Ireland
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "8.5px",
                          color: "#374151",
                          lineHeight: 1.45,
                        }}
                      >
                        • Designed onboarding flows reducing time-to-value by
                        31%.
                      </p>
                      <div
                        style={{
                          fontSize: "8.5px",
                          color: "#374151",
                          lineHeight: 1.45,
                        }}
                      >
                        • Created and maintained the company-wide design system.
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "8.5px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#111827",
                        marginBottom: "4px",
                        paddingBottom: "2px",
                        borderBottom: "1.5px solid #111827",
                        display: "inline-block",
                      }}
                    >
                      Skills
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "3px",
                        marginTop: "2px",
                      }}
                    >
                      {[
                        "Figma",
                        "Prototyping",
                        "User Research",
                        "Design Systems",
                        "Framer",
                        "A/B Testing",
                        "Accessibility",
                      ].map((skill) => (
                        <span
                          key={skill}
                          style={{
                            fontSize: "8px",
                            background: "#f1f5f9",
                            color: "#374151",
                            border: "0.5px solid #e2e8f0",
                            borderRadius: "3px",
                            padding: "1.5px 5px",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "8.5px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#111827",
                        marginBottom: "4px",
                        paddingBottom: "2px",
                        borderBottom: "1.5px solid #111827",
                        display: "inline-block",
                      }}
                    >
                      Education
                    </div>
                    <div
                      style={{
                        fontSize: "9.5px",
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      BSc Interaction Design - Carnegie Mellon University
                    </div>
                    <div
                      style={{
                        fontSize: "8.5px",
                        color: "#6b7280",
                        marginTop: "1px",
                      }}
                    >
                      2014 - 2018 · Pittsburgh, PA
                    </div>
                  </div>
                </div>
              </div>

              {/* Back card - Letter preview */}
              <div
                style={{
                  position: "absolute",
                  top: "34px",
                  left: "20px",
                  width: "68%",
                  height: "90%",
                  background: "#fafafa",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  boxShadow:
                    activePreview === "letter"
                      ? "0 12px 28px rgba(15, 23, 42, 0.08)"
                      : "0 8px 18px rgba(15, 23, 42, 0.04)",
                  transform:
                    activePreview === "letter"
                      ? "rotate(-0.2deg) translateY(0)"
                      : "rotate(-0.4deg) translateY(-4px)",
                  zIndex: activePreview === "letter" ? 3 : 2,
                  transition:
                    "transform 220ms ease, box-shadow 220ms ease, width 220ms ease, opacity 220ms ease",
                  cursor: "pointer",
                  opacity: activePreview === "letter" ? 1 : 0.93,
                  overflow: "hidden",
                }}
                role="button"
                tabIndex={0}
                onClick={() => setActivePreview("letter")}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActivePreview("letter");
                  }
                }}
                aria-pressed={activePreview === "letter"}
                aria-label="Show letter preview"
              >
                <div
                  style={{
                    padding: "16px 15px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "Inter, Poppins, sans-serif",
                          color: "#111827",
                          fontSize: "15px",
                          fontWeight: 700,
                          letterSpacing: "-0.03em",
                          lineHeight: 1.15,
                        }}
                      >
                        ALEX
                        <br />
                        MORRISON
                      </div>
                      <div
                        style={{
                          marginTop: "3px",
                          fontFamily: "Inter, Poppins, sans-serif",
                          color: "#6b7280",
                          fontSize: "9px",
                          letterSpacing: "0.13em",
                          textTransform: "uppercase",
                        }}
                      >
                        Senior Product Designer
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, Poppins, sans-serif",
                          fontSize: "8.5px",
                          color: "#9ca3af",
                          marginTop: "2px",
                        }}
                      >
                        alex.morrison@email.com · +1 (415) 882-3310
                      </div>
                    </div>

                    <div
                      style={{
                        textAlign: "right",
                        fontFamily: "Inter, Poppins, sans-serif",
                        fontSize: "8.5px",
                        color: "#9ca3af",
                        lineHeight: 1.6,
                      }}
                    >
                      <div
                        style={{
                          display: "inline-block",
                          background: "#111827",
                          color: "#ffffff",
                          padding: "2px 6px",
                          fontSize: "8.5px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: "5px",
                        }}
                      >
                        Cover Letter
                      </div>
                      <div>
                        To: Sarah Cheng
                        <br />
                        Hiring Manager, Linear
                        <br />
                        March 28, 2025
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      height: "0.5px",
                      background: "#e5e7eb",
                      margin: "6px 0",
                    }}
                  />

                  <div
                    style={{
                      display: "grid",
                      gap: "7px",
                      fontFamily: "Inter, Poppins, sans-serif",
                      color: "#4b5563",
                      fontSize: "9px",
                      lineHeight: 1.65,
                    }}
                  >
                    <p style={{ margin: 0 }}>Dear Sarah,</p>
                    <p style={{ margin: 0 }}>
                      I am excited to apply for the Senior Product Designer role
                      at Linear. Your focus on helping teams ship faster aligns
                      deeply with the work I have championed at Notion.
                    </p>
                    <p style={{ margin: 0 }}>
                      Over the past seven years I have led design for complex,
                      high-scale products. At Notion, I drove a mobile editor
                      overhaul that improved DAU retention by 24%.
                    </p>
                    <p style={{ margin: 0 }}>
                      At Intercom, I rebuilt onboarding flows from the ground
                      up, cutting time-to-value by nearly a third.
                    </p>
                    <p style={{ margin: 0 }}>
                      Thank you for your time. I would love to bring the same
                      craft and product thinking to Linear.
                    </p>
                    <div
                      style={{
                        marginTop: "5px",
                        width: "70px",
                        height: "0.5px",
                        background: "#9ca3af",
                      }}
                    />
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 600,
                        color: "#111827",
                        fontSize: "9.5px",
                      }}
                    >
                      Alex Morrison
                    </p>
                    <p
                      style={{ margin: 0, fontSize: "8.5px", color: "#6b7280" }}
                    >
                      Senior Product Designer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
