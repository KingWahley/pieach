import Link from "next/link";
import { TEAM_MEMBERS } from "@/lib/constants";

// Stylized vector silhouette avatar for architects (instead of flat placeholders)
function ProfileAvatar({ gender }) {
  return (
    <svg 
      className="w-full h-full text-neutral-500/35 transition-transform duration-500 ease-out group-hover:scale-105" 
      viewBox="0 0 100 120" 
      fill="none"
    >
      {/* Background radial soft gradient */}
      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#c5a880" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      <rect width="100" height="120" fill="url(#grad)" />

      {/* Head */}
      <circle cx="50" cy="42" r="16" className="fill-neutral-600/25 stroke-neutral-600/10" strokeWidth="0.5" />
      
      {/* Hair details */}
      {gender === "female" ? (
        <path 
          d="M32 40 C32 20, 68 20, 68 40 C68 55, 62 60, 62 62 C58 50, 42 50, 38 62 C38 60, 32 55, 32 40 Z" 
          className="fill-neutral-700/35" 
        />
      ) : (
        <path 
          d="M34 38 C34 26, 66 26, 66 38 C66 32, 34 32, 34 38 Z" 
          className="fill-neutral-800/30" 
        />
      )}

      {/* Shoulders / Torso */}
      <path 
        d="M20 105 C20 78, 30 72, 50 72 C70 72, 80 78, 80 105 Z" 
        className="fill-neutral-600/30 stroke-neutral-600/10" 
        strokeWidth="0.5" 
      />

      {/* Collar details */}
      <path d="M40 72 L50 82 L60 72" className="stroke-neutral-400" strokeWidth="1" />
    </svg>
  );
}

export default function OurTeamSection({ excludeSlug = "", title = "Our Team" }) {
  const filteredMembers = excludeSlug 
    ? TEAM_MEMBERS.filter((m) => m.slug !== excludeSlug)
    : TEAM_MEMBERS;

  return (
    <section className="bg-white text-neutral-900 py-20 lg:py-24 overflow-hidden border-b border-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-950 tracking-tight uppercase mb-4 border-b border-neutral-100 pb-4 inline-block">
            {title}
          </h2>
          {title === "Our Team" && (
            <p className="font-sans text-neutral-500 text-sm sm:text-base leading-relaxed font-light mt-4">
              At Pieach, we believe that design is a collaborative effort. By assembling a team with diverse perspectives, we ensure that every design is meticulous, functional, and visually impactful.
            </p>
          )}
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMembers.map((member) => (
            <Link
              key={member.slug}
              href={`/team/${member.slug}`}
              className="group flex flex-col rounded-sm overflow-hidden shadow-sm hover:shadow-md border border-neutral-100 bg-[#fafafa] transition duration-300 cursor-pointer"
            >
              {/* Profile Image container */}
              <div className="relative aspect-[3/4] bg-gradient-to-b from-neutral-50 to-neutral-200 overflow-hidden flex items-center justify-center">
                <ProfileAvatar gender={member.gender} />
                
                {/* Thin overlay grid lines for architectural blueprint vibe */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              </div>

              {/* Bottom Sand-Bronze Overlay card */}
              <div className="bg-[#b3a18b] py-5 px-4 text-center border-t border-brand-gold/10 group-hover:bg-[#a2907a] transition duration-300">
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-white">
                  {member.name}
                </h3>
                <span className="font-sans text-[9px] font-medium uppercase tracking-widest text-white/80 block mt-1">
                  {member.role}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
