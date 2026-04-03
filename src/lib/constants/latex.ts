// Default LaTeX template for new resumes
export const DEFAULT_LATEX_TEMPLATE = `\\documentclass[11pt]{article}
\\usepackage[margin=0.5in]{geometry}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}
\\usepackage{fontawesome5}

\\pagestyle{empty}
\\raggedbottom
\\raggedright

\\definecolor{accentcolor}{gray}{0.2}

\\newcommand{\\datedsubsection}[2]{%
  \\textbf{#1} \\hfill \\small #2 \\\\
}

\\newcommand{\\sectionheader}[1]{%
  \\bigskip
  {\\color{accentcolor} \\large \\textbf{#1}} \\rule{\\textwidth}{0.5pt} \\normalsize
}

\\title{}
\\author{}
\\date{}

\\begin{document}

{\\centering
  \\Large \\textbf{Your Name} \\\\
  \\small
  Email: your.email@example.com | Phone: (555) 123-4567 | \\href{https://yourportfolio.com}{Portfolio}
}

\\sectionheader{SUMMARY}
Dedicated professional with expertise in [your field]. Passionate about [your passion]. \\\\

\\sectionheader{EXPERIENCE}

\\datedsubsection{Job Title}{Company Name | Month Year -- Present}
\\begin{itemize}
  \\item Achieved X and improved Y by Z\\%
  \\item Led project initiative resulting in [outcome]
\\end{itemize}

\\datedsubsection{Previous Role}{Previous Company | Month Year -- Month Year}
\\begin{itemize}
  \\item Contributed to [project] with [result]
  \\item Collaborated with teams to [outcome]
\\end{itemize}

\\sectionheader{EDUCATION}

\\datedsubsection{Degree Name}{University Name | Graduation: Month Year}
GPA: 3.8/4.0 | Relevant Coursework: [courses]

\\sectionheader{SKILLS}

\\textbf{Technical:} Python, JavaScript, React, Node.js, SQL \\\\
\\textbf{Soft Skills:} Project Management, Team Leadership, Communication

\\sectionheader{CERTIFICATIONS}

\\begin{itemize}
  \\item Certification Name (Issuing Organization, Year)
  \\item Another Certification (Organization, Year)
\\end{itemize}

\\end{document}`;
