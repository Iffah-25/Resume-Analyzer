import { ResumeImprover } from '@/components/app/resume-improver';

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-8 md:mb-12 max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            Gemini Resume Improver
          </h1>
          <p className="text-muted-foreground mt-3 md:text-xl">
            Get instant, AI-powered feedback to optimize your resume for ATS and impress recruiters.
          </p>
        </header>
        <ResumeImprover />
      </div>
    </main>
  );
}
