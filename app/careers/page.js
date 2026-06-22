import Link from "next/link";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Careers | PIEACH Limited",
  description: "Join the visionary design and management team at PIEACH Limited. Explore our open positions and career paths.",
};

const CAREERS_LIST = [
  {
    slug: "senior-architect",
    title: "Senior Architect",
    type: "LAGOS, NIGERIA — FULL-TIME",
    description: "Requirements: 10+ years experience, Proficiency in Revit and AutoCAD, Lead project delivery across Africa.",
  },
  {
    slug: "interior-designer",
    title: "Interior Designer",
    type: "CAPE TOWN, SOUTH AFRICA — HYBRID",
    description: "Requirements: 5+ years luxury residential experience, Expertise in material sourcing and FF&E, Strong visualization skills.",
  },
  {
    slug: "project-architect",
    title: "Project Architect",
    type: "NAIROBI, KENYA — FULL-TIME",
    description: "Requirements: Registered architect, 7+ years experience, Strong technical detailing and site supervision skills.",
  },
];

const PHILOSOPHY_ITEMS = [
  {
    title: "Creativity",
    description: "Pushing the boundaries of form and function to create unique architectural signatures.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 0A3.75 3.75 0 0 0 12 18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M10.5 19.5h3M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l.707-.707m2.808 13.064a3 3 0 01-5.176-3.001 6.002 6.002 0 1111.026 0 3 3 0 01-5.176 3.001z" />
      </svg>
    ),
  },
  {
    title: "Collaboration",
    description: "Harnessing the power of collective intelligence through seamless team dynamics.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Sustainability",
    description: "Designing for a lasting future with ecologically conscious materials and systems.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747C20.45 10.45 16 6 12 6c-4 0-8.45 4.45-8.716 8.253A9.004 9.004 0 0012 21zm0 0V6" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description: "Integrating cutting-edge technology into traditional architectural craftsmanship.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 9.75h8.25L9.75 21.75 12 14.25H3.75z" />
      </svg>
    ),
  },
  {
    title: "Craftsmanship",
    description: "Meticulous attention to detail that transforms a structure into a masterpiece.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7L7 21M12 7l5 14M9.5 14h5" />
      </svg>
    ),
  },
  {
    title: "Excellence",
    description: "An uncompromising standard of quality across every stage of the design process.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.195-.39.73-.39.925 0l2.147 4.35 4.793.696c.43.062.602.588.291.896l-3.468 3.38.819 4.774c.074.431-.381.761-.767.557l-4.283-2.253-4.283 2.253c-.386.204-.84-.126-.767-.557l.819-4.774-3.468-3.38c-.31-.308-.139-.834.291-.896l4.793-.696 2.147-4.35z" />
      </svg>
    ),
  },
];

