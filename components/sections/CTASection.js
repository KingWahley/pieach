"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Content staggered entrance
    gsap.fromTo(
      ".cta-el",
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );

    // 2. Background image parallax scroll
    if (bgRef.current) {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative py-28 lg:py-36 bg-neutral-900 text-white overflow-hidden"
    >
      
      {/* Background Image with vertical padding for parallax travel */}
      <div
        ref={bgRef}
        className="absolute inset-x-0 -top-[12%] -bottom-[12%] z-0 bg-cover bg-center opacity-40 scale-110 will-change-transform"
        style={{ backgroundImage: "url('/assets/cta.png')" }}
      />

      {/* Content Container */}
      <div className="relative z-20 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center">
          
          {/* Subtitle */}
          <span className="cta-el font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-6 block">
            LET'S BUILD TOGETHER
          </span>

          {/* Heading with styled serif word */}
          <h2 className="cta-el font-sans font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight mb-8 max-w-2xl">
            Have a vision? Let's make it{" "}
            <span className="font-serif italic font-normal text-brand-gold tracking-normal">
              real.
            </span>
          </h2>

          {/* Paragraph explanation */}
          <p className="cta-el font-sans text-neutral-350 text-sm sm:text-base max-w-md leading-relaxed font-light mb-12">
            Every landmark began as a conversation.
          </p>

          {/* Slide-fill Button */}
          <div className="cta-el">
            <Link
              href="/book-appointment"
              className="inline-flex items-center justify-center border border-white/30 rounded-none text-xs font-bold uppercase tracking-widest text-white px-8 py-4 transition-all duration-300 relative overflow-hidden group active:scale-95 cursor-pointer"
            >
              <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 z-0" />
              <span className="relative z-10 group-hover:text-neutral-950 transition-colors duration-300">
                Book a Consultation
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
