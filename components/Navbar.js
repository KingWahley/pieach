"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = pathname === "/" ? window.innerHeight - 100 : 100;
      setIsScrolledPastHero(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      yPercent: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.2
    });
  }, { scope: headerRef });

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 z-50 flex w-full flex-col items-start justify-between gap-4 px-5 sm:px-8 lg:px-12 pointer-events-none"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-stretch relative pointer-events-auto">
        <div className="flex w-full items-start justify-between">
          
          {/* Logo Link */}
          <Link href="/" className="pt-5 transition-opacity hover:opacity-80">
            <img 
              src={isScrolledPastHero ? "/images/mainlogo2.png" : "/images/mainlogo1.png"} 
              alt="PIEACH Logo" 
              className="h-16 w-auto object-contain transition-all duration-500"
            />
          </Link>

          {/* Center Navigation Menu (Desktop Only) */}
          <nav className={`absolute left-1/2 hidden w-max -translate-x-1/2 items-center justify-center bg-white px-8 py-5 text-sm font-medium text-[#111111] shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-all duration-500 lg:flex ${
            isScrolledPastHero
              ? 'top-4 rounded-[2.5rem] border border-[#111]/20'
              : 'top-0 rounded-b-[2.5rem] border border-transparent'
          }`}>
            <div className="flex items-center">
              
              {/* Navigation Links */}
              <ul className="flex items-center gap-7">
                <li>
                  <Link href="/" className={`transition hover:opacity-60 ${pathname === '/' ? 'text-brand-gold font-semibold' : ''}`}>
                    Home
                  </Link>
                </li>
                
                {/* Dropdown Component (About) */}
                <li className="group relative">
                  <Link href="/about" className={`transition hover:opacity-60 flex items-center gap-1 py-1 ${pathname.startsWith('/about') || pathname === '/team' ? 'text-brand-gold font-semibold' : ''}`}>
                    About
                    <svg className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  
                  {/* Dropdown Popover */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-1">
                    <div className="flex flex-col overflow-hidden bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#111]/10 min-w-[160px]">
                      <Link href="/about" className="px-5 py-3 text-sm text-[#111]/70 hover:text-[#111] hover:bg-[#111]/5 transition-colors">
                        About Us
                      </Link>
                      <Link href="/team" className="px-5 py-3 text-sm text-[#111]/70 hover:text-[#111] hover:bg-[#111]/5 transition-colors border-t border-[#111]/5">
                        The Team
                      </Link>
                    </div>
                  </div>
                </li>
                <li>
                  <Link href="/services" className={`transition hover:opacity-60 ${pathname.startsWith('/services') ? 'text-brand-gold font-semibold' : ''}`}>
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className={`transition hover:opacity-60 ${pathname.startsWith('/projects') ? 'text-brand-gold font-semibold' : ''}`}>
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className={`transition hover:opacity-60 ${pathname.startsWith('/careers') ? 'text-brand-gold font-semibold' : ''}`}>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className={`transition hover:opacity-60 ${pathname.startsWith('/blog') ? 'text-brand-gold font-semibold' : ''}`}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={`transition hover:opacity-60 ${pathname.startsWith('/contact') ? 'text-brand-gold font-semibold' : ''}`}>
                    Contact
                  </Link>
                </li>
              </ul>

              {/* Sliding Book Appointment Button (Revealed on Scroll) */}
              <div className={`transition-all duration-500 overflow-hidden flex items-center whitespace-nowrap ${
                isScrolledPastHero 
                  ? 'max-w-[300px] opacity-100 ml-7' 
                  : 'max-w-0 opacity-0 ml-0'
              }`}>
                <div className="h-4 w-px bg-[#111]/20 mr-7" />
                <Link href="/book-appointment" className="transition font-semibold text-[#111] hover:text-brand-gold">
                  Book Appointment
                </Link>
              </div>
            </div>
          </nav>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`mt-4 ml-auto rounded-full backdrop-blur lg:hidden transition-all duration-500 p-3.5 focus:outline-none cursor-pointer ${
              isScrolledPastHero
                ? 'border-[#111]/20 bg-white text-[#111] shadow-lg hover:bg-neutral-100'
                : 'border-white/50 bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isOpen ? (
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`lg:hidden mt-2 w-full rounded-2xl border border-neutral-100 bg-white/95 shadow-xl backdrop-blur-md overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[500px] opacity-100 py-4 px-6" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col space-y-3">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className={`block rounded-lg px-4 py-2 text-base font-semibold transition ${pathname === '/' ? 'text-brand-gold bg-neutral-50' : 'text-neutral-700 hover:text-brand-gold hover:bg-neutral-50'}`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsOpen(false)}
              className={`block rounded-lg px-4 py-2 text-base font-semibold transition ${pathname.startsWith('/about') ? 'text-brand-gold bg-neutral-50' : 'text-neutral-700 hover:text-brand-gold hover:bg-neutral-50'}`}
            >
              About Us
            </Link>
            <Link 
              href="/team" 
              onClick={() => setIsOpen(false)}
              className={`block rounded-lg px-4 py-2 text-base font-semibold transition ${pathname === '/team' ? 'text-brand-gold bg-neutral-50' : 'text-neutral-700 hover:text-brand-gold hover:bg-neutral-50'}`}
            >
              The Team
            </Link>
            <Link 
              href="/services" 
              onClick={() => setIsOpen(false)}
              className={`block rounded-lg px-4 py-2 text-base font-semibold transition ${pathname.startsWith('/services') ? 'text-brand-gold bg-neutral-50' : 'text-neutral-700 hover:text-brand-gold hover:bg-neutral-50'}`}
            >
              Services
            </Link>
            <Link 
              href="/projects" 
              onClick={() => setIsOpen(false)}
              className={`block rounded-lg px-4 py-2 text-base font-semibold transition ${pathname.startsWith('/projects') ? 'text-brand-gold bg-neutral-50' : 'text-neutral-700 hover:text-brand-gold hover:bg-neutral-50'}`}
            >
              Projects
            </Link>
            <Link 
              href="/careers" 
              onClick={() => setIsOpen(false)}
              className={`block rounded-lg px-4 py-2 text-base font-semibold transition ${pathname.startsWith('/careers') ? 'text-brand-gold bg-neutral-50' : 'text-neutral-700 hover:text-brand-gold hover:bg-neutral-50'}`}
            >
              Careers
            </Link>
            <Link 
              href="/blog" 
              onClick={() => setIsOpen(false)}
              className={`block rounded-lg px-4 py-2 text-base font-semibold transition ${pathname.startsWith('/blog') ? 'text-brand-gold bg-neutral-50' : 'text-neutral-700 hover:text-brand-gold hover:bg-neutral-50'}`}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setIsOpen(false)}
              className={`block rounded-lg px-4 py-2 text-base font-semibold transition ${pathname.startsWith('/contact') ? 'text-brand-gold bg-neutral-50' : 'text-neutral-700 hover:text-brand-gold hover:bg-neutral-50'}`}
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-neutral-100">
              <Link
                href="/book-appointment"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center rounded-full bg-brand-brown py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-brand-gold hover:text-brand-navy"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
