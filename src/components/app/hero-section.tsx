'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const heroTexts = [
  'Analyze your resume instantly',
  'Improve ATS score with Gemini AI',
  'Get role-based resume insights',
];

export function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = heroTexts[textIndex];
      if (isDeleting) {
        setDisplayedText((prev) => prev.substring(0, prev.length - 1));
      } else {
        setDisplayedText((prev) => currentText.substring(0, prev.length + 1));
      }

      if (!isDeleting && displayedText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000); // Pause at end
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % heroTexts.length);
      }
    };

    const typingSpeed = isDeleting ? 50 : 120;
    const timeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      initParticles();
    };

    class Particle {
        x: number;
        y: number;
        radius: number;
        vx: number;
        vy: number;
        opacity: number;

        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 1.5 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        draw() {
            if (!ctx) return;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(150, 150, 180, ${this.opacity})`;
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
    }
    
    const initParticles = () => {
        particles = [];
        const numberOfParticles = (canvas.width * canvas.height) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };

  }, []);


  const handleScroll = () => {
    const element = document.getElementById('analyzer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 lg:pb-40 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900/50 dark:via-background dark:to-indigo-900/20 animate-gradient-xy z-10"></div>
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-200/50 dark:bg-blue-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob z-10"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-200/50 dark:bg-indigo-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 z-10"></div>

      <div className="container px-4 md:px-6 relative z-20">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none animate-fade-in-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Build an ATS-Ready Resume
              </span>
              <br />
              with Gemini AI
            </h1>
            <div
              className="max-w-[700px] text-muted-foreground md:text-xl mx-auto animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <span
                className={cn(
                  'typewriter-text inline-block border-r-4 border-muted-foreground'
                )}
              >
                {displayedText}
              </span>
              &nbsp;
            </div>
          </div>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <Button
              size="lg"
              className="font-bold text-lg"
              onClick={handleScroll}
            >
              Analyze My Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
