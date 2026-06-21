import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-28 lg:py-36 bg-neutral-900 text-white overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-45 mix-blend-luminosity scale-105"
        style={{ backgroundImage: "url('/assets/cta_background.png')" }}
      />
      
      {/* Rich Dark Vignette Overlay (Dark slate/steel blue) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B1116] via-[#141D26]/90 to-[#1C2731]/80" />

      {/* Content Container */}
      <div className="relative z-20 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center">
          
          {/* Subtitle */}
          <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-6 block">
            LET'S BUILD TOGETHER
          </span>

          {/* Heading with styled serif word */}
          <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight mb-8 max-w-2xl">
            Have a vision? Let's make it{" "}
            <span className="font-serif italic font-normal text-brand-gold tracking-normal">
              real.
            </span>
          </h2>

          {/* Paragraph explanation */}
          <p className="font-sans text-neutral-350 text-sm sm:text-base max-w-md leading-relaxed font-light mb-12">
            Every landmark began as a conversation.
          </p>

          {/* Bordered Button */}
          <div>
            <Link
              href="/book-appointment"
              className="inline-flex items-center justify-center border border-white/30 rounded-none text-xs font-bold uppercase tracking-widest text-white px-8 py-4 transition-all duration-300 hover:bg-white hover:text-neutral-950 hover:shadow-lg transform active:scale-95"
            >
              Book a Consultation
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
