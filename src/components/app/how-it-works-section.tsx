'use client';

import { cn } from '@/lib/utils';
import { UploadCloud, Bot, FileText } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    icon: <UploadCloud className="h-8 w-8 text-primary" />,
    title: '1. Upload or Paste Resume',
    description:
      'Begin by either uploading your .docx file or pasting the text directly into the analyzer. Add a target job role for tailored advice.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: '2. Gemini AI Analyzes Content',
    description:
      'Our powerful AI engine reviews your resume against best practices, ATS standards, and your target job role.',
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: '3. Get Actionable Feedback',
    description:
      'Receive a detailed report with an ATS score, keyword suggestions, an improved summary, and section-wise improvement tips.',
  },
];

export function HowItWorksSection() {
    const { ref: sectionRef, inView: sectionInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div ref={sectionRef} className={cn("container px-4 md:px-6 transition-all duration-700 ease-out", sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 lg:mb-20">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              A Simple 3-Step Process
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get from resume to results in just a few clicks.
            </p>
          </div>
        </div>

        <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2 timeline-line" style={{ height: sectionInView ? '100%' : '0%' }}></div>
            {steps.map((step, index) => {
              const { ref: stepRef, inView: stepInView } = useInView({
                triggerOnce: true,
                threshold: 0.5,
              });

              return (
                <div key={index} ref={stepRef} className={cn("relative mb-16 flex items-center w-full", index % 2 === 0 ? 'justify-start' : 'justify-end')}>
                    <div className={cn('absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center transition-all duration-500 delay-300', stepInView ? 'scale-100' : 'scale-0')}>
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                    <div className={cn(
                        'w-[calc(50%-2rem)] p-6 rounded-xl bg-card border shadow-lg transition-all duration-700 ease-out hover-3d',
                        stepInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90',
                        index % 2 === 0 ? 'translate-x-0' : 'translate-x-0'
                    )}>
                        <div className="flex items-center gap-4 mb-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-left">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-left">{step.description}</p>
                    </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
