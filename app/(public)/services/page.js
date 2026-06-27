import ServicesHeroSection from "@/components/sections/ServicesHeroSection";
import FormMeetsFunctionSection from "@/components/sections/FormMeetsFunctionSection";
import CoreServicesGridSection from "@/components/sections/CoreServicesGridSection";
import ArchitecturePermanenceSection from "@/components/sections/ArchitecturePermanenceSection";
import BlueprintJourneySection from "@/components/sections/BlueprintJourneySection";
import IndustriesWeShapeSection from "@/components/sections/IndustriesWeShapeSection";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Our Services | PIEACH Limited",
  description: "Established in 2007, PIEACH Limited offers masterplanning, architecture design, interior design, landscape design, and project management services in West Africa.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <FormMeetsFunctionSection />
      <CoreServicesGridSection />
      <ArchitecturePermanenceSection />
      <BlueprintJourneySection />
      <IndustriesWeShapeSection />
      <CTASection />
    </>
  );
}
