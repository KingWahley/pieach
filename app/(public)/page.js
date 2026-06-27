// app/(public)/page.js
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ClientsSection from "@/components/sections/ClientsSection";
import BlogSection from "@/components/sections/BlogSection";
import CTASection from "@/components/sections/CTASection";
import { createServerClient } from "@/lib/supabase/server";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const supabase = createServerClient();

  // Fetch published projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .neq('status', 'Draft')
    .limit(7);

  // Fetch published blog posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection projects={projects || []} />
      <ClientsSection />
      <BlogSection posts={posts || []} />
      <CTASection />
    </>
  );
}
