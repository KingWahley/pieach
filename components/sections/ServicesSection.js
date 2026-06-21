import Link from "next/link";
import { SERVICES } from "@/lib/constants";

// Helper function to render correct SVG icon based on type
function ServiceIcon({ name }) {
  const baseClass = "w-10 h-10 text-brand-gold";

  switch (name) {
    case "architecture":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18M5 20v-4h14v4M7 16v-5h10v5M10 11V7h4v4" />
        </svg>
      );
    case "interior":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="1.2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16M12 12h8" />
        </svg>
      );
    case "landscape":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" />
        </svg>
      );
    case "project-management":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5L4 17h16L12 5zm0 0v12M4 17h16" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ServicesSection() {
  return (
    <section className="bg-brand-brown text-white py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-16 gap-8">
          <div>
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-[#B5A898] block mb-4">
              WHAT WE OFFER
            </span>
            <h2 className="font-sans font-normal text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none text-white">
              Our Services
            </h2>
          </div>
          <div className="flex-shrink-0 pt-2">
            <Link
              href="/services"
              className="inline-flex items-center justify-center border border-[#c5a880]/60 hover:bg-[#c5a880] hover:text-[#2A1B18] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition duration-300 rounded-none cursor-pointer"
            >
              ALL SERVICES
            </Link>
          </div>
        </div>

        {/* Grid Divider Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-white/10 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[360px] bg-transparent"
            >
              {/* ID and Icon container */}
              <div className="space-y-6">
                <span className="block font-sans font-semibold text-xs text-[#c5a880]">
                  {service.id}
                </span>
                <div className="text-brand-gold">
                  <ServiceIcon name={service.iconName} />
                </div>
              </div>

              {/* Title and Description */}
              <div className="mt-12">
                <h3 className="font-sans font-medium text-lg lg:text-xl text-white mb-4">
                  {service.title}
                </h3>
                <p className="font-sans text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
