import Link from "next/link";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Blog | PIEACH Limited",
  description: "Read our articles on minimalist architecture, sustainable design, interior space psychology, and vertical urban developments.",
};

import { createServerClient } from "@/lib/supabase/server";

export const revalidate = 60; // Revalidate every minute

export default async function BlogPage() {
  const supabase = createServerClient();
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published');

  const BLOG_ARTICLES = (blogPosts || []).map(post => ({
    ...post,
    readTime: post.read_time || '8 MIN READ'
  }));

  return (
    <div className="bg-white text-neutral-900 pt-20">
      
      {/* 1. Category Tags Bar */}
      <div className="w-full bg-[#F9F7F5] border-b border-[#E5DCD3] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <style dangerouslySetInnerHTML={{__html: `
            .tags-container::-webkit-scrollbar {
              display: none;
            }
          `}} />
          <div 
            className="tags-container flex flex-nowrap items-center justify-start md:justify-center overflow-x-auto whitespace-nowrap gap-x-8 py-1"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-brand-brown/70 hover:text-brand-brown transition duration-200 cursor-pointer shrink-0">
              PRACTICE
            </span>
            <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-brand-brown/70 hover:text-brand-brown transition duration-200 cursor-pointer shrink-0">
              SUSTAINABILITY
            </span>
            <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-brand-brown/70 hover:text-brand-brown transition duration-200 cursor-pointer shrink-0">
              INTERIOR DESIGN
            </span>
            <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-brand-brown/70 hover:text-brand-brown transition duration-200 cursor-pointer shrink-0">
              URBAN PLANNING
            </span>
            <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-brand-brown/70 hover:text-brand-brown transition duration-200 cursor-pointer shrink-0">
              DESIGN THEORY
            </span>
            <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-brand-brown/70 hover:text-brand-brown transition duration-200 cursor-pointer shrink-0">
              PROJECT RUNNING
            </span>
          </div>
        </div>
      </div>

      {/* 2. Featured Post Hero Banner */}
      <section className="bg-[#F9F7F5] border-b border-[#E5DCD3] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Wood Slat Image & Title */}
            <div className="lg:col-span-7 space-y-6">
              <Link 
                href="/blog/future-of-minimalist-living-sustainable-architecture-2026"
                className="relative block aspect-[21/10] w-full overflow-hidden bg-neutral-100 border border-brand-brown/10"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center zoom-effect"
                  style={{ backgroundImage: "url('/assets/service_mgmt.png')" }}
                />
              </Link>
              <div className="space-y-2">
                <span className="font-sans font-bold text-[10px] tracking-[0.25em] text-brand-gold uppercase block">
                  PRACTICE / OCTOBER 12, 2026
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-brown font-normal uppercase tracking-wide">
                  <Link href="/blog/future-of-minimalist-living-sustainable-architecture-2026" className="hover:text-brand-gold transition duration-200">
                    THE FUTURE OF MINIMALIST DESIGN
                  </Link>
                </h2>
              </div>
            </div>

            {/* Right Column: Statement Text (Separated by Vertical Line) */}
            <div className="lg:col-span-5 lg:border-l lg:border-[#E5DCD3] lg:pl-16 flex flex-col justify-center py-4">
              <p className="font-serif text-brand-brown/85 text-base sm:text-lg leading-relaxed font-light">
                Architectural perspectives, insights, and dialogues from the visionaries at Pieach.
              </p>
              <p className="font-serif text-brand-brown/70 text-[15px] sm:text-base leading-relaxed font-light mt-4">
                This digital journal is our space for architectural discourse—a collective archive of the stories behind the structures. We compile lessons learned, research, and reflections on our practice.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Studio Journal Section */}
      <section className="py-24 bg-white text-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <span className="font-sans font-bold text-[10px] sm:text-xs tracking-[0.25em] text-[#B5A898] uppercase block mb-3">
                STUDIO JOURNAL
              </span>
              <h2 className="font-sans font-black text-4xl sm:text-5xl tracking-tight leading-none text-neutral-950">
                Architectural<br />
                <span className="font-serif italic font-normal text-[#C0B4A5] tracking-normal">
                  Perspectives
                </span>
              </h2>
            </div>
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center bg-[#C0B4A5] hover:bg-brand-brown hover:text-white text-white text-[10px] font-bold uppercase tracking-widest px-8 py-4 transition duration-300 rounded-none shadow-sm"
              >
                VIEW ALL ARTICLES
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {BLOG_ARTICLES.map((article, index) => (
              <article key={index} className="flex flex-col space-y-6">
                
                {/* Image Container (No rounded corners, zoom effect) */}
                <Link 
                  href={`/blog/${article.slug}`} 
                  className="relative aspect-[3/2] overflow-hidden bg-neutral-100 block"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center zoom-effect"
                    style={{ backgroundImage: `url('${article.image}')` }}
                  />
                </Link>

                {/* Details */}
                <div className="space-y-4">
                  <span className="font-sans font-bold text-[10px] tracking-[0.2em] text-[#B5A898] uppercase block">
                    {article.date} / {article.category}
                  </span>
                  
                  <h3 className="font-serif text-xl sm:text-2xl text-brand-brown font-semibold leading-tight hover:text-brand-gold transition duration-200">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  
                  <p className="font-serif text-neutral-600 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line">
                    {article.summary}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-block font-sans font-bold text-[10px] uppercase tracking-widest text-brand-brown hover:text-brand-gold pb-1 border-b border-brand-brown hover:border-brand-gold transition duration-200"
                    >
                      READ FULL ARTICLE
                    </Link>
                  </div>
                </div>

              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Featured Categories (Two large side-by-side cards) */}
      <section className="pb-24 bg-white text-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Sustainable Architecture */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-none group flex items-center justify-center text-center p-8 bg-neutral-900">
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center opacity-40 scale-102 transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('/assets/blog_house.png')" }}
              />
              <div className="absolute inset-0 z-10 bg-black/30" />
              
              <div className="relative z-20 max-w-md space-y-4">
                <h3 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                  Sustainable Architecture
                </h3>
                <p className="font-sans text-neutral-300 text-xs sm:text-sm font-light">
                  Low impact design for modern living.
                </p>
                <div className="pt-2">
                  <Link 
                    href="/blog" 
                    className="inline-block font-sans font-bold text-[10px] uppercase tracking-widest text-[#B5A898] hover:text-white pb-1 border-b border-[#B5A898] hover:border-white transition duration-200"
                  >
                    READ ARTICLES &nbsp;&rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Contemporary African Design */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-none group flex items-center justify-center text-center p-8 bg-neutral-900">
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center opacity-40 scale-102 transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('/assets/blog_interior.png')" }}
              />
              <div className="absolute inset-0 z-10 bg-black/30" />
              
              <div className="relative z-20 max-w-md space-y-4">
                <h3 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                  Contemporary African Design
                </h3>
                <p className="font-sans text-neutral-300 text-xs sm:text-sm font-light">
                  Redefining vernacular architecture for modern cities.
                </p>
                <div className="pt-2">
                  <Link 
                    href="/blog" 
                    className="inline-block font-sans font-bold text-[10px] uppercase tracking-widest text-[#B5A898] hover:text-white pb-1 border-b border-[#B5A898] hover:border-white transition duration-200"
                  >
                    READ ARTICLES &nbsp;&rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Journal Statement / Quote Section */}
      <section className="bg-[#F9F7F5] py-24 text-center border-t border-[#E5DCD3] border-b border-neutral-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <span className="font-sans font-bold text-[10px] sm:text-xs tracking-[0.25em] text-[#B5A898] uppercase block mb-4">
            THE JOURNAL
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-brown font-normal leading-snug max-w-3xl">
            The Pieach Journal is our space for architectural discourse a collective archive of the stories behind the structures.
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold my-8" />
          
        </div>
      </section>

      {/* 5. Bottom CTA Section */}
      <CTASection />

    </div>
  );
}
