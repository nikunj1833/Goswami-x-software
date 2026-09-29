import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ApproachSection from "@/components/ApproachSection";
import WorkSection from "@/components/WorkSection";
import TechStackSection from "@/components/TechStackSection";
import AboutSection from "@/components/AboutSection";
import ComparisonSection from "@/components/ComparisonSection";
import JourneySection from "@/components/JourneySection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="relative z-[2] pt-24">
      <HeroSection />
      <StatsSection />
      <ApproachSection />
      <WorkSection />
      <TechStackSection />
      <AboutSection />
      <ComparisonSection />
      <JourneySection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </main>
  );
}
