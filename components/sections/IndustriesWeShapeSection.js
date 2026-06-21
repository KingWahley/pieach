import Link from "next/link";

const SECTORS = [
  { name: "Residential", image: "/assets/sector_residential.png" },
  { name: "Commercial", image: "/assets/sector_commercial.png" },
  { name: "Hospitality", image: "/assets/sector_hospitality.png" },
  { name: "Civic", image: "/assets/sector_civic.png" },
];

export default function IndustriesWeShapeSection() {
  return (
    <section className="bg-brand-light-gray text-neutral-900 py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12 border-b border-neutral-300/40 pb-6">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-none">
            Industries We Shape
          </h2>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SECTORS.map((sector, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-md group bg-neutral-900"
            >
              {/* Background Image with zoom on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out transform scale-100 group-hover:scale-105"
                style={{ backgroundImage: `url('${sector.image}')` }}
              />

              {/* Bottom Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

              {/* Centered Sector Name Overlay (Bottom) */}
              <div className="absolute bottom-8 left-0 right-0 z-20 text-center px-4">
                <span className="font-sans font-black text-sm uppercase tracking-[0.25em] text-white group-hover:text-brand-gold transition duration-300">
                  {sector.name}
                </span>
                
                {/* Decorative short line */}
                <div className="w-6 h-[2px] bg-brand-gold mx-auto mt-2.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
              
              {/* Thin Outer Border on Hover */}
              <div className="absolute inset-0 border border-white/5 group-hover:border-brand-gold/30 transition duration-300 pointer-events-none z-20" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
