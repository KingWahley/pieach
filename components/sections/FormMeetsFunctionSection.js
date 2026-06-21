export default function FormMeetsFunctionSection() {
  return (
    <section className="bg-brand-brown text-white py-20 lg:py-24 border-b border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column Tagline */}
          <div className="lg:col-span-4">
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-brand-gold tracking-tight leading-tight uppercase">
              Form Meets<br />
              Function.
            </h2>
          </div>

          {/* Right Column Core Paragraphs */}
          <div className="lg:col-span-8 space-y-6">
            <p className="font-serif text-lg sm:text-2xl lg:text-3xl text-brand-gold leading-relaxed font-light">
              We offer a comprehensive range of architectural, interior, landscape, and project management services designed to bring visionary ideas to life.
            </p>
            <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light max-w-3xl">
              Every project is approached with creativity, technical expertise, and a deep understanding of how people interact with spaces, allowing us to deliver environments that are functional, timeless, and sustainable.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
