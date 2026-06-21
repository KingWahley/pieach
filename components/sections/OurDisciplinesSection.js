const DISCIPLINES = [
  {
    num: "01",
    title: "Our Goal",
    description: "Pieach strives for adaptable, purposeful designs that meet client needs and complement their surroundings, blending tradition with timelessness.",
  },
  {
    num: "02",
    title: "Our Vision",
    description: "Empowering a Sustainable, Aesthetically Enriched Future: Crafting architectural excellence that harmonizes culture, sustainability, and enduring beauty.",
  },
  {
    num: "03",
    title: "Our Mission",
    description: "Our practice is based on the belief that the built environment must reflect and celebrate the aesthetic and cultural values of society. We fuse dynamism in cultural contexts that are forever continuous; prioritizing order out of the often-chaotic present. We are painstaking in embracing sustainable methodologies in our work as a commitment to the environment and our collective future.",
  },
];

export default function OurDisciplinesSection() {
  return (
    <section className="bg-white text-neutral-900 pt-20 pb-28 md:pb-44 lg:pt-24 lg:pb-52 overflow-visible border-b border-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title with full width underline */}
        <div className="pb-6 border-b border-[#E5DCD3] mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-brown font-normal">
            Our Disciplines
          </h2>
        </div>

        {/* Cards Grid with Staggered Offsets and Collapsed Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:items-start">
          {DISCIPLINES.map((discipline, index) => (
            <div 
              key={index}
              className={`border border-brand-brown p-8 lg:p-10 bg-white rounded-none transition-all duration-300 flex flex-col ${
                index === 0
                  ? ""
                  : index === 1
                  ? "-mt-px md:mt-24 md:-ml-px"
                  : "-mt-px md:mt-0 md:-ml-px"
              }`}
            >
              <span className="font-serif text-xs text-brand-brown/60 block mb-6 tracking-wide">
                {discipline.num}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-brand-brown mb-4 font-semibold leading-tight">
                {discipline.title}
              </h3>
              <p className="font-serif text-brand-brown/85 text-[15px] sm:text-base leading-relaxed font-light">
                {discipline.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

