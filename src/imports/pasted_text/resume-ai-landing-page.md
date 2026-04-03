Here's a Figma-ready prompt you can drop straight in. It's structured for a design tool — sections are clear, annotations are explicit, and nothing is left ambiguous.

---

**FIGMA AI PROMPT — ResumeAI Landing Page**

---

Design a modern SaaS landing page for a product called **ResumeAI** — an AI-powered resume builder for college students and job seekers. The product helps users generate LaTeX resumes, check ATS scores, tailor resumes to job descriptions, and edit live with a preview.

**Visual direction:** Clean, editorial, dark-mode-first. Primary accent: deep purple (`#6C63FF`). Secondary: soft white/light gray for text. Background: near-black (`#0F0F14`). Avoid neon, avoid gradient soup. Think Linear or Vercel — confident negative space, sharp typography, subtle glow only on CTAs.

---

**Section 1 — Hero**
Full viewport height. Center-aligned content over a dark background.

- Eyebrow label (small caps, purple): "AI-Powered Resume Builder"
- H1 (64px bold, white): "Build ATS-Optimized Resumes in Minutes"
- Subtitle (18px, gray-400): "Generate, edit, and tailor resumes with AI + LaTeX. No more guessing what recruiters want."
- Two CTA buttons side by side: primary button "Get Started" (purple fill, white text, pill shape) + ghost button "Try Demo" (border purple, purple text)
- Below buttons: a UI mockup — split screen showing a LaTeX code editor on the left and a PDF preview on the right. Add a floating ATS score badge (circle, "87 / 100", green) overlapping the bottom right of the mockup card. Subtle card shadow, rounded corners 16px.

---

**Section 2 — Problem → Solution**
Three-column layout, centered, dark card background (`#16161E`).

Left pain card: icon (X mark), heading "Overleaf is manual", body "You write LaTeX from scratch every time. No automation, no AI."

Center pain card: icon (warning), heading "ATS tools are unreliable", body "Random websites with no explanation. No trust, no guidance."

Right pain card: icon (clock), heading "Tailoring resumes is painful", body "Rewriting for every job description takes hours you don't have."

Below the three cards, a large arrow pointing down into a single highlight box (purple border, dark bg):
"One platform that does everything — generate, score, tailor, download."

---

**Section 3 — Features**
Section heading (centered): "Everything you need to get shortlisted"

Five feature cards in a 2-3 grid layout. Each card: icon top-left, title, 1-line description. Cards have `border: 1px solid #2A2A35`, hover state with purple left border glow.

Feature list:
1. ATS Score Analyzer — "Scan your resume against any job description instantly"
2. LaTeX Resume Generator — "Pick a template, fill your info, get production-ready LaTeX"
3. Live Editor with Preview — "Edit LaTeX on the left, see your PDF render on the right"
4. AI Job Tailoring — "Paste a job description, get a tailored resume in seconds"
5. Resume Dashboard — "Track all your resumes, scores, and versions in one place"

---

**Section 4 — How It Works**
Horizontal stepper, 4 steps, connected by a thin purple dashed line.

Step 1 — Upload resume (icon: upload arrow)
Step 2 — Analyze ATS score (icon: bar chart)
Step 3 — Edit or tailor with AI (icon: sparkle/wand)
Step 4 — Download optimized PDF (icon: download)

Each step: circle number (purple), icon above, title below, 1-line hint text under title. Add a thin connector line between circles.

---

**Section 5 — Who It's For**
Three audience cards, horizontal layout.

Card 1 — Students: "Stop submitting resumes into the void. Know your score before you apply."
Card 2 — Job Seekers: "Tailor your resume to every role without starting from scratch."
Card 3 — LaTeX Nerds: "Full editor control. Your template, your code, your PDF."

Cards: rounded 12px, icon top, bold title, body text, no border — just subtle background lift.

---

**Section 6 — Social Proof**
Light strip section (slightly lighter bg than rest of page).

Stat row centered: "500+ Resumes Generated" | "92% Average ATS Score" | "Used by Students at 20+ Colleges"
Below stats: two testimonial cards side by side, quote format, avatar placeholder circles, student name + college name.

---

**Section 7 — Final CTA**
Full-width dark section, centered.

Headline (48px bold, white): "Stop guessing. Start getting shortlisted."
Subtext (16px, gray): "Build your first ATS-optimized resume in under 5 minutes."
Single large CTA button: "Build Your Resume Now" (purple, large pill, slight glow)

---

**Footer**
Logo left. Links center: Features, Pricing, Blog, GitHub. Social icons right. One-line copyright.

---

**Typography:** Inter or Geist. H1: 700 weight. Headings: 600. Body: 400. Monospace for any code snippets in the editor mockup.

**Spacing:** 80px between sections. 24px between cards. 16px internal card padding.

**Figma notes:** Build on a 1440px frame. Components for buttons, feature cards, and step items. Use auto-layout on all card groups. Dark mode only.