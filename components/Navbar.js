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
  const backdropRef = useRef(null);
  const drawerRef = useRef(null);
  const linkRefs = useRef([]);
  const extraRef = useRef(null);
  const tlRef = useRef(null);

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
    // Header entry animation
    gsap.from(headerRef.current, {
      yPercent: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.2
    });

    // Mobile drawer timeline
    tlRef.current = gsap.timeline({ paused: true })
      .to(backdropRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(drawerRef.current, {
        xPercent: -100,
        duration: 0.5,
        ease: "power3.out"
      }, "-=0.3")
      .fromTo(linkRefs.current.filter(Boolean),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(extraRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );
  });

  useEffect(() => {
    if (isOpen) {
      tlRef.current?.play();
      document.body.style.overflow = "hidden";
    } else {
      tlRef.current?.reverse();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <div
        ref={backdropRef}
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-[#0A0F14]/65 backdrop-blur-sm z-30 lg:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ opacity: 0 }}
      />

      {/* Mobile Drawer Panel */}
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 w-[85%] max-w-[400px] h-screen bg-[#0A0F14] text-white z-40 shadow-2xl lg:hidden flex flex-col justify-between p-8 pt-24 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          transform: "translateX(100%)",
          backgroundImage: "radial-gradient(ellipse at top right, rgba(197, 168, 128, 0.12), transparent 70%)"
        }}
      >
        <div className="flex flex-col space-y-6 overflow-y-auto max-h-[70vh] pr-2">
          <nav className="flex flex-col space-y-4">
            <div ref={el => { linkRefs.current[0] = el; }}>
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className={`group flex items-baseline gap-3 py-1 font-serif text-3xl tracking-tight transition-all duration-300 hover:pl-3 ${
                  pathname === '/' ? 'text-brand-gold' : 'text-white/80 hover:text-brand-gold'
                }`}
              >
                <span className="font-sans text-xs tracking-widest text-brand-gold/60">01</span>
                <span>Home</span>
              </Link>
            </div>
            <div ref={el => { linkRefs.current[1] = el; }}>
              <Link 
                href="/about" 
                onClick={() => setIsOpen(false)}
                className={`group flex items-baseline gap-3 py-1 font-serif text-3xl tracking-tight transition-all duration-300 hover:pl-3 ${
                  pathname.startsWith('/about') ? 'text-brand-gold' : 'text-white/80 hover:text-brand-gold'
                }`}
              >
                <span className="font-sans text-xs tracking-widest text-brand-gold/60">02</span>
                <span>About Us</span>
              </Link>
            </div>
            <div ref={el => { linkRefs.current[2] = el; }}>
              <Link 
                href="/team" 
                onClick={() => setIsOpen(false)}
                className={`group flex items-baseline gap-3 py-1 font-serif text-3xl tracking-tight transition-all duration-300 hover:pl-3 ${
                  pathname === '/team' ? 'text-brand-gold' : 'text-white/80 hover:text-brand-gold'
                }`}
              >
                <span className="font-sans text-xs tracking-widest text-brand-gold/60">03</span>
                <span>The Team</span>
              </Link>
            </div>
            <div ref={el => { linkRefs.current[3] = el; }}>
              <Link 
                href="/services" 
                onClick={() => setIsOpen(false)}
                className={`group flex items-baseline gap-3 py-1 font-serif text-3xl tracking-tight transition-all duration-300 hover:pl-3 ${
                  pathname.startsWith('/services') ? 'text-brand-gold' : 'text-white/80 hover:text-brand-gold'
                }`}
              >
                <span className="font-sans text-xs tracking-widest text-brand-gold/60">04</span>
                <span>Services</span>
              </Link>
            </div>
            <div ref={el => { linkRefs.current[4] = el; }}>
              <Link 
                href="/projects" 
                onClick={() => setIsOpen(false)}
                className={`group flex items-baseline gap-3 py-1 font-serif text-3xl tracking-tight transition-all duration-300 hover:pl-3 ${
                  pathname.startsWith('/projects') ? 'text-brand-gold' : 'text-white/80 hover:text-brand-gold'
                }`}
              >
                <span className="font-sans text-xs tracking-widest text-brand-gold/60">05</span>
                <span>Projects</span>
              </Link>
            </div>
            <div ref={el => { linkRefs.current[5] = el; }}>
              <Link 
                href="/careers" 
                onClick={() => setIsOpen(false)}
                className={`group flex items-baseline gap-3 py-1 font-serif text-3xl tracking-tight transition-all duration-300 hover:pl-3 ${
                  pathname.startsWith('/careers') ? 'text-brand-gold' : 'text-white/80 hover:text-brand-gold'
                }`}
              >
                <span className="font-sans text-xs tracking-widest text-brand-gold/60">06</span>
                <span>Careers</span>
              </Link>
            </div>
            <div ref={el => { linkRefs.current[6] = el; }}>
              <Link 
                href="/blog" 
                onClick={() => setIsOpen(false)}
                className={`group flex items-baseline gap-3 py-1 font-serif text-3xl tracking-tight transition-all duration-300 hover:pl-3 ${
                  pathname.startsWith('/blog') ? 'text-brand-gold' : 'text-white/80 hover:text-brand-gold'
                }`}
              >
                <span className="font-sans text-xs tracking-widest text-brand-gold/60">07</span>
                <span>Blog</span>
              </Link>
            </div>
            <div ref={el => { linkRefs.current[7] = el; }}>
              <Link 
                href="/contact" 
                onClick={() => setIsOpen(false)}
                className={`group flex items-baseline gap-3 py-1 font-serif text-3xl tracking-tight transition-all duration-300 hover:pl-3 ${
                  pathname.startsWith('/contact') ? 'text-brand-gold' : 'text-white/80 hover:text-brand-gold'
                }`}
              >
                <span className="font-sans text-xs tracking-widest text-brand-gold/60">08</span>
                <span>Contact</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Bottom Details */}
        <div ref={extraRef} className="pt-6 border-t border-white/10 flex flex-col space-y-4">
          <Link
            href="/book-appointment"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center rounded-full bg-brand-gold py-3 text-sm font-semibold uppercase tracking-wider text-brand-navy transition duration-300 hover:bg-white hover:text-brand-navy"
          >
            Book Appointment
          </Link>
          
          <div className="flex flex-col space-y-1 text-xs text-white/50 font-sans tracking-wide">
            <span>info@pieach.com</span>
            <span>+1 (555) 0199</span>
          </div>
        </div>
      </div>

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
            <nav className={`absolute left-1/2 hidden w-max -translate-x-1/2 items-center justify-center bg-white px-8 py-5 text-sm font-medium text-[#111] shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-all duration-500 lg:flex ${
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
              aria-label="Toggle Menu"
              className={`mt-4 ml-auto rounded-full backdrop-blur lg:hidden transition-all duration-500 p-4 focus:outline-none cursor-pointer z-50 relative ${
                isOpen
                  ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                  : isScrolledPastHero
                    ? 'border-[#111]/20 bg-white text-[#111] shadow-lg hover:bg-neutral-100'
                    : 'border-white/50 bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <div className="relative w-5 h-4 flex flex-col justify-between items-center">
                <span className={`block h-[2px] w-5 bg-current rounded-full transition-all duration-300 transform origin-center ${
                  isOpen ? "rotate-45 translate-y-[7px]" : ""
                }`} />
                <span className={`block h-[2px] w-5 bg-current rounded-full transition-all duration-300 transform ${
                  isOpen ? "opacity-0 scale-x-0" : ""
                }`} />
                <span className={`block h-[2px] w-5 bg-current rounded-full transition-all duration-300 transform origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`} />
              </div>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
