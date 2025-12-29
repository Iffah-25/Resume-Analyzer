import { FeatureSection } from '@/components/app/feature-section';
import { Footer } from '@/components/app/footer';
import { HeroSection } from '@/components/app/hero-section';
import { HowItWorksSection } from '@/components/app/how-it-works-section';
import { ResumeAnalyzer } from '@/components/app/resume-analyzer';
import { TrustAndPrivacySection } from '@/components/app/trust-privacy-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <HowItWorksSection />
        <ResumeAnalyzer />
        <TrustAndPrivacySection />
      </main>
      <Footer />
    </div>
  );
}
