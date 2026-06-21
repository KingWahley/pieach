import AboutHeroSection from "@/components/sections/AboutHeroSection";
import SynthesisSection from "@/components/sections/SynthesisSection";
import PhilosophyQuoteSection from "@/components/sections/PhilosophyQuoteSection";
import OurDisciplinesSection from "@/components/sections/OurDisciplinesSection";
import RegionalImpactSection from "@/components/sections/RegionalImpactSection";
import BlogSection from "@/components/sections/BlogSection";
import EcologicalSection from "@/components/sections/EcologicalSection";
import FAQsSection from "@/components/sections/FAQsSection";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "About Us | PIEACH Limited",
  description: "Established in 1997, PIEACH Limited is a multi-disciplinary practice of visionary specialists in architecture, master planning, interior design, and project management in West Africa.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <SynthesisSection />
      <PhilosophyQuoteSection />
      <OurDisciplinesSection />
      <RegionalImpactSection />
      <BlogSection />
      <EcologicalSection />
      <FAQsSection />
      <CTASection />
    </>
  );
}