export default function CareersPage() {
  return (
    <div className="bg-white text-neutral-900">
      
      {/* 1. Hero Banner Section */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-start overflow-hidden bg-neutral-900">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-105"
          style={{ backgroundImage: "url('/assets/service_masterplanning.png')" }}
        />
        
        {/* Gradients Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/70 via-transparent to-black/35" />

        <div className="relative z-20 mx-auto max-w-[1600px] w-full px-5 sm:px-8 lg:px-12 pt-24">
          <div className="max-w-4xl">
            <h1 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[1.05] text-white mb-6">
              Build Spaces. Shape<br />Experiences.
            </h1>
            <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-xl">
              Join a multidisciplinary team shaping the future of West Africa.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#open-roles-section"
                className="inline-flex items-center justify-center bg-brand-gold text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm shadow-md hover:bg-brand-gold-hover hover:shadow-lg transition duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                View Open Roles
              </a>
              <a
                href="#philosophy-section"
                className="inline-flex items-center justify-center border border-white text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm hover:bg-white hover:text-brand-navy transition duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Our Philosophy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Introduction Section (The Studio Spirit) */}
      <section id="philosophy-section" className="py-20 lg:py-24 border-b border-neutral-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Left Column: Section Title */}
            <div className="lg:col-span-4">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 tracking-tight leading-tight uppercase">
                THE STUDIO<br />SPIRIT
              </h2>
            </div>
            
            {/* Right Column: Paragraphs */}
            <div className="lg:col-span-8 space-y-6 max-w-3xl">
              <p className="font-serif text-neutral-700 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
                At PIEACH, we believe that great design is born out of rigorous collaboration, research, and an unwavering commitment to quality. Our studio is more than just a workplace—it is a laboratory of ideas where designers, managers, and thinkers come together to shape the future of the built environment.
              </p>
              <p className="font-serif text-neutral-600 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
                We are always looking for visionary designers, detail-oriented project managers, and creative problem-solvers to join our studio in Lagos. If you are passionate about architecture that is both functional and sustainable, and want to work on projects that make a lasting impact, we would love to hear from you.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Philosophy Values Section */}
      <section className="bg-[#BCAE9E] text-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <span className="font-sans font-medium text-xs sm:text-sm uppercase tracking-[0.3em] text-white/90 block mb-4">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
              Driven by Intent
            </h2>
          </div>

          {/* Grid Layout of 6 Value Cards with dividing lines */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/40">
            {PHILOSOPHY_ITEMS.map((item, index) => (
              <div 
                key={index} 
                className={`p-8 md:p-12 space-y-6 flex flex-col ${
                  index === 0
                    ? "border-b border-white/40 md:border-r"
                    : index === 1
                    ? "border-b border-white/40 md:border-r"
                    : index === 2
                    ? "border-b border-white/40"
                    : index === 3
                    ? "border-b border-white/40 md:border-b-0 md:border-r"
                    : index === 4
                    ? "border-b border-white/40 md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <div className="text-white">
                  {item.icon}
                </div>
                <h3 className="font-serif text-2xl text-white font-normal leading-tight pt-2">
                  {item.title}
                </h3>
                <p className="font-sans text-white/90 text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Elevate Your Practice Section */}
      <section className="bg-brand-brown text-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light uppercase mb-16 tracking-tight">
            Elevate Your Practice
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Block 1 */}
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-base uppercase tracking-wider text-brand-gold">
                Context & Complexity
              </h3>
              <p className="font-sans text-neutral-300 text-sm leading-relaxed font-light">
                Engage with complex projects that challenge and expand your architectural capabilities.
              </p>
            </div>

            {/* Block 2 */}
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-base uppercase tracking-wider text-brand-gold">
                Collaboration
              </h3>
              <p className="font-sans text-neutral-300 text-sm leading-relaxed font-light">
                Work alongside experienced principals and project leads to refine your practice.
              </p>
            </div>

            {/* Block 3 */}
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-base uppercase tracking-wider text-brand-gold">
                Design Autonomy
              </h3>
              <p className="font-sans text-neutral-300 text-sm leading-relaxed font-light">
                Take ownership of design phases, from concept drawings to construction supervision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Open Roles Section */}
      <section id="open-roles-section" className="py-20 lg:py-28 bg-white text-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 font-normal">
              Open Roles
            </h2>
            <span className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase">
              6 AVAILABLE
            </span>
          </div>

          {/* List of Roles */}
          <div className="border-t border-b border-neutral-200 divide-y divide-neutral-200">
            {CAREERS_LIST.map((job) => (
              <div 
                key={job.title}
                className="flex flex-col md:flex-row md:items-center justify-between py-12 gap-8"
              >
                {/* Left Block */}
                <div className="space-y-2 max-w-3xl">
                  <h3 className="font-serif text-2xl sm:text-3xl text-neutral-950 font-medium tracking-tight">
                    {job.title}
                  </h3>
                  <span className="block font-sans text-[10px] sm:text-xs font-bold tracking-[0.2em] text-brand-gold uppercase">
                    {job.type}
                  </span>
                  <p className="font-sans text-neutral-500 text-sm sm:text-base leading-relaxed font-light pt-2">
                    {job.description}
                  </p>
                </div>

                {/* Right Block: Rectangular bordered button */}
                <div className="flex-shrink-0">
                  <Link
                    href={`/careers/${job.slug}`}
                    className="w-full md:w-36 h-12 flex items-center justify-center border border-neutral-950 rounded-sm text-[10px] font-bold uppercase tracking-widest text-neutral-950 hover:bg-neutral-950 hover:text-white transition duration-300 active:scale-95 cursor-pointer"
                  >
                    APPLY
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Selection Journey Section */}
      <section className="py-20 lg:py-24 bg-[#fafafa] text-neutral-900 border-t border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 uppercase tracking-tight leading-none mb-16">
            Selection Journey
          </h2>

          {/* Timeline Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Timeline connectors (desktop only) */}
            <div className="absolute top-7 left-[10%] right-[10%] h-[1px] bg-neutral-200 z-0 hidden md:block" />
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300">
                01
              </div>
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase">
                Portfolio Review
              </span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300">
                02
              </div>
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase">
                Technical Interview
              </span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300">
                03
              </div>
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase">
                Design Task
              </span>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300">
                04
              </div>
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase">
                Principal Round
              </span>
            </div>

            {/* Step 5 */}
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300">
                05
              </div>
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase">
                Offer & Onboarding
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Life Inside Section (Images Grid) */}
      <section className="py-20 lg:py-24 bg-white text-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 relative">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 uppercase tracking-tight leading-none">
              Life Inside
            </h2>
            <div className="w-12 h-[2px] bg-brand-gold mx-auto mt-4" />
          </div>

          {/* Grid Layout */}
          <div className="space-y-6">
            {/* Row 1: 3 Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                <img
                  src="/assets/service_landscape.png"
                  alt="Team designing model"
                  className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                <img
                  src="/assets/about_image.png"
                  alt="Team member smiling"
                  className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                <img
                  src="/assets/permanence_image.png"
                  alt="Architectural detailing physical model"
                  className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
                />
              </div>
            </div>

            {/* Row 2: 1 Full-width Wide Image */}
            <div className="relative aspect-[21/9] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
              <img
                src="/assets/hero_background.png"
                alt="Workspace team collaboration"
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 8. Employee Quotes Section */}
      <section className="py-20 lg:py-24 bg-[#fafafa] border-t border-neutral-100 text-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Card 1 */}
            <div className="bg-white p-8 sm:p-10 border border-neutral-200/50 border-l-4 border-l-brand-gold rounded-sm shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <span className="font-serif text-3xl text-brand-gold/60 block leading-none mb-2">“</span>
                <blockquote className="font-serif italic text-base sm:text-lg text-neutral-700 leading-relaxed">
                  At PIEACH, I've had the opportunity to lead major commercial builds in Lagos, shaping the cityscape and collaborating with top-tier consultants. The learning curve is steep but rewarding.
                </blockquote>
              </div>
              <cite className="font-sans font-bold text-xs uppercase tracking-wider text-neutral-900 not-italic">
                Adebisi Adeoye, Project Architect
              </cite>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 sm:p-10 border border-neutral-200/50 border-l-4 border-l-brand-gold rounded-sm shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <span className="font-serif text-3xl text-brand-gold/60 block leading-none mb-2">“</span>
                <blockquote className="font-serif italic text-base sm:text-lg text-neutral-700 leading-relaxed">
                  The focus on biophilic design and passive energy systems has allowed me to push the boundaries of sustainable architecture. Every project feels like a new research endeavor.
                </blockquote>
              </div>
              <cite className="font-sans font-bold text-xs uppercase tracking-wider text-neutral-900 not-italic">
                Kelvin Nduka, Sustainable Design Lead
              </cite>
            </div>

          </div>
        </div>
      </section>

      {/* 9. CTA Section */}
      <CTASection />

    </div>
  );
}
