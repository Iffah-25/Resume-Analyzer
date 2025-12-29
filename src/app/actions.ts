'use server';

import { analyzeResume } from '@/ai/flows/resume-analyzer';
import { ResumeAnalysisInput, ResumeAnalysisOutput } from '@/ai/schemas';

export async function getResumeAnalysis(
  input: ResumeAnalysisInput
): Promise<ResumeAnalysisOutput> {
  if (!input.resumeText.trim()) {
    throw new Error('Resume text cannot be empty.');
  }

  try {
    const result = await analyzeResume(input);
    return result;
  } catch (error) {
    console.error('Error in getResumeAnalysis action:', error);
    throw new Error('Failed to get analysis from AI. Please try again.');
  }
}
