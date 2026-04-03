import { GraduationCap, Briefcase, Code2 } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Students",
    body: "Stop submitting resumes into the void. Know your score before you apply.",
    iconColor: "#A78BFA",
    iconBg: "rgba(167,139,250,0.08)",
    iconBorder: "rgba(167,139,250,0.15)",
    accentLine: "#A78BFA",
  },
  {
    icon: Briefcase,
    title: "Job Seekers",
    body: "Tailor your resume to every role without starting from scratch.",
    iconColor: "#34D399",
    iconBg: "rgba(52,211,153,0.08)",
    iconBorder: "rgba(52,211,153,0.15)",
    accentLine: "#34D399",
  },
  {
    icon: Code2,
    title: "LaTeX Nerds",
    body: "Full editor control. Your template, your code, your PDF.",
    iconColor: "#60A5FA",
    iconBg: "rgba(96,165,250,0.08)",
    iconBorder: "rgba(96,165,250,0.15)",
    accentLine: "#60A5FA",
  },
];

export function WhoItsFor() {
  return (
    <section
      style={{
        backgroundColor: "#f8fafc",
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
            Who It's For
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
            Built for everyone in the job hunt
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "28px 24px",
                }}
              >
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
                    fontSize: "18px",
                    marginBottom: "10px",
                  }}
                >
                  {a.title}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontFamily: "Inter, Poppins, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}
                >
                  {a.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
