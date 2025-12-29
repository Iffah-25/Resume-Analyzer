'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, BrainCircuit, Gem, Star } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Star className="h-8 w-8 text-primary" />,
    title: 'Resume Strength Score',
    description: 'Get an instant score out of 10 to understand your resume\'s overall strength and effectiveness at a glance.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'Improved Professional Summary',
    description: 'Receive an AI-generated, concise, and impactful professional summary to grab recruiters\' attention.',
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Skills & Keywords',
    description: 'Discover crucial skills to add and identify missing ATS keywords to ensure your resume passes automated screening.',
  },
  {
    icon: <Gem className="h-8 w-8 text-primary" />,
    title: 'Section-wise Suggestions',
    description: 'Get detailed, actionable feedback for every section of your resume, complete with examples to guide you.',
  },
];

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4 animate-fade-in-up">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[200%_auto] animate-gradient">
                  Supercharge Your Resume with AI
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                  Our AI-powered tool analyzes your resume to give you actionable feedback, helping you get past automated systems and land your dream job.
                </p>
              </div>
              <div className="w-full max-w-sm sm:max-w-sm mx-auto animate-fade-in-up [animation-delay:0.3s]">
                  <Link href="/tool">
                      <Button size="lg" className="w-full">
                      Get Started
                      </Button>
                  </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why You'll Love It</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our Resume Improver is packed with features designed to give you a competitive edge in your job search.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {features.map((feature, index) => (
                <Card key={index} 
                      className={cn(
                        "h-full transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up"
                      )}
                      style={{ animationDelay: `${0.2 + index * 0.15}s` }}>
                  <CardHeader className="flex flex-col items-center text-center">
                    {feature.icon}
                    <CardTitle className="mt-4 text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-muted-foreground">
                    {feature.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Gemini Resume Improver. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
