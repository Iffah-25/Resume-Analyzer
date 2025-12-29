/**
 * @fileoverview A clean, printable template for the improved resume.
 * This component is used by html2canvas to generate a PDF.
 */
import React from 'react';

interface ResumeTemplateProps {
  resumeText: string;
}

export const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ resumeText }) => {
  // A simple parser to format the resume text into sections.
  // This can be made more sophisticated.
  const sections = resumeText.split(/(\n\s*\n)/).filter(s => s.trim() !== '');

  return (
    <div className="p-8 bg-white text-black font-serif text-sm" style={{ width: '210mm', minHeight: '297mm' }}>
      {sections.map((section, index) => {
        const lines = section.trim().split('\n');
        const firstLine = lines[0].trim();
        const isHeading = lines.length === 1 && firstLine.length < 50 && !firstLine.includes('@');

        if (isHeading) {
          return (
            <h2 key={index} className="text-lg font-bold border-b-2 border-gray-300 mt-4 mb-2 pb-1">
              {firstLine}
            </h2>
          );
        }
        
        return (
          <div key={index} className="mb-2">
            {lines.map((line, lineIndex) => (
              <p key={lineIndex} className="leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
};
