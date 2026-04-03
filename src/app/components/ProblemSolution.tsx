import { X, AlertTriangle, Clock, ChevronDown } from "lucide-react";

const painCards = [
  {
    icon: X,
    iconColor: "#F87171",
    iconBg: "rgba(248,113,113,0.08)",
    borderColor: "rgba(248,113,113,0.15)",
    borderHover: "rgba(248,113,113,0.35)",
    glowHover: "rgba(248,113,113,0.08)",
    title: "You rewrite from scratch. Every. Time.",
    stinger: "Even when nothing actually changed.",
    body: "No AI. No automation. Just you, manually tweaking LaTeX at midnight before a deadline.",
  },
  {
    icon: AlertTriangle,
    iconColor: "#FBBF24",
    iconBg: "rgba(251,191,36,0.08)",
    borderColor: "rgba(251,191,36,0.15)",
    borderHover: "rgba(251,191,36,0.35)",
    glowHover: "rgba(251,191,36,0.07)",
    title: "Most ATS scores are random and useless.",
    stinger: "You're optimizing for a system you don't understand.",
    body: "Shady websites spit out a number with zero explanation. You fail in silence.",
  },
  {
    icon: Clock,
    iconColor: "#60A5FA",
    iconBg: "rgba(96,165,250,0.08)",
    borderColor: "rgba(96,165,250,0.15)",
    borderHover: "rgba(96,165,250,0.35)",
    glowHover: "rgba(96,165,250,0.07)",
    title: "Every job description means starting over.",
    stinger: "You're not bad at resumes — you're just exhausted.",
    body: "Hours rewriting the same bullet points. No version control. No system. Just chaos.",
  },
];

export function ProblemSolution() {
  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        paddingTop: "84px",
        paddingBottom: "84px",
      }}
      className="px-6"
      id="features"
    >
      <div className="max-w-5xl mx-auto">
        <p
          style={{
            color: "#64748b",
            fontFamily: "Inter, Poppins, sans-serif",
            fontSize: "12px",
            letterSpacing: "0.08em",
          }}
          className="uppercase text-center mb-4"
        >
          The Problem
        </p>

        <h2
          style={{
            color: "#0f172a",
            fontFamily: "Inter, Poppins, sans-serif",
            fontSize: "clamp(30px, 4vw, 44px)",
            fontWeight: 730,
            lineHeight: 1.16,
            letterSpacing: "-0.02em",
          }}
          className="text-center mb-12"
        >
          Resume writing should not feel like guesswork.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {painCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "24px 20px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    backgroundColor: "#eef2ff",
                    border: "1px solid #dbeafe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "14px",
                  }}
                >
                  <Icon size={18} color="#1e40af" />
                </div>

                <h3
                  style={{
                    color: "#0f172a",
                    fontFamily: "Inter, Poppins, sans-serif",
                    fontWeight: 650,
                    fontSize: "16px",
                    marginBottom: "8px",
                    lineHeight: 1.4,
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    color: "#475569",
                    fontFamily: "Inter, Poppins, sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "9px",
                  }}
                >
                  {card.stinger}
                </p>

                <p
                  style={{
                    color: "#64748b",
                    fontFamily: "Inter, Poppins, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.65,
                  }}
                >
                  {card.body}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mb-6">
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "#eff6ff",
              border: "1px solid #dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronDown size={16} color="#1e40af" />
          </div>
        </div>

        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "12px",
            padding: "24px 28px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#0f172a",
              fontFamily: "Inter, Poppins, sans-serif",
              fontSize: "clamp(16px, 2.3vw, 20px)",
              fontWeight: 600,
              lineHeight: 1.5,
            }}
          >
            One platform for drafting, scoring, tailoring, and exporting your
            resume with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
