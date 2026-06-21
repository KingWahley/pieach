import TeamHeroSection from "@/components/sections/TeamHeroSection";
import OurTeamSection from "@/components/sections/OurTeamSection";
import TeamValuesSection from "@/components/sections/TeamValuesSection";
import TeamQuoteSection from "@/components/sections/TeamQuoteSection";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Our Team | PIEACH Limited",
  description: "Meet the visionary architects, planners, interior designers, and project managers behind PIEACH Limited.",
};

export default function TeamPage() {
  return (
    <>
      <TeamHeroSection />
      <OurTeamSection />
      <TeamValuesSection />
      <TeamQuoteSection />
      <CTASection />
    </>
  );
}
