import { PARTNERS } from "@/lib/constants";

// High-fidelity custom SVG/stylized logos for each brand
function PartnerLogo({ type }) {
  const baseLogoClass = "h-8 md:h-10 w-auto opacity-50 hover:opacity-100 transition-opacity duration-300 text-white fill-current object-contain";

  switch (type) {
    case "airtel":
      return (
        <div className="flex items-center space-x-1.5 opacity-55 hover:opacity-100 transition duration-300">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          <span className="font-sans font-black text-xl tracking-tighter text-white">airtel</span>
        </div>
      );
    case "cadwell":
      return (
        <div className="flex items-center opacity-55 hover:opacity-100 transition duration-300">
          <span className="font-serif font-medium text-lg md:text-xl tracking-[0.25em] text-white">
            CADWELL
          </span>
        </div>
      );
    case "chrome":
      return (
        <div className="border border-white/20 px-3.5 py-1.5 rounded-sm opacity-55 hover:opacity-100 transition duration-300">
          <span className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-white">
            CHROME GROUP
          </span>
        </div>
      );
    case "transcorp":
      return (
        <div className="flex items-center space-x-1 opacity-55 hover:opacity-100 transition duration-300">
          <span className="font-sans font-light text-sm md:text-base tracking-widest text-white uppercase">
            Transcorp
          </span>
          <span className="font-sans font-bold text-sm md:text-base text-brand-gold uppercase tracking-wider">
            Hotels
          </span>
        </div>
      );
    case "uba":
      return (
        <div className="flex items-center opacity-55 hover:opacity-100 transition duration-300 transform -skew-x-12">
          <span className="font-sans font-extrabold text-2xl tracking-tighter text-white">
            UBA
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold ml-1" />
        </div>
      );
    default:
      return null;
  }
}

export default function ClientsSection() {
  return (
    <section className="bg-brand-navy text-white pb-20 lg:pb-28 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="mb-10 text-left">
          <span className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-brand-gold block mb-3">
            Clients & Partners
          </span>
          <h2 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Trusted Worldwide
          </h2>
        </div>

        {/* Logos Container */}
        <div className="w-full border-t border-white/10 pt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-start md:justify-items-center">
            {PARTNERS.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center">
                <PartnerLogo type={partner.logoType} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
