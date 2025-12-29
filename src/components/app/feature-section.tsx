'use client';

import {
  BarChart,
  Briefcase,
  FileUp,
  KeyRound,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    icon: BarChart,
    title: 'ATS Score & Resume Strength',
    description:
      'Get a clear score that tells you how well your resume will pass automated screening.',
    color: 'hsl(221.2 83.2% 53.3%)',
  },
  {
    icon: Briefcase,
    title: 'Job Role–Based Feedback',
    description:
      'Receive tailored advice by selecting your target job role for more relevant suggestions.',
    color: 'hsl(262.1 83.3% 57.8%)',
  },
  {
    icon: KeyRound,
    title: 'Missing Keywords Detection',
    description:
      'Uncover the exact keywords and skills you need to add for your specific career path.',
    color: 'hsl(175.8 98.2% 35.5%)',
  },
  {
    icon: FileUp,
    title: 'DOC/DOCX Resume Upload',
    description:
      'Easily upload your resume in .doc or .docx format for a quick and seamless analysis.',
    color: 'hsl(317.1 83.3% 57.8%)',
  },
  {
    icon: Sparkles,
    title: 'AI Summary Improvement',
    description:
      'Let AI craft a powerful, attention-grabbing professional summary for you in seconds.',
    color: 'hsl(47.9 95.8% 53.1%)',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy-First',
    description:
      'Your resume data is processed securely and is never stored on our servers. No sign-up needed.',
    color: 'hsl(142.1 76.2% 36.3%)',
  },
];

const TRANSITION_DURATION = 4000; // 4 seconds

export function FeatureSection() {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const activeFeature = useMemo(() => features[activeIndex], [activeIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % features.length);
  }, []);

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        handleNext();
      }, TRANSITION_DURATION);

      return () => clearInterval(interval);
    }
  }, [inView, handleNext]);

  const getCardStyle = (index: number) => {
    const offset = index - activeIndex;
    const normalizedOffset =
      (offset + features.length) % features.length;

    let transform = '';
    let opacity = 0;
    let zIndex = 0;
    let filter = 'blur(5px)';

    if (normalizedOffset === 0) {
      // Active card
      transform = 'translateY(0) scale(1)';
      opacity = 1;
      zIndex = features.length;
      filter = 'blur(0px)';
    } else if (normalizedOffset === 1) {
      // Next card
      transform = 'translateY(50px) translateX(30px) scale(0.85)';
      opacity = 0.4;
      zIndex = features.length - 1;
    } else if (normalizedOffset === features.length - 1) {
      // Previous card
      transform = 'translateY(-50px) translateX(-30px) scale(0.85)';
      opacity = 0.4;
      zIndex = features.length - 2;
    } else {
      // Hidden cards
      transform = `translateY(${offset * 20}px) scale(0.7)`;
      opacity = 0;
      zIndex = 0;
    }

    return {
      transform,
      opacity,
      zIndex,
      filter,
      transition: 'all 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    };
  };

  const dynamicStyle = {
    '--active-color': activeFeature.color,
    '--transition-duration': `${TRANSITION_DURATION}ms`,
    '--animation-play-state': inView ? 'running' : 'paused',
  } as React.CSSProperties;

  return (
    <section id="features" className="w-full py-12 md:py-16 lg:py-20 overflow-hidden">
      <div
        ref={sectionRef}
        style={dynamicStyle}
        className={cn(
          'container px-4 md:px-6 transition-all duration-700 ease-out',
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Why You'll Love It
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our Resume Improver is packed with features designed to give you a
              competitive edge in your job search.
            </p>
          </div>
        </div>
        <div className="mt-20 relative h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 feature-gradient-bg transition-colors duration-1000 ease-in-out"></div>
          {features.map((feature, index) => {
            const isActive = index === activeIndex;
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="absolute w-[95%] max-w-3xl p-8 rounded-xl bg-background/50 backdrop-blur-md shadow-2xl border border-white/10"
                style={getCardStyle(index)}
              >
                <div className="flex items-center gap-4">
                  <div className={cn("icon-wrapper", { 'animate-pulse-rotate': isActive })}>
                     <Icon className="h-10 w-10 text-[--active-color] transition-colors duration-1000 ease-in-out" />
                  </div>
                  <h3
                    className={cn(
                      'text-2xl font-bold text-left w-full',
                      { 'typewriter-text': isActive }
                    )}
                    style={{ '--text-len': feature.title.length } as React.CSSProperties}
                  >
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-4 text-muted-foreground text-left">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
