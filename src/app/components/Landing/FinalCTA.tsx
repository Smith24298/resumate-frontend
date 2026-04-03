export function FinalCTA() {
  return (
    <section
      style={{
        backgroundColor: "#f8fafc",
        paddingTop: "94px",
        paddingBottom: "94px",
      }}
      className="px-6 relative overflow-hidden"
    >
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "9999px",
            padding: "5px 14px",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#1e40af",
              display: "inline-block",
            }}
          />
          <span
            style={{
              color: "#1e40af",
              fontFamily: "Inter, Poppins, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Ready to stand out?
          </span>
        </div>

        <h2
          style={{
            color: "#0f172a",
            fontFamily: "Inter, Poppins, sans-serif",
            fontSize: "clamp(32px, 5vw, 58px)",
            fontWeight: 740,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: "20px",
          }}
        >
          <span style={{ display: "block", marginBottom: "4px" }}>
            Stop guessing.
          </span>
          <span style={{ display: "block", color: "#1e40af" }}>
            Start getting shortlisted.
          </span>
        </h2>
        <p
          style={{
            color: "#64748b",
            fontFamily: "Inter, Poppins, sans-serif",
            fontSize: "16px",
            lineHeight: 1.65,
            marginBottom: "40px",
          }}
        >
          Build your first ATS-optimized resume in under 5 minutes.
        </p>

        <button
          style={{
            background: "#1e40af",
            color: "white",
            fontFamily: "Inter, Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            padding: "15px 34px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 20px rgba(30,64,175,0.2)",
            transition: "transform 0.15s ease, background 0.15s ease",
            letterSpacing: "-0.01em",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = "translateY(-2px)";
            el.style.background = "#1d4ed8";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = "translateY(0)";
            el.style.background = "#1e40af";
          }}
        >
          Build Your Resume Now →
        </button>

        <p
          style={{
            color: "#64748b",
            fontFamily: "Inter, Poppins, sans-serif",
            fontSize: "13px",
            marginTop: "18px",
            letterSpacing: "0.02em",
          }}
        >
          Free to start · No credit card required
        </p>
      </div>
    </section>
  );
}
