'use server';

import { generateImprovedResumeText } from '@/ai/flows/improved-resume-generator';
import { analyzeResume } from '@/ai/flows/resume-analyzer';
import {
  ImprovedResumeTextInput,
  ImprovedResumeTextOutput,
  ResumeAnalysisInput,
  ResumeAnalysisOutput,
} from '@/ai/schemas';

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

export async function getImprovedResume(
  input: ImprovedResumeTextInput
): Promise<ImprovedResumeTextOutput> {
  if (!input.resumeText.trim() || !input.improvedSummary.trim()) {
    throw new Error('Resume text and improved summary cannot be empty.');
  }

  try {
    const result = await generateImprovedResumeText(input);
    return result;
  } catch (error) {
    console.error('Error in getImprovedResume action:', error);
    throw new Error('Failed to generate improved resume. Please try again.');
  }
}
