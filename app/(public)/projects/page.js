// app/(public)/projects/page.js
import { createServerClient } from "@/lib/supabase/server";
import ProjectsPageClient from "./ProjectsPageClient";

export const revalidate = 60; // Revalidate every minute

export const metadata = {
  title: "Projects | PIEACH Limited",
  description: "Browse our architectural, master planning, and interior design portfolio. Explore selected residential and commercial projects.",
};

export default async function ProjectsPage() {
  const supabase = createServerClient();
  
  // Fetch published/completed/ongoing projects from Supabase
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .neq('status', 'Draft');

  const formattedProjects = (projects || []).map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    groups: p.groups || [],
    image: p.image,
    description: p.description,
    year: p.year,
    location: p.location,
    specs: p.specs || {},
    gallery: p.gallery || [],
    status: p.status
  }));

  return <ProjectsPageClient initialProjects={formattedProjects} />;
}
