const STEPS = [
  {
    num: "01",
    title: "Discovery",
    description: "Researching context, climate, and client vision.",
  },
  {
    num: "02",
    title: "Concept",
    description: "Initial sketches and spatial modeling.",
  },
  {
    num: "03",
    title: "Planning",
    description: "Rigorous structural and technical alignment.",
  },
  {
    num: "04",
    title: "Technical",
    description: "Detailed documentation and engineering.",
  },
  {
    num: "05",
    title: "Construction",
    description: "On-site management and artisanal precision.",
  },
  {
    num: "06",
    title: "Delivery",
    description: "Final walkthrough and space activation.",
  },
];

export default function BlueprintJourneySection() {
  return (
    <section className="bg-brand-light-gray text-neutral-900 py-20 lg:py-24 overflow-hidden border-b border-neutral-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-none">
            The Blueprint Journey
          </h2>
        </div>

        {/* Timeline Desktop (Hidden on mobile) */}
        <div className="hidden lg:block relative w-full pt-10 pb-8">
          
          {/* Horizontal Connecting Line */}
          <div className="absolute top-[68px] left-1/12 right-1/12 h-[1px] bg-neutral-300 z-0" />
          
          {/* Steps Row */}
          <div className="grid grid-cols-6 gap-6 relative z-10">
            {STEPS.map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                
                {/* Number Box */}
                <div className="w-14 h-14 bg-white border border-neutral-300 rounded-sm flex items-center justify-center font-sans font-bold text-xs text-brand-gold shadow-sm hover:border-brand-gold hover:shadow-md transition duration-300 mb-6">
                  {step.num}
                </div>
                
                {/* Title */}
                <h3 className="font-serif text-lg font-bold text-neutral-950 mb-3">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="font-sans text-neutral-500 text-[11px] leading-relaxed max-w-[150px] font-light">
                  {step.description}
                </p>

              </div>
            ))}
          </div>

        </div>

        {/* Timeline Mobile & Tablet (Hidden on desktop) */}
        <div className="block lg:hidden relative pl-8 space-y-12">
          
          {/* Vertical Connecting Line */}
          <div className="absolute top-4 bottom-4 left-[27px] w-[1px] bg-neutral-300 z-0" />
          
          {STEPS.map((step) => (
            <div key={step.num} className="relative flex items-start space-x-6 z-10">
              
              {/* Number Box */}
              <div className="w-14 h-14 bg-white border border-neutral-300 rounded-sm flex items-center justify-center font-sans font-bold text-xs text-brand-gold shadow-sm flex-shrink-0">
                {step.num}
              </div>
              
              {/* Text details */}
              <div className="pt-2">
                <h3 className="font-serif text-lg font-bold text-neutral-950 mb-1">
                  {step.title}
                </h3>
                <p className="font-sans text-neutral-500 text-xs sm:text-sm leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
