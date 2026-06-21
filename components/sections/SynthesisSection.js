export default function SynthesisSection() {
  return (
    <section id="synthesis" className="bg-white text-neutral-900 py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Column Heading */}
          <div className="lg:col-span-5">
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-4 block">
              About Us
            </span>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-4xl text-neutral-950 tracking-tight leading-tight uppercase">
              The Synthesis of <br />
              Form & Purpose
            </h2>
          </div>

          {/* Right Column Body Text */}
          <div className="lg:col-span-7 space-y-6">
            <p className="font-sans text-neutral-800 text-sm sm:text-base leading-relaxed font-light">
              Established in 1997, <strong>PIEACH Limited</strong> is a multi-disciplinary practice of visionary specialists in architecture, master planning, interior design, and project management. Based in West Africa, our work spans from commercial workspaces and retail developments, custom office workspaces, residential estates, hospitality, and civic projects.
            </p>
            <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              Our design approach is rooted in meticulous research, structural integrity, and close collaboration. We design spaces that inspire, connect, and elevate the human experience. We shape our buildings; thereafter they shape us.
            </p>
          </div>

        </div>

        {/* Stats Row with borders */}
        <div className="border-t border-b border-neutral-200/80 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 justify-items-center">
            
            {/* Stat 1 */}
            <div className="text-center">
              <span className="font-sans font-black text-4xl sm:text-5xl text-neutral-950 leading-none tracking-tight">
                100+
              </span>
              <span className="font-sans font-bold text-[10px] tracking-widest text-brand-gold uppercase block mt-3">
                Completed Projects
              </span>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <span className="font-sans font-black text-4xl sm:text-5xl text-neutral-950 leading-none tracking-tight">
                20+
              </span>
              <span className="font-sans font-bold text-[10px] tracking-widest text-brand-gold uppercase block mt-3">
                Awards Won
              </span>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <span className="font-sans font-black text-4xl sm:text-5xl text-neutral-950 leading-none tracking-tight">
                250+
              </span>
              <span className="font-sans font-bold text-[10px] tracking-widest text-brand-gold uppercase block mt-3">
                Happy Clients
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
