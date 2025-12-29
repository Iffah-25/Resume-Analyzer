
'use server';
import { analyzeResume } from '@/ai/flows/resume-analyzer';
import { ResumeAnalysisOutput } from '@/ai/schemas';

export async function getResumeAnalysis(resumeText: string): Promise<ResumeAnalysisOutput> {
  if (!resumeText.trim()) {
    throw new Error('Resume text cannot be empty.');
  }

  try {
    const result = await analyzeResume({ resumeText });
    return result;
  } catch (error) {
    console.error("Error in getResumeAnalysis action:", error);
    throw new Error('Failed to get analysis from AI. Please try again.');
  }
}
