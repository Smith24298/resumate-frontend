import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, FileText } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const NAV_LINKS = ["Features", "How It Works", "Pricing", "Blog"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          padding: "14px 16px",
        }}
      >
        <nav
          style={{
            width: "100%",
            maxWidth: "1120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "14px",
            backgroundColor: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(191,219,254,0.9)",
            borderRadius: "16px",
            padding: "10px 14px 10px 16px",
            boxShadow: scrolled
              ? "0 14px 34px rgba(37,99,235,0.12)"
              : "0 6px 18px rgba(15,23,42,0.06)",
            transition: "box-shadow 0.2s ease, transform 0.2s ease",
            transform: scrolled ? "translateY(2px)" : "translateY(0)",
          }}
        >
          <div
            className="nav-links-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flex: "1",
            }}
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                style={{
                  color: "#334155",
                  fontFamily: "Inter, Poppins, sans-serif",
                  fontSize: "14px",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                {item}
              </a>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "7px",
                background: "#1e40af",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FileText size={14} color="white" />
            </div>
            <span
              style={{
                fontFamily: "Inter, Poppins, sans-serif",
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: "#0f172a",
              }}
            >
              Resumate
            </span>
          </div>

          <div
            className="nav-cta-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              flex: "1",
              justifyContent: "flex-end",
            }}
          >
            <SignedOut>
              <Link
                to="/login"
                style={{
                  color: "#334155",
                  fontFamily: "Inter, Poppins, sans-serif",
                  fontSize: "14px",
                  textDecoration: "none",
                  fontWeight: 500,
                  padding: "8px 10px",
                }}
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontFamily: "var(--rm-sans)",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "9px 14px",
                  borderRadius: "9px",
                  boxShadow: "0 10px 24px rgba(37,99,235,0.22)",
                }}
              >
                Create Resume
              </Link>
            </SignedOut>
            <SignedIn>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Link
                  to="/dashboard"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontFamily: "var(--rm-sans)",
                    fontSize: "14px",
                    fontWeight: 600,
                    padding: "9px 14px",
                    borderRadius: "9px",
                    boxShadow: "0 10px 24px rgba(37,99,235,0.22)",
                  }}
                >
                  Dashboard
                </Link>
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "9999px",
                    display: "grid",
                    placeItems: "center",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                  }}
                >
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: {
                          width: "34px",
                          height: "34px",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </SignedIn>
          </div>

          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: mobileOpen ? "#e2e8f0" : "#ffffff",
              border: "1px solid #cbd5e1",
              cursor: "pointer",
              color: "#0f172a",
              transition: "background 0.18s ease",
              flexShrink: 0,
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
          <style>{`
            @media (max-width: 767px) {
              .nav-links-desktop { display: none !important; }
              .nav-cta-desktop { display: none !important; }
              .hamburger-btn { display: flex !important; }
            }
          `}</style>
        </nav>
      </div>

      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            left: "16px",
            right: "16px",
            zIndex: 99,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "12px",
            boxShadow: "0 12px 32px rgba(15,23,42,0.1)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {NAV_LINKS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: "#334155",
                  fontFamily: "Inter, Poppins, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "11px 16px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  display: "block",
                  transition: "color 0.15s ease, background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#0f172a";
                  (e.currentTarget as HTMLElement).style.background = "#f8fafc";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#334155";
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                }}
              >
                {item}
              </a>
            ))}

            <div
              style={{
                height: "1px",
                background: "#e2e8f0",
                margin: "6px 0",
              }}
            />

            <SignedOut>
              <div style={{ display: "flex", gap: "8px", padding: "4px" }}>
                <button
                  style={{
                    flex: 1,
                    color: "#334155",
                    fontFamily: "Inter, Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    cursor: "pointer",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  <a
                    href="/login"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Sign in
                  </a>
                </button>
                <a
                  href="/signup"
                  style={{
                    flex: 2,
                    borderRadius: "10px",
                    padding: "10px 16px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    background: "#1e40af",
                    color: "#ffffff",
                    fontFamily: "Inter, Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started →
                </a>
              </div>
            </SignedOut>

            <SignedIn>
              <div style={{ display: "flex", gap: "8px", padding: "4px" }}>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    flex: 1,
                    borderRadius: "10px",
                    padding: "10px 16px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    background: "#1e40af",
                    color: "#ffffff",
                    fontFamily: "Inter, Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  Dashboard
                </Link>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "9999px",
                    display: "grid",
                    placeItems: "center",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </>
  );
}
