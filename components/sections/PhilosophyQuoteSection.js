"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PhilosophyQuoteSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(
      ".quote-subtitle",
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
    .fromTo(
      ".quote-text",
      { opacity: 0, y: 25, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    )
    .to(".quote-line", {
      scaleX: 1,
      duration: 0.6,
      ease: "power2.inOut"
    }, "-=0.2")
    .fromTo(
      ".quote-author",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(
      [".quote-symbol-l", ".quote-symbol-r"],
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.5)" },
      "-=1.4"
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="bg-brand-brown text-white py-24 lg:py-32 overflow-hidden border-t border-b border-white/5 relative"
    >
      
      {/* Decorative subtle visual elements */}
      <div className="absolute top-1/2 left-10 transform -translate-y-1/2 font-serif text-8xl pointer-events-none select-none hidden lg:block">
        <span className="quote-symbol-l inline-block text-white/5 origin-center">“</span>
      </div>
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 font-serif text-8xl pointer-events-none select-none hidden lg:block">
        <span className="quote-symbol-r inline-block text-white/5 origin-center">”</span>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Subtitle */}
        <span className="quote-subtitle font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold mb-6 block">
          Philosophy
        </span>

        {/* Large Quote */}
        <blockquote className="quote-text font-serif italic text-2xl sm:text-4xl lg:text-4xl tracking-tight leading-relaxed mb-8 max-w-4xl mx-auto text-neutral-100">
          "Architecture should create harmony between people, space, and the environment."
        </blockquote>

        {/* Divider line */}
        <div className="quote-line w-10 h-[1px] bg-brand-gold mx-auto mb-6 origin-center scale-x-0" />

        {/* Author */}
        <cite className="quote-author font-sans font-bold text-xs uppercase tracking-[0.2em] text-white not-italic block">
          Olumide George, Principal
        </cite>

      </div>
    </section>
  );
}
