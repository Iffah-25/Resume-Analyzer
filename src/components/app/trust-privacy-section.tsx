'use client';

import { cn } from '@/lib/utils';
import { Lock, ServerOff, CheckCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const items = [
  {
    icon: <Lock className="h-6 w-6 text-green-500" />,
    text: 'No login or account creation required.',
  },
  {
    icon: <ServerOff className="h-6 w-6 text-green-500" />,
    text: 'Your resume data is never stored on our servers.',
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    text: 'Processed securely using Google Gemini AI.',
  },
];

export function TrustAndPrivacySection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
      });
  return (
    <section id="privacy" className="w-full py-12 md:py-16 lg:py-20">
      <div ref={ref} className={cn("container px-4 md:px-6 transition-all duration-700 ease-out", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Trust & Privacy-First
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Your career data is sensitive. We're committed to protecting it.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50"
              >
                {item.icon}
                <span className="text-muted-foreground text-left">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
