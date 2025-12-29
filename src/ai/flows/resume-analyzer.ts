
'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing a resume and providing structured feedback.
 *
 * The flow takes resume text as input and uses the Google Gemini API to generate:
 * - A resume strength score
 * - An improved professional summary
 * - Skills to add or improve
 * - Missing ATS keywords
 * - Section-wise suggestions
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const ResumeAnalysisInputSchema = z.object({
  resumeText: z.string().describe('The text of the resume to analyze.'),
});
export type ResumeAnalysisInput = z.infer<typeof ResumeAnalysisInputSchema>;

export const ResumeAnalysisOutputSchema = z.object({
  resumeStrengthScore: z.string().describe('A score out of 10, e.g., "7/10".'),
  improvedProfessionalSummary: z.string().describe('An improved professional summary, 3-4 lines long.'),
  skillsToAddOrImprove: z.array(z.string()).describe('A list of skills to add or improve.'),
  atsKeywordsMissing: z.array(z.string()).describe('A list of missing ATS keywords.'),
  sectionWiseSuggestions: z.object({
    summary: z.string().describe('Suggestions for the summary section.'),
    skills: z.string().describe('Suggestions for the skills section.'),
    experience: z.string().describe('Suggestions for the experience section.'),
    projects: z.string().describe('Suggestions for the projects section.'),
    education: z.string().describe('Suggestions for the education section.'),
  }).describe('Section-wise suggestions for the resume.'),
});
export type ResumeAnalysisOutput = z.infer<typeof ResumeAnalysisOutputSchema>;

const resumeAnalysisPrompt = ai.definePrompt({
  name: 'resumeAnalysisPrompt',
  input: { schema: ResumeAnalysisInputSchema },
  output: { schema: ResumeAnalysisOutputSchema },
  prompt: `You are a professional ATS resume reviewer and career coach.

Analyze the resume text provided below. Return the output strictly as a JSON object matching the provided schema.

1.  **Resume Strength Score**: Provide a score out of 10.
2.  **Improved Professional Summary**: Write an improved summary of 3–4 lines.
3.  **Skills to Add or Improve**: List skills as bullet points.
4.  **ATS Keywords Missing**: List important missing keywords, comma-separated.
5.  **Section-wise Suggestions**: Provide concise and practical suggestions for each section (Summary, Skills, Experience, Projects, Education).

Rules:
- Keep all suggestions concise and practical.
- Do not rewrite the entire resume.
- Assume the candidate is a student or fresher.

Resume Text:
{{{resumeText}}}
`,
});

export const resumeAnalysisFlow = ai.defineFlow(
  {
    name: 'resumeAnalysisFlow',
    inputSchema: ResumeAnalysisInputSchema,
    outputSchema: ResumeAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await resumeAnalysisPrompt(input);
    return output!;
  }
);
