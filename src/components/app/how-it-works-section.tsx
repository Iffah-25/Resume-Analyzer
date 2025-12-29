'use client';

import { cn } from '@/lib/utils';
import { UploadCloud, Bot, FileText, ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    icon: <UploadCloud className="h-10 w-10 text-primary" />,
    title: 'Upload or Paste Resume',
    description:
      'Begin by either uploading your .docx file or pasting the text directly into the analyzer.',
  },
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: 'Gemini AI Analyzes Content',
    description:
      'Our powerful AI engine reviews your resume against best practices and your target job role.',
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: 'Get Actionable Feedback',
    description:
      'Receive a detailed report with scores, keyword suggestions, and improvement tips.',
  },
];

export function HowItWorksSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
      });

  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div ref={ref} className={cn("container px-4 md:px-6 transition-all duration-700 ease-out", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
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

        <div className="relative grid gap-8 md:grid-cols-3 md:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                'flex flex-col items-center text-center p-6 rounded-lg',
                'opacity-0 animate-fade-in-up'
                )}
              style={{ animationDelay: `${0.2 + index * 0.15}s`, animationFillMode: 'forwards' }}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                {step.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <ChevronRight className="absolute top-1/2 -right-6 h-12 w-12 text-primary/20 hidden md:block" style={{ transform: 'translateY(-50%)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
