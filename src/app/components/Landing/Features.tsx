import {
  BarChart2,
  FileCode,
  SplitSquareHorizontal,
  Wand2,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";

const heroFeatures = [
  {
    icon: BarChart2,
    title: "ATS Score Analyzer",
    description:
      "Scan your resume against any job description instantly. Know exactly why you're getting rejected — before you apply.",
    tag: "Most Used",
    tagColor: "#22C55E",
    tagBg: "rgba(34,197,94,0.1)",
    tagBorder: "rgba(34,197,94,0.2)",
    stat: "92% avg score",
    statLabel: "across all users",
    accent: "#22C55E",
    accentGlow: "rgba(34,197,94,0.08)",
    borderTop: "#22C55E",
  },
  {
    icon: SplitSquareHorizontal,
    title: "Live LaTeX Editor",
    description:
      "Edit raw LaTeX on the left, watch your PDF render in real time on the right. No compile wait. No guessing.",
    tag: "Fan Favorite",
    tagColor: "#A78BFA",
    tagBg: "rgba(167,139,250,0.1)",
    tagBorder: "rgba(167,139,250,0.2)",
    stat: "< 1s",
    statLabel: "render latency",
    accent: "#A78BFA",
    accentGlow: "rgba(167,139,250,0.08)",
    borderTop: "#818CF8",
  },
];

const secondaryFeatures = [
  {
    icon: Wand2,
    title: "AI Job Tailoring",
    description: "Paste a job description, get a tailored resume in seconds",
    iconColor: "#A78BFA",
    iconBg: "rgba(167,139,250,0.1)",
    iconBorder: "rgba(167,139,250,0.18)",
    bgTint: "rgba(167,139,250,0.025)",
    accentBorder: "#A78BFA",
  },
  {
    icon: FileCode,
    title: "LaTeX Generator",
    description: "Pick a template, fill your info, get production-ready LaTeX",
    iconColor: "#38BDF8",
    iconBg: "rgba(56,189,248,0.1)",
    iconBorder: "rgba(56,189,248,0.18)",
    bgTint: "rgba(56,189,248,0.018)",
    accentBorder: "#38BDF8",
  },
  {
    icon: LayoutDashboard,
    title: "Resume Dashboard",
    description: "Track all your resumes, scores, and versions in one place",
    iconColor: "#34D399",
    iconBg: "rgba(52,211,153,0.1)",
    iconBorder: "rgba(52,211,153,0.18)",
    bgTint: "rgba(52,211,153,0.018)",
    accentBorder: "#34D399",
  },
];

export function Features() {
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
            Features
          </p>
          <h2
            style={{
              color: "#0f172a",
              fontFamily: "Inter, Poppins, sans-serif",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 730,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
            }}
          >
            Everything you need to get shortlisted
          </h2>
          <p
            style={{
              color: "#64748b",
              fontFamily: "Inter, Poppins, sans-serif",
              fontSize: "15px",
              marginTop: "10px",
            }}
          >
            Two tools that change the game. Three that complete the picture.
          </p>
        </div>

        {/* Hero feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          {heroFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "28px 24px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    backgroundColor: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    color: "#1e40af",
                    fontFamily: "Inter, Poppins, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: "9999px",
                  }}
                >
                  {f.tag}
                </div>

                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: "#eff6ff",
                    border: "1px solid #dbeafe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "18px",
                  }}
                >
                  <Icon size={22} color="#1e40af" />
                </div>

                <h3
                  style={{
                    color: "#0f172a",
                    fontFamily: "Inter, Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    marginBottom: "10px",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontFamily: "Inter, Poppins, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.75,
                    marginBottom: "26px",
                  }}
                >
                  {f.description}
                </p>

                <div
                  style={{
                    borderTop: "1px solid #e2e8f0",
                    paddingTop: "18px",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "7px",
                  }}
                >
                  <span
                    style={{
                      color: "#0f172a",
                      fontFamily: "Inter, Poppins, sans-serif",
                      fontSize: "22px",
                      fontWeight: 700,
                    }}
                  >
                    {f.stat}
                  </span>
                  <span
                    style={{
                      color: "#64748b",
                      fontFamily: "Inter, Poppins, sans-serif",
                      fontSize: "13px",
                    }}
                  >
                    {f.statLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {secondaryFeatures.map((f, idx) => {
            const Icon = f.icon;
            const isHovered = hovered === idx;
            return (
              <div
                key={f.title}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  backgroundColor: isHovered ? "#f8fafc" : "#ffffff",
                  background: isHovered ? "#f8fafc" : "#ffffff",
                  border: isHovered ? "1px solid #bfdbfe" : "1px solid #e2e8f0",
                  borderLeft: isHovered
                    ? "3px solid #1e40af"
                    : "3px solid transparent",
                  borderRadius: "12px",
                  padding: "22px",
                  cursor: "pointer",
                  transform: isHovered
                    ? "translateY(-3px) scale(1.02)"
                    : "translateY(0) scale(1)",
                  transition: "all 0.22s ease",
                  boxShadow: isHovered
                    ? "0 12px 30px rgba(15,23,42,0.08)"
                    : "none",
                  animationDelay: `${idx * 0.06}s`,
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9px",
                    backgroundColor: "#eff6ff",
                    border: "1px solid #dbeafe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    transition: "all 0.22s ease",
                  }}
                >
                  <Icon size={17} color="#1e40af" />
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
                  {f.title}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontFamily: "Inter, Poppins, sans-serif",
                    fontSize: "13px",
                    lineHeight: 1.65,
                    transition: "color 0.2s ease",
                  }}
                >
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
