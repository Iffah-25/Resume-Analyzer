/**
 * @fileoverview A clean, printable template for the improved resume.
 * This component is used by html2canvas to generate a PDF.
 */
import React from 'react';

interface ResumeTemplateProps {
  resumeText: string;
}

// A simple helper to identify headings
const isHeading = (line: string, nextLine?: string) => {
    const trimmedLine = line.trim();
    if (trimmedLine.length === 0 || trimmedLine.length > 50) return false;
    // Common resume section headers
    const headings = ['professional summary', 'summary', 'skills', 'experience', 'projects', 'education', 'contact'];
    const isAHeading = headings.some(h => trimmedLine.toLowerCase().startsWith(h));
    
    // It's likely a heading if it's short, doesn't end with a period, and the next line is not empty (unless it's the last line)
    return isAHeading && !trimmedLine.endsWith('.') && (nextLine !== '' || nextLine === undefined);
};

// A helper to parse contact info
const parseContactInfo = (lines: string[]) => {
    const contactInfo: string[] = [];
    const otherLines: string[] = [];
    let name = '';

    if (lines.length > 0) {
        name = lines[0]; // Assume first line is the name
    }

    lines.slice(1).forEach(line => {
        if (line.includes('@') || line.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/) || line.includes('linkedin.com') || line.includes('github.com')) {
            contactInfo.push(line.trim());
        } else {
            otherLines.push(line);
        }
    });

    return { name, contactInfo, remainingLines: otherLines };
}

export const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ resumeText }) => {
    const allLines = resumeText.split('\n');
    const { name, contactInfo, remainingLines } = parseContactInfo(allLines);
    
    const bodyContent = remainingLines.join('\n');
    const sections = bodyContent.split(/(\n\s*\n)/).filter(s => s.trim() !== '');

  return (
    <div className="p-10 bg-white text-gray-800 font-serif" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Georgia, serif' }}>
        {/* Header */}
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-wider">{name}</h1>
            <p className="text-sm mt-2 text-gray-600">
                {contactInfo.join(' | ')}
            </p>
        </div>

      {sections.map((section, index) => {
        const lines = section.trim().split('\n');
        const firstLine = lines[0].trim();
        
        if (isHeading(firstLine, lines[1])) {
          return (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-bold border-b-2 border-gray-300 mt-4 mb-3 pb-1 tracking-wide uppercase">
                {firstLine}
              </h2>
              <div className="text-sm text-gray-700 leading-relaxed">
                {lines.slice(1).map((line, lineIndex) => (
                    <p key={lineIndex}>{line.startsWith('- ') ? `• ${line.substring(2)}` : line}</p>
                ))}
              </div>
            </div>
          );
        }
        
        return (
          <div key={index} className="mb-4 text-sm text-gray-700 leading-relaxed">
            {lines.map((line, lineIndex) => (
              <p key={lineIndex} className={line.startsWith('- ') ? "ml-4" : ""}>
                {line.startsWith('- ') ? `• ${line.substring(2)}` : line}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
};
