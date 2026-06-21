import Image from "next/image";

export default function ArchitecturePermanenceSection() {
  return (
    <section className="bg-brand-brown text-white py-20 lg:py-24 overflow-hidden border-t border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column stats & text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-4 block">
              Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-6 tracking-tight leading-tight">
              Architecture of <br />
              Permanence
            </h2>
            <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light mb-12 max-w-md">
              Our commitment to excellence yields projects that stand the test of time, blending form and context.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 max-w-md">
              <div>
                <span className="font-sans font-black text-4xl sm:text-5xl text-white leading-none tracking-tight">
                  5
                </span>
                <span className="font-sans font-bold text-[10px] tracking-widest text-brand-gold uppercase block mt-2">
                  Awards Won
                </span>
              </div>
              <div>
                <span className="font-sans font-black text-4xl sm:text-5xl text-white leading-none tracking-tight">
                  250+
                </span>
                <span className="font-sans font-bold text-[10px] tracking-widest text-brand-gold uppercase block mt-2">
                  Projects Delivered
                </span>
              </div>
            </div>
          </div>

          {/* Right Column Image */}
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-900 shadow-2xl group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out transform group-hover:scale-105"
              style={{ backgroundImage: "url('/assets/permanence_image.png')" }}
            />
            {/* Overlay border */}
            <div className="absolute inset-0 border border-white/10 group-hover:border-brand-gold/30 transition duration-300 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
