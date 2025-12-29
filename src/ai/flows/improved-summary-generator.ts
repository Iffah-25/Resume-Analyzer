'use server';

/**
 * @fileOverview This file defines a Genkit tool for generating an improved professional summary for a resume.
 */

import {ai} from '@/ai/genkit';
import { ImprovedSummaryInputSchema, ImprovedSummaryOutputSchema, type ImprovedSummaryInput } from '@/ai/schemas';

const improvedSummaryPrompt = ai.definePrompt({
  name: 'improvedSummaryPrompt',
  input: {schema: ImprovedSummaryInputSchema},
  output: {schema: ImprovedSummaryOutputSchema},
  prompt: `You are a professional resume writer.

  Analyze the following resume text and determine if the professional summary is weak or could be improved. If it is, generate a new and improved professional summary that is 3-4 lines long. If the summary section contains strong content, return it as is without modifications.

  Resume Text: {{{resumeText}}}`,
});

export const generateImprovedSummaryTool = ai.defineTool(
  {
    name: 'generateImprovedSummary',
    description: 'Generates an improved professional summary for a resume if the current one is not compelling.',
    inputSchema: ImprovedSummaryInputSchema,
    outputSchema: ImprovedSummaryOutputSchema,
  },
  async (input: ImprovedSummaryInput) => {
    const {output} = await improvedSummaryPrompt(input);
    return output!;
  }
);
