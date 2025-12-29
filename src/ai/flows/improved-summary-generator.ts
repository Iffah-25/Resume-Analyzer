'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating an improved professional summary for a resume.
 *
 * The flow takes resume text as input and returns an improved summary if the AI deems the original summary to be weak.
 *
 * @exported
 * - `generateImprovedSummary`:  The function to call to generate an improved summary.
 * - `ImprovedSummaryInput`: The input type for the generateImprovedSummary function.
 * - `ImprovedSummaryOutput`: The return type for the generateImprovedSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImprovedSummaryInputSchema = z.object({
  resumeText: z.string().describe('The text of the resume to analyze.'),
});
export type ImprovedSummaryInput = z.infer<typeof ImprovedSummaryInputSchema>;

const ImprovedSummaryOutputSchema = z.object({
  improvedSummary: z
    .string()
    .describe('An improved professional summary for the resume.'),
});
export type ImprovedSummaryOutput = z.infer<typeof ImprovedSummaryOutputSchema>;

export async function generateImprovedSummary(input: ImprovedSummaryInput): Promise<ImprovedSummaryOutput> {
  return improvedSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improvedSummaryPrompt',
  input: {schema: ImprovedSummaryInputSchema},
  output: {schema: ImprovedSummaryOutputSchema},
  prompt: `You are a professional resume writer.

  Analyze the following resume text and determine if the professional summary is weak or could be improved. If it is, generate a new and improved professional summary that is 3-4 lines long. If the summary section contains strong content, return it as is without modifications.

  Resume Text: {{{resumeText}}}`,
});

const improvedSummaryFlow = ai.defineFlow(
  {
    name: 'improvedSummaryFlow',
    inputSchema: ImprovedSummaryInputSchema,
    outputSchema: ImprovedSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
