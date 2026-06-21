import Link from "next/link";

export default function Logo({ className = "w-10 h-10", dark = false }) {
  const borderColor = dark ? "border-white/20" : "border-brand-gold";
  const textColor = dark ? "text-white" : "text-brand-gold";

  return (
    <Link href="/" className="flex items-center gap-3 group focus:outline-none">
      <div
        className={`flex items-center justify-center border-2 ${borderColor} rounded-sm p-1 transition-all duration-300 group-hover:border-white ${className}`}
      >
        <span className={`font-serif font-bold text-lg tracking-wider ${textColor} transition-all duration-300 group-hover:text-white`}>
          PI
        </span>
      </div>
      <div className="flex flex-col justify-center leading-none">
        <span className={`font-sans font-bold text-sm tracking-widest ${dark ? 'text-white' : 'text-neutral-900'} transition-all duration-300 group-hover:text-brand-gold`}>
          PIEACH
        </span>
        <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
          STUDIO
        </span>
      </div>
    </Link>
  );
}
