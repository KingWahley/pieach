export default function TeamQuoteSection() {
  return (
    <section className="bg-brand-gold text-white py-24 lg:py-28 overflow-hidden relative">
      
      {/* Decorative large quotation marks */}
      <div className="absolute top-1/2 left-10 transform -translate-y-1/2 font-serif text-8xl text-white/10 pointer-events-none select-none hidden lg:block">
        “
      </div>
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 font-serif text-8xl text-white/10 pointer-events-none select-none hidden lg:block">
        ”
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Quote symbol */}
        <span className="font-serif text-4xl block text-white/50 mb-4 leading-none">”</span>

        {/* Large Quote */}
        <blockquote className="font-serif italic text-2xl sm:text-4xl lg:text-4xl tracking-tight leading-relaxed mb-8 max-w-4xl mx-auto text-white">
          "Architecture should create a meaningful dialogue between people, space, and the environment."
        </blockquote>

        {/* Divider */}
        <div className="w-10 h-[1px] bg-white/40 mx-auto mb-6" />

        {/* Author */}
        <cite className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-brand-brown not-italic">
          Olumide George, Founder
        </cite>

      </div>
    </section>
  );
}
