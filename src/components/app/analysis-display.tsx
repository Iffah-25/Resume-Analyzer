
'use client';

import type { ResumeAnalysisOutput } from '@/ai/flows/resume-analyzer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { BookText, Bot, BrainCircuit, GanttChartSquare, Gem, Star } from 'lucide-react';
import React from 'react';

interface AnalysisDisplayProps {
  analysis: ResumeAnalysisOutput | null;
  isPending: boolean;
}

const SectionCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <Card>
        <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-4">
            {icon}
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

export function AnalysisDisplay({ analysis, isPending }: AnalysisDisplayProps) {
  if (isPending) {
    return <AnalysisSkeleton />;
  }

  if (!analysis) {
    return null;
  }

  const [score, maxScore] = (analysis.resumeStrengthScore || "0/10").split('/').map(Number);
  const percentage = (maxScore > 0) ? (score / maxScore) * 100 : 0;
  
  const iconProps = { className: "h-6 w-6 text-primary" };

  return (
    <div className="mt-8 grid gap-6">
        <SectionCard icon={<Star {...iconProps} />} title="Resume Strength Score">
            <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-primary">{analysis.resumeStrengthScore}</span>
                <Progress value={percentage} className="w-full h-3" />
            </div>
        </SectionCard>

        <SectionCard icon={<Bot {...iconProps} />} title="Improved Professional Summary">
            <p className="text-muted-foreground leading-relaxed">{analysis.improvedProfessionalSummary}</p>
        </SectionCard>

        <div className="grid md:grid-cols-2 gap-6">
            <SectionCard icon={<BrainCircuit {...iconProps} />} title="Skills to Add or Improve">
                <div className="flex flex-wrap gap-2">
                    {analysis.skillsToAddOrImprove.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                </div>
            </SectionCard>

            <SectionCard icon={<Gem {...iconProps} />} title="Missing ATS Keywords">
                <div className="flex flex-wrap gap-2">
                    {analysis.atsKeywordsMissing.map((keyword, index) => (
                        <Badge key={index} variant="secondary">{keyword}</Badge>
                    ))}
                </div>
            </SectionCard>
        </div>

        <SectionCard icon={<BookText {...iconProps} />} title="Section-wise Suggestions">
            <Accordion type="single" collapsible className="w-full">
                {Object.entries(analysis.sectionWiseSuggestions).map(([section, suggestion]) => (
                    <AccordionItem value={section} key={section}>
                        <AccordionTrigger className="text-lg capitalize font-medium">{section}</AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                            {suggestion}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </SectionCard>
    </div>
  );
}

const AnalysisSkeleton = () => {
    return (
        <div className="mt-8 grid gap-6">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-full" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </CardContent>
            </Card>
             <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-28 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        </div>
    )
}
