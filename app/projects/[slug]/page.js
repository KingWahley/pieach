import { PROJECTS } from "@/lib/constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import TeamQuoteSection from "@/components/sections/TeamQuoteSection";
import CTASection from "@/components/sections/CTASection";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  
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
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Get 3 related projects
  const related = PROJECTS.filter((p) => p.slug !== project.slug);
  const relatedProjects = related.filter((p) => 
    p.groups && p.groups.some(g => project.groups && project.groups.includes(g))
  ).slice(0, 3);

  if (relatedProjects.length < 3) {
    const remaining = related.filter(p => !relatedProjects.includes(p));
    relatedProjects.push(...remaining.slice(0, 3 - relatedProjects.length));
  }

  return (
    <div className="bg-white text-neutral-900">
      
      {/* 1. Hero Banner Section */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-start overflow-hidden bg-neutral-900">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-105"
          style={{ backgroundImage: `url('${project.image}')` }}
        />
        
        {/* Gradients Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/70 via-transparent to-black/35" />

        <div className="relative z-20 mx-auto max-w-[1600px] w-full px-5 sm:px-8 lg:px-12 pt-24">
          <div className="max-w-4xl">
            <h1 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[1.05] text-white mb-6">
              {project.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.2em] text-brand-gold uppercase">
                {project.category}
              </span>
              <span className="w-8 h-[1px] bg-brand-gold" />
              <span className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.2em] text-neutral-300 uppercase">
                {project.location}
              </span>
            </div>
          </div>
        </div>
      </section>

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

              {/* Technical Specs 3-Column Grid without borders */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8">
                
                {/* Column 1 */}
                <div className="space-y-10">
                  <div>
                    <span className="font-sans font-bold text-[11px] tracking-[0.2em] text-brand-gold uppercase block mb-3">PROJECT TYPE</span>
                    <span className="font-serif text-lg sm:text-xl text-white font-medium block leading-snug">{project.specs.projectType}</span>
                  </div>
                  <div>
                    <span className="font-sans font-bold text-[11px] tracking-[0.2em] text-brand-gold uppercase block mb-3">STATUS</span>
                    <span className="font-serif text-lg sm:text-xl text-white font-medium block leading-snug">{project.specs.status}</span>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-10">
                  <div>
                    <span className="font-sans font-bold text-[11px] tracking-[0.2em] text-brand-gold uppercase block mb-3">SITE AREA</span>
                    <span className="font-serif text-lg sm:text-xl text-white font-medium block leading-snug">{project.specs.siteArea}</span>
                  </div>
                  <div>
                    <span className="font-sans font-bold text-[11px] tracking-[0.2em] text-brand-gold uppercase block mb-3">LEAD ARCHITECT</span>
                    <span className="font-serif text-lg sm:text-xl text-white font-medium block leading-snug">{project.specs.leadArchitect}</span>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-10">
                  <div>
                    <span className="font-sans font-bold text-[11px] tracking-[0.2em] text-brand-gold uppercase block mb-3">BUILT AREA</span>
                    <span className="font-serif text-lg sm:text-xl text-white font-medium block leading-snug">{project.specs.builtArea}</span>
                  </div>
                  <div>
                    <span className="font-sans font-bold text-[11px] tracking-[0.2em] text-brand-gold uppercase block mb-3">SERVICES</span>
                    <span className="font-serif text-lg sm:text-xl text-white font-medium block leading-snug">
                      {project.specs.services.split(",").map((service, idx, arr) => (
                        <span key={idx} className="block">
                          {service.trim()}{idx < arr.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

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
            {relatedProjects.map((proj) => (
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
