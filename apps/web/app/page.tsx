import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { FeaturedCoursesSection } from "@/components/featured-courses-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { BenefitsSection } from "@/components/benefits-section";
import { CtaSection } from "@/components/cta-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <FeaturedCoursesSection />
      <TestimonialsSection />
      <BenefitsSection />
      <CtaSection />
    </main>
  );
}
