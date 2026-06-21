import Link from "next/link";

export default function AboutHeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[550px] flex items-center justify-start overflow-hidden bg-neutral-900">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-105"
        style={{ 
          backgroundImage: "url('/assets/about_image.png')",
        }}
      />
      
      {/* Gradients Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/70 via-transparent to-black/35" />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl">
          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-tight mb-6">
            Designing Timeless <br className="hidden sm:inline" />
            Spaces Since 1997
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl mb-10 leading-relaxed font-light">
            PIEACH Limited is a multi-disciplinary practice of visionaries specializing in architecture, master planning, interior design, and project management.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-brand-gold text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-sm shadow-md hover:bg-brand-gold-hover hover:shadow-lg transition duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Call
            </Link>
            <a
              href="#synthesis"
              className="inline-flex items-center justify-center border border-white text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-white hover:text-brand-navy transition duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Our Work
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
