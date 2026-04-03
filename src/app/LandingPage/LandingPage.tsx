import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { ProblemSolution } from "../components/ProblemSolution";
import { WhoItsFor } from "../components/WhoItsFor";
import { Features } from "../components/Landing/Features";
import { HowItWorks } from "../components/Landing/HowItWorks";
import { SocialProof } from "../components/Landing/SocialProof";
import { FinalCTA } from "../components/Landing/FinalCTA";
import { Footer } from "../components/Landing/Footer";
import { useFadeIn } from "../hooks/useFadeIn";
import React from "react";

/* Thin wrapper that fades a section up on scroll entry */
function FadeSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, visible } = useFadeIn(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export function LandingPage() {
  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        fontFamily: "Inter, Poppins, sans-serif",
      }}
    >
      <Navbar />
      <main>
        {/* Hero doesn't need fade — it's the first thing visible */}
        <Hero />

        <FadeSection delay={0}>
          <ProblemSolution />
        </FadeSection>

        <FadeSection delay={40}>
          <Features />
        </FadeSection>

        <FadeSection delay={40}>
          <HowItWorks />
        </FadeSection>

        <FadeSection delay={40}>
          <WhoItsFor />
        </FadeSection>

        <FadeSection delay={40}>
          <SocialProof />
        </FadeSection>

        <FadeSection delay={40}>
          <FinalCTA />
        </FadeSection>
      </main>
      <Footer />
    </div>
  );
}
