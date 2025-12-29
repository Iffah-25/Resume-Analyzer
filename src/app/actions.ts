
'use server';
import { analyzeResume, ResumeAnalysisOutput } from '@/ai/flows/resume-analyzer';

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
