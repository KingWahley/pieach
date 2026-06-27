// app/(public)/about/page.js
import AboutHeroSection from "@/components/sections/AboutHeroSection";
import SynthesisSection from "@/components/sections/SynthesisSection";
import PhilosophyQuoteSection from "@/components/sections/PhilosophyQuoteSection";
import OurDisciplinesSection from "@/components/sections/OurDisciplinesSection";
import RegionalImpactSection from "@/components/sections/RegionalImpactSection";
import BlogSection from "@/components/sections/BlogSection";
import EcologicalSection from "@/components/sections/EcologicalSection";
import FAQsSection from "@/components/sections/FAQsSection";
import CTASection from "@/components/sections/CTASection";
import { createServerClient } from "@/lib/supabase/server";

export const revalidate = 60; // Revalidate every minute

export const metadata = {
  title: "About Us | PIEACH Limited",
  description: "Established in 1997, PIEACH Limited is a multi-disciplinary practice of visionary specialists in architecture, master planning, interior design, and project management in West Africa.",
};

export default async function AboutPage() {
  const supabase = createServerClient();

  // Fetch published blog posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <>
      <AboutHeroSection />
      <SynthesisSection />
      <PhilosophyQuoteSection />
      <OurDisciplinesSection />
      <RegionalImpactSection />
      <BlogSection posts={posts || []} />
      <EcologicalSection />
      <FAQsSection />
      <CTASection />
    </>
  );
}
