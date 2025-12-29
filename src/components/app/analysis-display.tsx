
'use client';

import type { ResumeAnalysisOutput } from '@/ai/schemas';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { BookText, Bot, BrainCircuit, Gem, Star, ShieldCheck } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface AnalysisDisplayProps {
  analysis: ResumeAnalysisOutput | null;
  isPending: boolean;
}

const SectionCard = ({ icon, title, children, className }: { icon: React.ReactNode, title: string, children: React.ReactNode, className?: string }) => (
    <Card className={className}>
        <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-4">
            {icon}
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

const atsCompatibilityStyles = {
    Poor: {
      badge: 'bg-red-500/20 text-red-400 border-red-500/30',
      text: 'text-red-400',
    },
    Average: {
      badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      text: 'text-yellow-400',
    },
    Strong: {
      badge: 'bg-green-500/20 text-green-400 border-green-500/30',
      text: 'text-green-400',
    },
  };

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
  const atsStyles = atsCompatibilityStyles[analysis.atsCompatibility] || atsCompatibilityStyles.Average;

  return (
    <div className="mt-8 grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
            <SectionCard icon={<Star {...iconProps} />} title="Resume Strength Score">
                <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-primary">{analysis.resumeStrengthScore}</span>
                    <Progress value={percentage} className="w-full h-3" />
                </div>
            </SectionCard>
            <SectionCard icon={<ShieldCheck {...iconProps} />} title="ATS Compatibility">
                <div className="flex items-center gap-4">
                    <Badge className={cn('text-lg font-bold', atsStyles.badge)}>
                        {analysis.atsCompatibility}
                    </Badge>
                    <p className={cn('font-semibold', atsStyles.text)}>
                        {analysis.atsCompatibility === 'Poor' && 'Needs major improvement for ATS.'}
                        {analysis.atsCompatibility === 'Average' && 'Good, but could be better optimized.'}
                        {analysis.atsCompatibility === 'Strong' && 'Well-optimized for ATS scanners.'}
                    </p>
                </div>
            </SectionCard>
        </div>

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
                        <AccordionContent className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
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
            <div className="grid md:grid-cols-2 gap-6">
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
                        <Skeleton className="h-6 w-1/2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-full" />
                    </CardContent>
                </Card>
            </div>
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
