'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating an improved resume text.
 */

import { ai } from '@/ai/genkit';
import { ImprovedResumeTextInputSchema, ImprovedResumeTextOutputSchema } from '@/ai/schemas';

const improveResumeTextPrompt = ai.definePrompt({
    name: 'improveResumeTextPrompt',
    input: { schema: ImprovedResumeTextInputSchema },
    output: { schema: ImprovedResumeTextOutputSchema },
    prompt: `You are a professional resume writer. You will be given the original resume text and an AI-improved professional summary.

Your task is to replace the original professional summary section in the resume with the new, improved one.

- Find the original professional summary in the resume text. It might be labeled "Professional Summary", "Summary", or something similar.
- Replace the entire original summary section with the new 'improvedSummary' provided.
- Ensure the rest of the resume text remains exactly the same.
- Return the full, updated resume text.

Original Resume Text:
{{{resumeText}}}

New Improved Summary:
{{{improvedSummary}}}
`,
});

const improveResumeTextFlow = ai.defineFlow(
    {
        name: 'improveResumeTextFlow',
        inputSchema: ImprovedResumeTextInputSchema,
        outputSchema: ImprovedResumeTextOutputSchema,
    },
    async (input) => {
        const { output } = await improveResumeTextPrompt(input);
        return output!;
    }
);

export async function generateImprovedResumeText(input: any) {
    return improveResumeTextFlow(input);
}
