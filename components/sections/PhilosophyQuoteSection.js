export default function PhilosophyQuoteSection() {
  return (
    <section className="bg-brand-brown text-white py-24 lg:py-32 overflow-hidden border-t border-b border-white/5 relative">
      
      {/* Decorative subtle visual elements */}
      <div className="absolute top-1/2 left-10 transform -translate-y-1/2 font-serif text-8xl text-white/5 pointer-events-none select-none hidden lg:block">
        “
      </div>
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 font-serif text-8xl text-white/5 pointer-events-none select-none hidden lg:block">
        ”
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Subtitle */}
        <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-6 block">
          Philosophy
        </span>

        {/* Large Quote */}
        <blockquote className="font-serif italic text-2xl sm:text-4xl lg:text-4xl tracking-tight leading-relaxed mb-8 max-w-4xl mx-auto text-neutral-100">
          "Architecture should create harmony between people, space, and the environment."
        </blockquote>

        {/* Divider line */}
        <div className="w-10 h-[1px] bg-brand-gold mx-auto mb-6" />

        {/* Author */}
        <cite className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-white not-italic">
          Olumide George, Principal
        </cite>

      </div>
    </section>
  );
}
