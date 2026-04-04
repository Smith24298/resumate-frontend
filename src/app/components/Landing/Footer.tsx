import { FileText, Github, Twitter, Linkedin } from "lucide-react";

const links = ["Features", "Pricing", "Blog", "GitHub"];

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e2e8f0",
        padding: "36px 24px",
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            style={{
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
          >
            <FileText size={13} color="white" />
          </div>
          <span
            style={{
              color: "#0f172a",
              fontFamily: "var(--rm-sans)",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            Resumate
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                color: "#64748b",
                fontFamily: "var(--rm-sans)",
                fontSize: "13px",
              }}
              className="hover:text-slate-900 transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {[
            { Icon: Github, label: "GitHub" },
            { Icon: Twitter, label: "Twitter" },
            { Icon: Linkedin, label: "LinkedIn" },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              title={label}
              style={{ color: "#64748b" }}
              className="hover:text-slate-900 transition-colors duration-200"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>

      <div
        className="max-w-5xl mx-auto mt-6 pt-6"
        style={{ borderTop: "1px solid #e2e8f0" }}
      >
        <p
          style={{
            color: "#64748b",
            fontFamily: "var(--rm-sans)",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          © 2026 ResumeAI. All rights reserved. Built for students and job
          seekers.
        </p>
      </div>
    </footer>
  );
}
