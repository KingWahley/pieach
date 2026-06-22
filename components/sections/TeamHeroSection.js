export default function TeamHeroSection() {
  return (
    <section className="relative h-[60vh] min-h-[450px] flex items-center justify-start overflow-hidden bg-neutral-900">
      
      {/* Background Image with grayscale filter to match the B&W design */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-105 grayscale contrast-125 brightness-50"
        style={{ 
          backgroundImage: "url('/assets/hero_background.png')",
        }}
      />
      
      {/* Gradients Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/70 via-transparent to-black/35" />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto max-w-[1600px] w-full px-5 sm:px-8 lg:px-12 pt-24">
        <div className="max-w-4xl">
          {/* Main Title */}
          <h1 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[1.05] text-white mb-6 flex flex-col">
            <span>The Minds Behind</span>
            <span className="text-brand-gold">The Vision</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-neutral-300 text-sm sm:text-base max-w-xl leading-relaxed font-light">
            A multi-disciplinary team of architects, designers, planners, and project specialists shaping meaningful spaces across Africa.
          </p>
        </div>
      </div>

    </section>
  );
}
