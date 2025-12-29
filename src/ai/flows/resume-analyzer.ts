'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing a resume and providing structured feedback.
 *
 * The flow takes resume text as input and uses the Google Gemini API to generate:
 * - A resume strength score
 * - An improved professional summary (conditionally)
 * - Skills to add or improve
 * - Missing ATS keywords
 * - Section-wise suggestions
 */

import { ai } from '@/ai/genkit';
import {
  ResumeAnalysisInputSchema,
  ResumeAnalysisOutputSchema,
  type ResumeAnalysisInput,
  type ResumeAnalysisOutput,
} from '@/ai/schemas';
import { generateImprovedSummaryTool } from './improved-summary-generator';

const resumeAnalysisPrompt = ai.definePrompt({
  name: 'resumeAnalysisPrompt',
  input: { schema: ResumeAnalysisInputSchema },
  output: { schema: ResumeAnalysisOutputSchema },
  tools: [generateImprovedSummaryTool],
  prompt: `You are a professional ATS resume reviewer and career coach.
{{#if jobRole}}
You are reviewing a resume for the role of: **{{jobRole}}**. Tailor your feedback and keyword suggestions accordingly.
{{else}}
You are reviewing a general resume. Assume the candidate is a student or fresher.
{{/if}}

Analyze the resume text provided below. Return the output strictly as a JSON object matching the provided schema.

1.  **Resume Strength Score**: Provide a score out of 10.
2.  **ATS Compatibility**: Based on ATS compatibility, classify the resume as: Poor, Average, or Strong.
3.  **Original Professional Summary**: Extract the original professional summary section from the resume text. If no clear summary section is found, state "No summary found."
4.  **Improved Professional Summary**: Based on the original summary, determine if it is weak or could be improved. If it is, use the 'generateImprovedSummary' tool to create a new one. Otherwise, return the original summary.
5.  **Skills to Add or Improve**: List skills as an array of strings.
6.  **ATS Keywords Missing**: List important missing keywords as an array of strings.
7.  **Section-wise Suggestions**: For each key resume section (Summary, Skills, Experience, Projects, Education), provide an array of concise, actionable suggestion strings. Each string should be a recommendation for improvement.

Rules:
- Keep all suggestions concise and practical.
- Do not rewrite the entire resume.

Resume Text:
{{{resumeText}}}
`,
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

export async function analyzeResume(
  input: ResumeAnalysisInput
): Promise<ResumeAnalysisOutput> {
  return resumeAnalysisFlow(input);
}
