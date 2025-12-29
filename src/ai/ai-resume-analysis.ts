'use server';

/**
 * @fileOverview Analyzes resume text using Google Gemini API and provides feedback.
 *
 * - analyzeResume - A function that handles the resume analysis process.
 * - AnalyzeResumeInput - The input type for the analyzeResume function.
 * - AnalyzeResumeOutput - The return type for the analyzeResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume to be analyzed.'),
});
export type AnalyzeResumeInput = z.infer<typeof AnalyzeResumeInputSchema>;

const AnalyzeResumeOutputSchema = z.object({
  resumeStrengthScore: z.number().describe('Resume Strength Score (out of 10)'),
  improvedProfessionalSummary: z
    .string()
    .describe('Improved Professional Summary (3–4 lines)'),
  skillsToAddOrImprove: z.array(z.string()).describe('Skills to Add or Improve (bullet points)'),
  atsKeywordsMissing: z
    .string()
    .describe('ATS Keywords Missing (comma-separated)'),
  sectionWiseSuggestions: z.object({
    summary: z.string().describe('Suggestions for the Summary section'),
    skills: z.string().describe('Suggestions for the Skills section'),
    experience: z.string().describe('Suggestions for the Experience section'),
    projects: z.string().describe('Suggestions for the Projects section'),
    education: z.string().describe('Suggestions for the Education section'),
  }),
});
export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;

export async function analyzeResume(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
  return analyzeResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeResumePrompt',
  input: {schema: AnalyzeResumeInputSchema},
  output: {schema: AnalyzeResumeOutputSchema},
  prompt: `You are a professional ATS resume reviewer and career coach.\n\nAnalyze the resume text provided below and return the output strictly in this format:\n\n1. Resume Strength Score (out of 10)\n2. Improved Professional Summary (3–4 lines)\n3. Skills to Add or Improve (bullet points)\n4. ATS Keywords Missing (comma-separated)\n5. Section-wise Suggestions:\n   - Summary\n   - Skills\n   - Experience\n   - Projects\n   - Education\n\nRules:\n- Keep suggestions concise and practical\n- Do not rewrite the entire resume\n- Assume the candidate is a student or fresher\n\nResume Text: {{{resumeText}}}`,
});

const analyzeResumeFlow = ai.defineFlow(
  {
    name: 'analyzeResumeFlow',
    inputSchema: AnalyzeResumeInputSchema,
    outputSchema: AnalyzeResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
