import React from "react";
import { Resume } from "../../lib/types/resume";
import { ResumeCard } from "./ResumeCard";

interface ResumeGridProps {
  resumes: Resume[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  topResumeId?: string | null;
}

export function ResumeGrid({
  resumes,
  onEdit,
  onDelete,
  topResumeId,
}: ResumeGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          onEdit={() => onEdit(resume.id)}
          onDelete={() => onDelete(resume.id)}
          isTop={topResumeId === resume.id}
          dimLow={resume.atsScore < 70}
        />
      ))}
    </div>
  );
}
