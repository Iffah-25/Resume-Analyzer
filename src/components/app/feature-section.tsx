'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  BarChart,
  Briefcase,
  FileUp,
  KeyRound,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const features = [
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'ATS Score & Resume Strength',
    description:
      'Get a clear score that tells you how well your resume will pass automated screening.',
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: 'Job Role–Based Feedback',
    description:
      'Receive tailored advice by selecting your target job role for more relevant suggestions.',
  },
  {
    icon: <KeyRound className="h-8 w-8 text-primary" />,
    title: 'Missing Keywords Detection',
    description:
      'Uncover the exact keywords and skills you need to add for your specific career path.',
  },
  {
    icon: <FileUp className="h-8 w-8 text-primary" />,
    title: 'DOC/DOCX Resume Upload',
    description:
      'Easily upload your resume in .doc or .docx format for a quick and seamless analysis.',
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'AI Summary Improvement',
    description:
      'Let AI craft a powerful, attention-grabbing professional summary for you in seconds.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Privacy-First',
    description:
      'Your resume data is processed securely and is never stored on our servers. No sign-up needed.',
  },
];

export function FeatureSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div
        ref={ref}
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
        <div className="mt-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-sm mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl"
          >
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem
                  key={index}
                  className="sm:basis-1/2 lg:basis-1/3 p-4"
                >
                  <div className="h-full p-1">
                    <Card
                      className={cn(
                        'h-full transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'
                      )}
                    >
                      <CardHeader className="flex flex-col items-center text-center">
                        {feature.icon}
                        <CardTitle className="mt-4 text-xl">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-muted-foreground text-sm pb-6">
                        {feature.description}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
