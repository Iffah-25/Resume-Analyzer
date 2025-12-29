'use client';

import { getResumeAnalysis } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Wand2, TestTube2 } from 'lucide-react';
import React, { useState, useTransition } from 'react';
import { AnalysisDisplay } from './analysis-display';
import { FileDropzone } from './file-dropzone';
import type { ResumeAnalysisOutput } from '@/ai/schemas';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { sampleResume } from '@/lib/sample-resume';

const jobRoles = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Scientist',
  'Product Manager',
  'UX/UI Designer',
  'DevOps Engineer',
  'Cybersecurity Analyst',
  'Marketing Manager'
];

export function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [jobRole, setJobRole] = useState<string>('');
  const [analysis, setAnalysis] = useState<ResumeAnalysisOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const performAnalysis = (text: string, role: string) => {
    if (!text.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Resume text is empty.',
      });
      return;
    }
    startTransition(async () => {
      try {
        const result = await getResumeAnalysis({ resumeText: text, jobRole: role });
        setAnalysis(result);
      } catch (error) {
        console.error('Analysis failed:', error);
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred. Please try again.',
        });
        setAnalysis(null);
      }
    });
  }

  const handleAnalyze = () => {
    performAnalysis(resumeText, jobRole);
  };
  
  const handleDemo = () => {
    const demoRole = 'Software Engineer';
    setResumeText(sampleResume);
    setJobRole(demoRole);
    // Scroll to analysis section
    setTimeout(() => {
        const element = document.getElementById('analyzer');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
    performAnalysis(sampleResume, demoRole);
  }

  const handleTextExtracted = (text: string) => {
    setResumeText(text);
  };

  return (
    <section id="analyzer" className="w-full py-12 md:py-16 lg:py-20 bg-muted/20 scroll-mt-20">
      <div ref={ref} className={cn("container px-4 md:px-6 transition-all duration-700 ease-out", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl shadow-primary/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Wand2 className="w-8 h-8 text-primary" />
                <CardTitle className="text-3xl font-bold">
                  Resume Analyzer
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-center text-muted-foreground -mt-2 font-semibold">
                    Upload your resume file
                  </p>
                  <FileDropzone onTextExtracted={handleTextExtracted} />
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-center text-muted-foreground -mt-2 font-semibold">
                    Or paste your resume text
                  </p>
                  <Textarea
                    placeholder="Paste your resume text here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="h-48 md:h-full min-h-[150px] text-sm"
                    aria-label="Resume text input"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="job-role"
                  className="block text-sm font-medium text-muted-foreground mb-2 text-center"
                >
                  (Optional) Select your target job role for tailored feedback
                </label>
                <Select value={jobRole} onValueChange={setJobRole}>
                  <SelectTrigger
                    id="job-role"
                    className="w-full max-w-sm mx-auto"
                  >
                    <SelectValue placeholder="Select a job role..." />
                  </SelectTrigger>
                  <SelectContent>
                    {jobRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                <Button
                  onClick={handleAnalyze}
                  disabled={isPending}
                  size="lg"
                  className="w-full md:w-auto font-bold text-lg shadow-lg hover:shadow-primary/40 transition-shadow"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Analyze My Resume
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleDemo}
                  disabled={isPending}
                  size="lg"
                  variant="outline"
                  className="w-full md:w-auto font-bold text-lg"
                >
                  <TestTube2 className="mr-2 h-5 w-5" />
                  Try Demo
                </Button>
              </div>
            </CardContent>
          </Card>

          <AnalysisDisplay analysis={analysis} isPending={isPending} />
        </div>
      </div>
    </section>
  );
}
