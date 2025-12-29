'use client';

import type { ResumeAnalysisOutput } from '@/ai/schemas';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BookText, Bot, BrainCircuit, Gem, Star, ShieldCheck, FileDiff, CheckSquare, Square } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

interface AnalysisDisplayProps {
  analysis: ResumeAnalysisOutput | null;
  isPending: boolean;
}

const SectionCard = ({ icon, title, children, className }: { icon: React.ReactNode, title: string, children: React.ReactNode, className?: string }) => (
    <Card className={cn("transition-all duration-300 hover:shadow-primary/10 hover:border-primary/30", className)}>
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
      gauge: 'text-red-400',
    },
    Average: {
      badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      text: 'text-yellow-400',
      gauge: 'text-yellow-400',
    },
    Strong: {
      badge: 'bg-green-500/20 text-green-400 border-green-500/30',
      text: 'text-green-400',
      gauge: 'text-green-400',
    },
  };

const ScoreGauge = ({ score, maxScore }: { score: number, maxScore: number }) => {
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    const circumference = 2 * Math.PI * 45; // 2 * pi * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    let colorClass = 'text-green-500';
    if (percentage < 50) colorClass = 'text-red-500';
    else if (percentage < 80) colorClass = 'text-yellow-500';
  
    return (
      <div className="relative h-32 w-32">
        <svg className="absolute inset-0" viewBox="0 0 100 100">
          <circle
            className="text-muted/20"
            stroke="currentColor"
            strokeWidth="10"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
          />
          <circle
            className={cn('transform -rotate-90 origin-center transition-all duration-1000 ease-out', colorClass)}
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            style={{ strokeDashoffset: circumference, animation: 'progress-animation 1s ease-out forwards' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-foreground">
            {score}<span className="text-lg text-muted-foreground">/{maxScore}</span>
          </span>
        </div>
        <style jsx>{`
          @keyframes progress-animation {
            from {
              stroke-dashoffset: ${circumference};
            }
            to {
              stroke-dashoffset: ${strokeDashoffset};
            }
          }
        `}</style>
      </div>
    );
  };

const ChecklistItem = ({ children }: { children: React.ReactNode }) => {
    const [isChecked, setIsChecked] = useState(false);
    const Icon = isChecked ? CheckSquare : Square;

    return (
        <div 
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => setIsChecked(!isChecked)}
        >
            <Icon className={cn("h-5 w-5 mt-0.5 shrink-0 transition-all", isChecked ? 'text-primary' : 'text-muted-foreground')} />
            <p className={cn("transition-all", isChecked ? 'line-through text-muted-foreground' : 'text-foreground')}>
                {children}
            </p>
        </div>
    );
}

export function AnalysisDisplay({ analysis, isPending }: AnalysisDisplayProps) {
    const [showImproved, setShowImproved] = useState(true);

    if (isPending) {
      return <AnalysisSkeleton />;
    }
  
    if (!analysis) {
      return null;
    }
  
    const [score, maxScore] = (analysis.resumeStrengthScore || "0/10").split('/').map(Number);
    const iconProps = { className: "h-6 w-6 text-primary" };
    const atsStyles = atsCompatibilityStyles[analysis.atsCompatibility] || atsCompatibilityStyles.Average;
  
    return (
      <div className="mt-8 grid gap-6 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6 items-center">
              <SectionCard icon={<Star {...iconProps} />} title="Resume Strength Score">
                  <div className="flex items-center justify-center gap-4">
                      <ScoreGauge score={score} maxScore={maxScore} />
                  </div>
              </SectionCard>
              <SectionCard icon={<ShieldCheck {...iconProps} />} title="ATS Compatibility">
                  <div className="flex flex-col items-center justify-center gap-4 h-full">
                      <Badge className={cn('text-2xl font-bold px-4 py-2', atsStyles.badge)}>
                          {analysis.atsCompatibility}
                      </Badge>
                      <p className={cn('font-semibold text-center', atsStyles.text)}>
                          {analysis.atsCompatibility === 'Poor' && 'Needs major improvement for ATS scanners.'}
                          {analysis.atsCompatibility === 'Average' && 'Good, but could be better optimized.'}
                          {analysis.atsCompatibility === 'Strong' && 'Well-optimized for most ATS scanners.'}
                      </p>
                  </div>
              </SectionCard>
          </div>
  
          <SectionCard icon={<FileDiff {...iconProps} />} title="Professional Summary">
            <div className='flex items-center justify-center mb-4 space-x-2'>
                <Label htmlFor='summary-toggle' className={cn('font-normal transition-colors', !showImproved ? 'text-primary font-semibold' : 'text-muted-foreground')}>Before</Label>
                <Switch id="summary-toggle" checked={showImproved} onCheckedChange={setShowImproved} />
                <Label htmlFor='summary-toggle' className={cn('font-normal transition-colors', showImproved ? 'text-primary font-semibold' : 'text-muted-foreground')}>After (AI)</Label>
            </div>
            <div className="relative overflow-hidden">
              <div className={cn("text-muted-foreground leading-relaxed transition-all duration-500", !showImproved ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute')}>
                  {analysis.originalSummary}
              </div>
              <div className={cn("text-foreground leading-relaxed transition-all duration-500", showImproved ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 absolute')}>
                  {analysis.improvedProfessionalSummary}
              </div>
            </div>
          </SectionCard>
  
          <div className="grid md:grid-cols-2 gap-6">
              <SectionCard icon={<BrainCircuit {...iconProps} />} title="Skills to Add or Improve">
                  <div className="flex flex-wrap gap-2">
                      {analysis.skillsToAddOrImprove.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="hover:bg-primary/20 hover:text-primary transition-colors cursor-default">{skill}</Badge>
                      ))}
                  </div>
              </SectionCard>
  
              <SectionCard icon={<Gem {...iconProps} />} title="Missing ATS Keywords">
                  <div className="flex flex-wrap gap-2">
                      {analysis.atsKeywordsMissing.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="hover:bg-primary/20 hover:text-primary transition-colors cursor-default">{keyword}</Badge>
                      ))}
                  </div>
              </SectionCard>
          </div>
  
          <SectionCard icon={<BookText {...iconProps} />} title="Section-wise Suggestions">
              <Accordion type="single" collapsible className="w-full">
                  {Object.entries(analysis.sectionWiseSuggestions).map(([section, suggestions]) => (
                    Array.isArray(suggestions) && suggestions.length > 0 && (
                      <AccordionItem value={section} key={section}>
                          <AccordionTrigger className="text-lg capitalize font-medium">{section}</AccordionTrigger>
                          <AccordionContent className="text-base text-muted-foreground leading-relaxed space-y-2">
                              {suggestions.map((suggestion, index) => (
                                  <ChecklistItem key={index}>{suggestion}</ChecklistItem>
                              ))}
                          </AccordionContent>
                      </AccordionItem>
                    )
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
                      <CardContent className="flex justify-center">
                          <Skeleton className="h-32 w-32 rounded-full" />
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                          <Skeleton className="h-6 w-1/2" />
                      </CardHeader>
                      <CardContent className="flex flex-col items-center justify-center gap-4">
                          <Skeleton className="h-10 w-28 rounded-full" />
                          <Skeleton className="h-4 w-3/4" />
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
  