/**
 * @fileOverview This file contains the Zod schemas and TypeScript types for the resume analysis functionality.
 *
 * By centralizing the schemas and types, we can share them between client and server components
 * without violating the Next.js "use server" directive, which only allows async functions to be exported.
 */

import { z } from 'zod';

// #region Schemas and Types for Improved Summary Generator
export const ImprovedSummaryInputSchema = z.object({
  resumeText: z.string().describe('The text of the resume to analyze.'),
});
export type ImprovedSummaryInput = z.infer<typeof ImprovedSummaryInputSchema>;

export const ImprovedSummaryOutputSchema = z.object({
  improvedSummary: z
    .string()
    .describe('An improved professional summary for the resume.'),
});
export type ImprovedSummaryOutput = z.infer<typeof ImprovedSummaryOutputSchema>;
// #endregion

// #region Schemas and Types for Improved Resume Text Generator
export const ImprovedResumeTextInputSchema = z.object({
    resumeText: z.string().describe('The original text of the resume.'),
    improvedSummary: z.string().describe('The new, AI-improved professional summary.'),
});
export type ImprovedResumeTextInput = z.infer<typeof ImprovedResumeTextInputSchema>;

export const ImprovedResumeTextOutputSchema = z.object({
    improvedResumeText: z.string().describe('The full text of the resume with the summary replaced.'),
});
export type ImprovedResumeTextOutput = z.infer<typeof ImprovedResumeTextOutputSchema>;
// #endregion

// #region Schemas and Types for Resume Analyzer
export const ResumeAnalysisInputSchema = z.object({
  resumeText: z.string().describe('The text of the resume to analyze.'),
  jobRole: z.string().optional().describe('The target job role for the resume.'),
});
export type ResumeAnalysisInput = z.infer<typeof ResumeAnalysisInputSchema>;

export const ResumeAnalysisOutputSchema = z.object({
  resumeStrengthScore: z.string().describe('A score out of 10, e.g., "7/10".'),
  atsCompatibility: z
    .enum(['Poor', 'Average', 'Strong'])
    .describe(
      'ATS compatibility classification: Poor, Average, or Strong.'
    ),
  originalSummary: z.string().describe('The original professional summary from the resume.'),
  improvedSummary: z
    .string()
    .describe('An improved professional summary, 3-4 lines long.'),
  skillsToAddOrImprove: z
    .array(z.string())
    .describe('A list of skills to add or improve.'),
  atsKeywordsMissing: z
    .array(z.string())
    .describe('A list of missing ATS keywords.'),
  sectionWiseSuggestions: z
    .object({
      summary: z
        .array(z.string())
        .describe(
          'Suggestions for the summary section.'
        ),
      skills: z
        .array(z.string())
        .describe(
          'Suggestions for the skills section.'
        ),
      experience: z
        .array(z.string())
        .describe(
          'Suggestions for the experience section.'
        ),
      projects: z
        .array(z.string())
        .describe(
          'Suggestions for the projects section.'
        ),
      education: z
        .array(z.string())
        .describe(
          'Suggestions for the education section.'
        ),
    })
    .describe('Section-wise suggestions for the resume.'),
});
export type ResumeAnalysisOutput = z.infer<typeof ResumeAnalysisOutputSchema>;
// #endregion