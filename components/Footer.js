import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-brand-gold hover:border-brand-gold transition duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-brand-gold hover:border-brand-gold transition duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-brand-gold hover:border-brand-gold transition duration-300"
                aria-label="Twitter/X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
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
                <a href="mailto:studio@pieach.com" className="hover:text-white transition break-all block">
                  studio@pieach.com
                </a>
              </li>
              <li>
                <a href="tel:+2348164536434" className="hover:text-white transition block">
                  +234 (0) 816 453 6434
                </a>
              </li>
              <li className="leading-relaxed">
                1st Floor, 274A Kofo Abayomi Street, Victoria Island, Lagos, Nigeria.
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
