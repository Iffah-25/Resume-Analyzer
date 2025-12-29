'use client';

import { Button } from '@/components/ui/button';

export function HeroSection() {
    const handleScroll = () => {
        const element = document.getElementById('analyzer');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
  return (
    <section className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900/50 dark:via-background dark:to-indigo-900/20 animate-gradient-xy"></div>
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-200/50 dark:bg-blue-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-200/50 dark:bg-indigo-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none animate-fade-in-up">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                    Build an ATS-Ready Resume
                  </span>
                  <br />
                  with Gemini AI
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Instant resume feedback, keyword insights, and role-based suggestions — no sign-up required.
                </p>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Button size="lg" className="font-bold text-lg" onClick={handleScroll}>
                    Analyze My Resume
                </Button>
              </div>
            </div>
        </div>
    </section>
  );
}
