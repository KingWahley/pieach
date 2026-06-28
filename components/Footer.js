import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";

const getSocialIcon = (platform) => {
  const lower = platform.toLowerCase();
  if (lower === 'instagram') {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (lower === 'linkedin') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }
  if (lower === 'x' || lower === 'twitter') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (lower === 'facebook') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    );
  }
  if (lower === 'youtube') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.163c-.272-1.015-1.07-1.813-2.085-2.086C19.578 3.545 12 3.545 12 3.545s-7.578 0-9.413.532c-1.015.273-1.813 1.07-2.086 2.086C0 7.998 0 12 0 12s0 4.002.501 5.837c.273 1.015 1.07 1.813 2.086 2.086 1.835.532 9.413.532 9.413.532s7.578 0 9.413-.532c1.015-.273 1.813-1.07 2.086-2.086C24 16.002 24 12 24 12s0-4.002-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (lower === 'tiktok') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v6.62c.03 1.87-.45 3.79-1.74 5.16-1.28 1.39-3.23 2.1-5.11 2.02-1.88-.02-3.79-.69-5.07-2.06-1.32-1.36-1.87-3.37-1.74-5.26.1-1.89.88-3.77 2.37-4.99 1.43-1.19 3.39-1.75 5.24-1.57v4.02c-1.11-.17-2.3.16-3.08.97-.8.83-1.05 2.08-.8 3.2.22 1.04.99 1.95 2.01 2.21.99.27 2.12.03 2.87-.69.83-.81 1.02-2.09.96-3.22-.03-2.92-.01-5.84-.02-8.76z" />
      </svg>
    );
  }
  if (lower === 'pinterest') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.4 7.63 11.16-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.36-.72-.36-1.77c0-1.66.96-2.9 2.17-2.9 1.02 0 1.51.77 1.51 1.69 0 1.03-.65 2.56-.99 3.99-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.47 0-2.86-2.06-4.86-5-4.86-3.4 0-5.4 2.56-5.4 5.2 0 1.03.4 2.14.9 2.75.1.12.1.22.08.33l-.33 1.35c-.05.2-.18.25-.4.15-1.5-.7-2.45-2.88-2.45-4.63 0-3.78 2.75-7.25 7.9-7.25 4.16 0 7.4 2.97 7.4 6.93 0 4.14-2.6 7.47-6.22 7.47-1.2 0-2.35-.64-2.73-1.38l-.75 2.84c-.27 1.04-1 2.33-1.5 3.11C9.6 23.67 10.77 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
      </svg>
    );
  }
  if (lower === 'whatsapp') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6-1.061 3.525-1.621 5.371-1.62 5.561 0 10.086-4.526 10.089-10.089.002-2.696-1.047-5.232-2.955-7.14C17.247 1.397 14.717.348 12.02.348c-5.568 0-10.1 4.531-10.103 10.099-.001 2.03.529 4.015 1.536 5.757L2.457 20.3l4.19-1.146z" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  );
};

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const supabase = createServerClient();

  let contactDetails = {
    address: '1st Floor, 274A Kofo Abayomi Street, Victoria Island, Lagos, Nigeria.',
    primaryPhone: '+234 (0) 816 453 6434',
    secondaryPhone: '',
    primaryEmail: 'studio@pieach.com',
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
      { platform: 'twitter', url: 'https://twitter.com' }
    ]
  };

  try {
    const { data } = await supabase
      .from('site_content')
      .select('content')
      .eq('key', 'contact_details')
      .single();
    if (data && data.content) {
      contactDetails = data.content;
    }
  } catch (err) {
    console.error("Error fetching contact details for footer:", err);
  }

  return (
    <footer className="bg-brand-navy text-neutral-300 pt-16 pb-8 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/5">
          
          {/* Logo & About Info */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="transition-opacity hover:opacity-80 w-fit block">
              <img 
                src="/images/mainlogo1.png" 
                alt="PIEACH Logo" 
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="font-sans text-neutral-400 text-sm leading-relaxed max-w-xs font-light">
              Architecture for the human condition — crafted with precision, guided by vision.
            </p>
            {/* Social Icons (Bordered Squares) */}
            <div className="flex items-center space-x-3">
              {contactDetails.socialLinks?.map((link, idx) => {
                if (!link.url) return null;
                let href = link.url.trim();
                if (href.endsWith('...')) {
                  href = href.substring(0, href.length - 3);
                }
                if (!href || href === 'https://' || href === 'http://') return null;
                if (!href.startsWith('http')) {
                  href = `https://${href}`;
                }

                return (
                  <a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-brand-gold hover:border-brand-gold transition duration-300"
                    aria-label={link.platform}
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-brand-gold mb-6">
              NAVIGATE
            </h3>
            <ul className="space-y-3 text-sm font-sans font-light text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-white transition duration-200">Studio</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition duration-200">Services</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition duration-200">Projects</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition duration-200">Journal</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-brand-gold mb-6">
              SERVICES
            </h3>
            <ul className="space-y-3 text-sm font-sans font-light text-neutral-400">
              <li>
                <Link href="/services" className="hover:text-white transition duration-200">Architectural Design</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition duration-200">Interior Design</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition duration-200">Urban Planning</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition duration-200">Project Management</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (No Icons) */}
          <div>
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-brand-gold mb-6">
              CONTACT
            </h3>
            <ul className="space-y-4 text-sm font-sans font-light text-neutral-400">
              <li>
                <a href={`mailto:${contactDetails.primaryEmail}`} className="hover:text-white transition break-all block">
                  {contactDetails.primaryEmail}
                </a>
              </li>
              <li>
                <a href={`tel:${contactDetails.primaryPhone}`} className="hover:text-white transition block">
                  {contactDetails.primaryPhone}
                </a>
              </li>
              {contactDetails.secondaryPhone && (
                <li>
                  <a href={`tel:${contactDetails.secondaryPhone}`} className="hover:text-white transition block">
                    {contactDetails.secondaryPhone}
                  </a>
                </li>
              )}
              <li className="leading-relaxed">
                {contactDetails.address}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] font-sans font-medium text-neutral-500 uppercase tracking-wider">
          <p>© {currentYear} PIEACH LIMITED. All rights reserved.</p>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0 normal-case tracking-normal text-xs">
            <Link href="/privacy" className="hover:text-white transition duration-200">Privacy Policy</Link>
            <span className="text-neutral-600">&#183;</span>
            <Link href="/terms" className="hover:text-white transition duration-200">Terms of Use</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
