import { BLOG_POSTS } from "@/lib/constants";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | PIEACH Blog`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white text-neutral-900 pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-brand-gold transition duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="border-b border-neutral-100 pb-8 mb-10">
          <div className="flex items-center space-x-2 text-[10px] font-bold tracking-widest text-brand-gold uppercase mb-4">
            <span>{post.category}</span>
            <span className="text-neutral-300">•</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-neutral-950 leading-tight tracking-tight uppercase mb-6">
            {post.title}
          </h1>
          <div className="flex items-center space-x-3 text-xs text-neutral-400 font-light">
            <span>Published on {post.date}</span>
            <span>•</span>
            <span>By PIEACH Studio</span>
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-md mb-12">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${post.image}')` }}
          />
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-neutral max-w-none font-sans text-neutral-700 text-sm sm:text-base leading-relaxed font-light space-y-6 
            prose-headings:text-neutral-950 prose-headings:font-bold prose-h3:text-lg prose-h3:mt-8
            prose-blockquote:border-l-4 prose-blockquote:border-brand-gold prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-neutral-600 prose-blockquote:font-serif
            prose-ul:list-disc prose-ul:pl-6 prose-li:my-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

      </div>
    </article>
  );
}
