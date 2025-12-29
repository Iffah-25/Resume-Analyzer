
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
import { generateImprovedSummaryTool } from './improved-summary-generator';
import { ResumeAnalysisInputSchema, ResumeAnalysisOutputSchema, type ResumeAnalysisInput, type ResumeAnalysisOutput } from '@/ai/schemas';

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
5.  **Section-wise Suggestions**: Provide concise and practical suggestions for each section (Summary, Skills, Experience, Projects, Education). For each suggestion, provide a brief "before" and "after" example to illustrate the improvement.

Rules:
- Keep all suggestions concise and practical.
- Do not rewrite the entire resume.
- Assume the candidate is a student or fresher.

Resume Text:
{{{resumeText}}}
`,
  tools: [generateImprovedSummaryTool]
});

const resumeAnalysisFlow = ai.defineFlow(
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

export async function analyzeResume(input: ResumeAnalysisInput): Promise<ResumeAnalysisOutput> {
  return resumeAnalysisFlow(input);
}
