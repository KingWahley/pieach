export default function EcologicalSection() {
  return (
    <section className="bg-white text-neutral-900 py-20 lg:py-24 overflow-hidden border-b border-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Bordered card container */}
        <div className="border border-neutral-200/80 p-8 sm:p-12 lg:p-16 rounded-sm bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Image */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 group shadow-sm">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out transform scale-100 group-hover:scale-105"
                style={{ backgroundImage: "url('/assets/service_landscape.png')" }}
              />
              <div className="absolute inset-0 bg-black/5 opacity-100 pointer-events-none" />
            </div>

            {/* Right Column Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-2 block">
                Sustainability
              </span>
              <h2 className="font-sans font-bold text-2xl sm:text-3xl text-neutral-950 tracking-tight">
                Ecological Responsibility
              </h2>
              <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed font-light mb-8">
                We integrate passive solar design, natural ventilation, greywater systems, and locally sourced low-carbon materials in our specifications to reduce carbon footprint.
              </p>

              {/* Stats Boxes */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4">
                <div className="bg-brand-light-gray p-6 rounded-sm text-center border border-neutral-100">
                  <span className="font-sans font-black text-2xl sm:text-3xl text-neutral-950 leading-none tracking-tight block">
                    80%
                  </span>
                  <span className="font-sans font-bold text-[9px] tracking-widest text-neutral-500 uppercase block mt-2">
                    Passive Cooling
                  </span>
                </div>

                <div className="bg-brand-light-gray p-6 rounded-sm text-center border border-neutral-100">
                  <span className="font-sans font-black text-2xl sm:text-3xl text-neutral-950 leading-none tracking-tight block">
                    45%
                  </span>
                  <span className="font-sans font-bold text-[9px] tracking-widest text-neutral-500 uppercase block mt-2">
                    Water Recycling
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
