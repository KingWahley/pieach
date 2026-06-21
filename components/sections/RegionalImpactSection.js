export default function RegionalImpactSection() {
  return (
    <section className="bg-white text-neutral-900 py-20 lg:py-24 overflow-hidden border-b border-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column info */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-neutral-950 mb-6 tracking-tight">
              Regional Impact
            </h2>
            <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-md">
              Based in Lagos, Nigeria, our influence extends across West Africa. We design projects that respect regional architecture, climate, and community dynamics.
            </p>

            {/* Locations list */}
            <div className="space-y-4 max-w-xs">
              <div className="flex items-center space-x-3.5 pb-3.5 border-b border-neutral-100">
                <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0z" />
                </svg>
                <span className="font-sans font-semibold text-sm text-neutral-800">Lagos, Nigeria</span>
              </div>
              
              <div className="flex items-center space-x-3.5">
                <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0z" />
                </svg>
                <span className="font-sans font-semibold text-sm text-neutral-800">West Africa Region</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural wireframe map of Africa */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-square rounded-sm bg-[#1c110f] p-8 flex items-center justify-center shadow-2xl border border-white/5 group overflow-hidden">
              
              {/* Grid Background Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Minimalist Vector Polygon Map of Africa */}
              <svg 
                className="w-full h-full text-neutral-800 max-w-[320px] z-10 transition-transform duration-700 ease-out group-hover:scale-[1.02]" 
                viewBox="0 0 400 400" 
                fill="none"
              >
                {/* Polygonal Africa path */}
                <path
                  d="M140 70 L 190 60 L 250 80 L 290 70 L 320 120 L 310 160 L 350 190 L 330 230 L 320 280 L 305 310 L 285 350 L 265 375 L 250 380 L 245 360 L 242 320 L 225 300 L 205 310 L 190 270 L 195 240 L 175 220 L 155 210 L 125 215 L 105 180 L 80 150 L 95 120 L 100 95 Z"
                  className="fill-[#2a1b18]/45 stroke-neutral-700/50"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                
                {/* Secondary mesh coordinates */}
                <path
                  d="M140 70 L 195 240 M 190 60 L 175 220 M 250 80 L 225 300 M 290 70 L 242 320 M 320 120 L 305 310 M 310 160 L 285 350"
                  className="stroke-neutral-800/25"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />

                {/* Pulsing Target Dot on Nigeria/Lagos (West Africa coordinates around x=155, y=210) */}
                <g className="cursor-pointer">
                  {/* Pulse wave 1 */}
                  <circle cx="155" cy="210" r="14" className="fill-brand-gold/10 stroke-brand-gold/20 animate-ping" style={{ animationDuration: '3s' }} />
                  {/* Pulse wave 2 */}
                  <circle cx="155" cy="210" r="8" className="fill-brand-gold/25 stroke-brand-gold/30 animate-pulse" />
                  {/* Core dot */}
                  <circle cx="155" cy="210" r="4.5" className="fill-brand-gold stroke-white" strokeWidth="1" />
                </g>
              </svg>

              {/* Tag overlay */}
              <div className="absolute bottom-4 right-4 z-20 bg-brand-gold/10 border border-brand-gold/20 px-3 py-1 rounded-sm backdrop-blur-sm">
                <span className="font-sans font-bold text-[9px] uppercase tracking-widest text-brand-gold">
                  Lagos HQ • 6°26&apos; N
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
