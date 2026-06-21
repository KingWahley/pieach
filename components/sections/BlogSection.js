import Link from "next/link";
import { BLOG_POSTS } from "@/lib/constants";

export default function BlogSection() {
  return (
    <section className="bg-white text-neutral-900 py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-[#B5A898] block mb-4">
              STUDIO JOURNAL
            </span>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-neutral-950 uppercase">
              Architectural <br />
              <span className="text-[#C0B4A5]">Perspectives</span>
            </h2>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-[#C0B4A5] hover:bg-[#B3A697] px-8 py-4.5 text-xs font-bold uppercase tracking-widest text-white transition duration-300 rounded-none cursor-pointer"
            >
              VIEW ALL ARTICLES
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col h-full bg-white transition-all duration-300 group"
            >
              {/* Post Cover Image */}
              <Link href={`/blog/${post.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-neutral-100 rounded-none">
                <div
                  className="absolute inset-0 bg-cover bg-center zoom-effect"
                  style={{ backgroundImage: `url('${post.image}')` }}
                />
              </Link>

              {/* Post Details (No horizontal padding to align flush with image edges) */}
              <div className="flex flex-col flex-grow pt-6 justify-between">
                <div>
                  {/* Category / Date line exactly like mockup */}
                  <span className="block font-sans text-[10px] font-bold tracking-[0.18em] text-[#B5A898] uppercase mb-3">
                    {post.date} / {post.category}
                  </span>

                  <h3 className="font-sans font-bold text-lg sm:text-xl text-neutral-950 leading-snug mb-3 group-hover:text-brand-gold transition duration-200">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="font-sans text-neutral-500 text-sm leading-relaxed mb-6 font-light">
                    {post.summary}
                  </p>
                </div>

                {/* Read Full Link */}
                <div className="pt-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block font-sans font-bold text-xs uppercase tracking-widest text-neutral-950 underline underline-offset-6 decoration-neutral-950/30 hover:decoration-brand-gold hover:text-brand-gold transition duration-200"
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
  );
}
