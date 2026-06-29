// app/(public)/projects/[slug]/page.js
import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProjectDetailsHeroSection from "@/components/sections/ProjectDetailsHeroSection";
import TeamQuoteSection from "@/components/sections/TeamQuoteSection";
import CTASection from "@/components/sections/CTASection";

export const revalidate = 60; // Revalidate every minute

export async function generateStaticParams() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('projects')
    .select('slug')
    .neq('status', 'Draft');
    
  return (data || []).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const supabase = createServerClient();
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | PIEACH Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailsPage({ params }) {
  const { slug } = await params;
  const supabase = createServerClient();
  
  // Fetch specific project
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (!project) {
    notFound();
  }

  // Fetch related projects (same group categories, except current one)
  const { data: allProjects } = await supabase
    .from('projects')
    .select('*')
    .neq('status', 'Draft')
    .neq('slug', project.slug);

  const related = (allProjects || []).filter((p) => 
    p.groups && p.groups.some(g => project.groups && project.groups.includes(g))
  ).slice(0, 3);

  if (related.length < 3) {
    const remaining = (allProjects || []).filter(p => !related.some(r => r.slug === p.slug));
    related.push(...remaining.slice(0, 3 - related.length));
  }

  return (
    <div className="bg-white text-neutral-900">
      
      {/* 1. Hero Banner Section */}
      <ProjectDetailsHeroSection 
        title={project.title}
        category={project.category}
        location={project.location}
        image={project.image}
      />

      {/* 2. Project Overview Section */}
      <section className="bg-brand-brown text-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Section Title */}
            <div className="lg:col-span-4">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight uppercase">
                PROJECT<br />OVERVIEW
              </h2>
            </div>
            
            {/* Right Column: Narrative & Technical Specs Grid */}
            <div className="lg:col-span-8">
              <p className="font-serif text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed font-light mb-12 max-w-4xl">
                {project.description}
              </p>
              
              {/* Thin horizontal line */}
              <div className="w-full h-[1px] bg-white/20 mb-12" />

              {/* Technical Specs Grid without borders (Only displaying non-empty specs) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8">
                {[
                  { label: 'PROJECT TYPE', value: project.specs?.projectType || project.category },
                  { label: 'STATUS', value: project.specs?.status || project.status },
                  { label: 'SITE AREA', value: project.specs?.siteArea },
                  { label: 'LEAD ARCHITECT', value: project.specs?.leadArchitect },
                  { label: 'BUILT AREA', value: project.specs?.builtArea },
                  { label: 'SERVICES', value: project.specs?.services, isServices: true }
                ].filter(item => item.value && item.value !== 'N/A' && item.value.trim() !== '').map((item, idx) => (
                  <div key={idx}>
                    <span className="font-sans font-bold text-[11px] tracking-[0.2em] text-brand-gold uppercase block mb-3">{item.label}</span>
                    {item.isServices ? (
                      <span className="font-serif text-lg sm:text-xl text-white font-medium block leading-snug">
                        {item.value.split(",").map((service, idx, arr) => (
                          <span key={idx} className="block">
                            {service.trim()}{idx < arr.length - 1 ? "," : ""}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className="font-serif text-lg sm:text-xl text-white font-medium block leading-snug">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3.5 Custom Description Sections */}
      {((project.specs?.additionalFields) || (project.additionalFields)) && 
       (((project.specs?.additionalFields) || (project.additionalFields)).length > 0) && (
        <section className="py-20 lg:py-24 bg-[#fafafa] text-neutral-900 border-b border-neutral-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {((project.specs?.additionalFields) || (project.additionalFields)).map((field, idx) => (
                <div key={field.id || idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4">
                    <h3 className="font-serif text-2xl font-bold uppercase tracking-tight text-neutral-950">
                      {field.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="font-sans text-neutral-600 text-sm leading-relaxed max-w-3xl whitespace-pre-line">
                      {field.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Project Gallery Section */}
      <section className="py-20 lg:py-24 bg-white text-neutral-900 border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-3 block">
              TECHNICAL VISUALISATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-950 tracking-tight leading-none uppercase">
              Project Gallery
            </h2>
          </div>

          {/* Grid Layout of 5 Images */}
          <div className="space-y-6">
            {/* 1 Large Full-Width Image */}
            {project.gallery && project.gallery[0] && (
              <div className="relative aspect-[16/7] md:aspect-[21/9] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                <img
                  src={project.gallery[0]}
                  alt={`${project.title} gallery visual 1`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}

            {/* Row 2: 2 Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery && project.gallery[1] && (
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                  <img
                    src={project.gallery[1]}
                    alt={`${project.title} gallery visual 2`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              {project.gallery && project.gallery[2] && (
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                  <img
                    src={project.gallery[2]}
                    alt={`${project.title} gallery visual 3`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Row 3: 2 Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery && project.gallery[3] && (
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                  <img
                    src={project.gallery[3]}
                    alt={`${project.title} gallery visual 4`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              {project.gallery && project.gallery[4] && (
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                  <img
                    src={project.gallery[4]}
                    alt={`${project.title} gallery visual 5`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Button to Projects Page */}
          <div className="mt-16 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center bg-brand-brown hover:bg-brand-gold hover:text-brand-navy text-white text-xs font-bold uppercase tracking-widest px-8 py-4 transition duration-300 shadow-md rounded-sm active:scale-95"
            >
              View All Projects
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Related Projects Section */}
      <section className="py-20 lg:py-24 bg-[#fafafa] text-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-950 tracking-tight leading-none uppercase">
              Related Projects
            </h2>
            <Link 
              href="/projects"
              className="font-sans font-bold text-xs uppercase tracking-widest text-brand-gold hover:text-brand-gold-hover transition duration-200"
            >
              View All
            </Link>
          </div>

          {/* 3-Column Related Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((proj) => (
              <Link
                key={proj.id}
                href={`/projects/${proj.slug}`}
                className="group flex flex-col justify-between border border-neutral-200/40 bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
              >
                {/* Image Container with zoom effect */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <div
                    className="absolute inset-0 bg-cover bg-center zoom-effect"
                    style={{ backgroundImage: `url('${proj.image}')` }}
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>

                {/* Text Description */}
                <div className="p-6">
                  <span className="font-sans font-bold text-[9px] tracking-widest text-brand-gold uppercase block mb-1">
                    {proj.category}
                  </span>
                  <h3 className="font-sans font-bold text-sm text-neutral-900 uppercase tracking-wide leading-snug">
                    {proj.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Team Quote Section (Reused component) */}
      <TeamQuoteSection />

      {/* 6. CTA Section (Reused component) */}
      <CTASection />

    </div>
  );
}
