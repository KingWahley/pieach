// app/(public)/team/page.js
import TeamHeroSection from "@/components/sections/TeamHeroSection";
import OurTeamSection from "@/components/sections/OurTeamSection";
import TeamValuesSection from "@/components/sections/TeamValuesSection";
import TeamQuoteSection from "@/components/sections/TeamQuoteSection";
import CTASection from "@/components/sections/CTASection";
import { createServerClient } from "@/lib/supabase/server";

export const revalidate = 60; // Revalidate every minute

export const metadata = {
  title: "Our Team | PIEACH Limited",
  description: "Meet the visionary architects, planners, interior designers, and project managers behind PIEACH Limited.",
};

export default async function TeamPage() {
  const supabase = createServerClient();
  
  // Fetch team members from Supabase ordered by order_index
  const { data: teamMembers } = await supabase
    .from('team')
    .select('*')
    .order('order_index');

  const formattedMembers = (teamMembers || []).map(member => ({
    ...member,
    bio: member.bio || [],
    qualifications: member.qualifications || []
  }));

  return (
    <>
      <TeamHeroSection />
      <OurTeamSection members={formattedMembers} />
      <TeamValuesSection />
      <TeamQuoteSection />
      <CTASection />
    </>
  );
}
