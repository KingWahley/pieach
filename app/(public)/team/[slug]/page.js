// app/(public)/team/[slug]/page.js
import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import OurTeamSection from "@/components/sections/OurTeamSection";
import TeamValuesSection from "@/components/sections/TeamValuesSection";
import CTASection from "@/components/sections/CTASection";

export const revalidate = 60; // Revalidate every minute

export async function generateStaticParams() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('team')
    .select('slug');
  
  return (data || []).map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const supabase = createServerClient();
  const { data: member } = await supabase
    .from('team')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  
  if (!member) {
    return {
      title: "Team Member Not Found",
    };
  }

  return {
    title: `${member.name} | ${member.role} | PIEACH Limited`,
    description: `${member.name} is the ${member.role} at PIEACH Limited, leading premium architectural designs in West Africa.`,
  };
}

const DETAIL_VALUES = [
  {
    title: "Creativity",
    description: "Relentless dedication to find unique solutions for every site and brief.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
    )
  },
  {
    title: "Sustainability",
    description: "Design that honors the planet and ensures the longevity of the built form.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.25 5.25l13.5 13.5" />
      </svg>
    )
  },
  {
    title: "Collaboration",
    description: "The shared intelligence of our multi-disciplinary team defines our success.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493" />
      </svg>
    )
  },
  {
    title: "Innovation",
    description: "Leveraging technology to push the boundaries of what is possible in construction.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a3 3 0 10-3-3H12" />
      </svg>
    )
  },
  {
    title: "Integrity",
    description: "Ethical practice and honest communication are the pillars of our relationships.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
      </svg>
    )
  },
  {
    title: "Excellence",
    description: "A relentless pursuit of quality in every detail, from concept to handover.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.173-.435.792-.435.965 0l1.831 4.597" />
      </svg>
    )
  }
];

export default async function TeamMemberDetailsPage({ params }) {
  const { slug } = await params;
  const supabase = createServerClient();
  
  // Fetch specific team member
  const { data: member } = await supabase
    .from('team')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  const memberStatus = (member?.gender || 'active').toLowerCase();
  if (!member || memberStatus === 'archived' || memberStatus === 'inactive') {
    notFound();
  }

  // Fetch all team members for the footer listing
  const { data: allMembers } = await supabase
    .from('team')
    .select('*')
    .order('order_index');

  const formattedMembers = (allMembers || [])
    .filter(m => {
      const status = (m.gender || 'active').toLowerCase();
      return status !== 'archived' && status !== 'inactive';
    })
    .map(m => ({
      ...m,
      bio: m.bio || [],
      qualifications: m.qualifications || []
    }));

  return (
    <div className="bg-white text-neutral-900 pt-32">
      
      {/* Detail Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
        
        {/* Back Link */}
        <div className="mb-10">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-brand-gold transition duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Team
          </Link>
        </div>

        {/* Member Header */}
        <header className="border-b border-neutral-100 pb-6 mb-12">
          <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-3 block">
            {member.role}
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-none uppercase">
            {member.name}
          </h1>
        </header>

        {/* Profile Card & Bio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left: Silhouette Profile */}
          <div className="lg:col-span-5 relative aspect-[3/4] rounded-sm overflow-hidden bg-neutral-100 shadow-lg border border-neutral-200/50">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          </div>

          {/* Right: Bio details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Gold Divider */}
            <span className="text-brand-gold font-serif text-2xl tracking-[0.3em] block">•••</span>
            
            {/* Paragraphs */}
            {(member.bio || []).map((paragraph, idx) => (
              <p 
                key={idx} 
                className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed font-light"
              >
                {paragraph}
              </p>
            ))}
          </div>

        </div>

        {/* Qualifications block */}
        <div className="border-t border-neutral-200/80 pt-10 pb-4">
          <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-8 block">
            Qualifications
          </span>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(member.qualifications || []).map((q, idx) => (
              <div 
                key={idx}
                className="border-l-2 border-brand-gold pl-4 py-1"
              >
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-neutral-900 leading-snug">
                  {q.title}
                </h4>
                <span className="font-sans text-[11px] text-neutral-500 font-light block mt-1">
                  {q.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Grid of Other Members (exludes active member) */}
      <OurTeamSection excludeSlug={member.slug} title="Other Team Members" members={formattedMembers} />

      {/* Dynamic values block */}
      <TeamValuesSection values={DETAIL_VALUES} title="Core Values" />

      {/* CTASection */}
      <CTASection />

    </div>
  );
}
