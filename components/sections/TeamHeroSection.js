export default function TeamHeroSection() {
  return (
    <section className="relative h-[75vh] min-h-[500px] flex items-center justify-start overflow-hidden bg-neutral-900">
      
      {/* Background Image with grayscale filter to match the B&W design */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-105 grayscale contrast-125 brightness-50"
        style={{ 
          backgroundImage: "url('/assets/hero_background.png')",
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/60" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl">
          {/* Main Title */}
          <h1 className="font-sans font-black tracking-tight text-white leading-[0.95] uppercase mb-6 text-4xl sm:text-6xl md:text-7xl lg:text-[80px] flex flex-col">
            <span>The Minds Behind</span>
            <span className="text-brand-gold">The Vision</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-neutral-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-light">
            A multi-disciplinary team of architects, designers, planners, and project specialists shaping meaningful spaces across Africa.
          </p>
        </div>
      </div>

    </section>
  );
}
