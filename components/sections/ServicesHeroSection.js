import Link from "next/link";

export default function ServicesHeroSection() {
  return (
    <section className="relative h-[60vh] min-h-[450px] flex items-center justify-start overflow-hidden bg-neutral-900">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-105"
        style={{ 
          backgroundImage: "url('/assets/services_hero_bg.png')",
        }}
      />
      
      {/* Gradients Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/70 via-transparent to-black/35" />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-3xl">
          {/* Main Title */}
          <h1 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[1.05] text-white mb-6">
            Designing Spaces <br className="hidden sm:inline" />
            With Purpose
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-neutral-300 text-sm sm:text-base max-w-xl mb-8 leading-relaxed font-light">
            We offer comprehensive services in masterplanning, architecture, interior design, and project management.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-brand-gold text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm shadow-md hover:bg-brand-gold-hover hover:shadow-lg transition duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Call
            </Link>
            <a
              href="#services"
              className="inline-flex items-center justify-center border border-white text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm hover:bg-white hover:text-brand-navy transition duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Our Work
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
