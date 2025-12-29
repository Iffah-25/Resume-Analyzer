
'use client';

import { getResumeAnalysis } from '@/app/actions';
import type { ResumeAnalysisOutput } from '@/ai/flows/resume-analyzer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck } from 'lucide-react';
import React, { useState, useTransition } from 'react';
import { AnalysisDisplay } from './analysis-display';
import { FileDropzone } from './file-dropzone';

export function ResumeImprover() {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState<ResumeAnalysisOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAnalyze = () => {
    if (!resumeText.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please paste your resume or upload a file.',
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await getResumeAnalysis(resumeText);
        setAnalysis(result);
      } catch (error) {
        console.error('Analysis failed:', error);
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: error instanceof Error ? error.message : 'An unknown error occurred. Please try again.',
        });
        setAnalysis(null);
      }
    });
  };

  const handleTextExtracted = (text: string) => {
    setResumeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="flex flex-col gap-4">
              <FileDropzone onTextExtracted={handleTextExtracted} />
              <div className="flex items-center gap-2">
                <hr className="flex-grow border-t" />
                <span className="text-xs text-muted-foreground font-semibold">OR</span>
                <hr className="flex-grow border-t" />
              </div>
              <p className="text-sm text-center text-muted-foreground -mt-2">
                Paste your resume text below
              </p>
            </div>

            <Textarea
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="h-48 md:h-full min-h-[150px] text-sm"
              aria-label="Resume text input"
            />
          </div>
          <div className="mt-6 flex flex-col items-center">
            <Button onClick={handleAnalyze} disabled={isPending} size="lg" className="w-full md:w-auto">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Resume'
              )}
            </Button>
            <div className="flex items-center text-xs text-muted-foreground mt-4">
                <ShieldCheck className="h-4 w-4 mr-1.5 text-accent" />
                Your data is processed in your browser and is not stored. Privacy-first design.
            </div>
          </div>
        </CardContent>
      </Card>
      
      <AnalysisDisplay analysis={analysis} isPending={isPending} />
    </div>
  );
}
