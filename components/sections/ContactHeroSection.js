"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactHeroSection() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Content Stagger entrance immediately on page load
    const tl = gsap.timeline();
    tl.fromTo(
      ".contact-hero-el",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );

    // 2. Fixed background parallax curtain reveal effect
    if (bgRef.current) {
      gsap.fromTo(
        bgRef.current,
        { y: 0 },
        {
          y: () => containerRef.current.offsetHeight,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative h-[60vh] min-h-[450px] flex items-center justify-start overflow-hidden bg-neutral-900"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/assets/contactHero.jpg')" }}
      />
      
      {/* Gradients Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/70 via-transparent to-black/35" />

      {/* Content Container */}
      <div className="relative z-20 mx-auto max-w-[1600px] w-full px-5 sm:px-8 lg:px-12 pt-24">
        <div className="max-w-4xl">
          <h1 className="contact-hero-el font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[1.05] text-white mb-6">
            Let's Build Something<br />Exceptional
          </h1>
          <p className="contact-hero-el font-sans text-neutral-300 text-sm sm:text-base max-w-xl mb-8 leading-relaxed font-light">
            Connect with Pieach to discuss architecture, interiors, landscapes, and visionary spaces designed with purpose.
          </p>
          <div className="contact-hero-el flex flex-wrap items-center gap-4">
            <Link
              href="/book-appointment"
              className="inline-flex items-center justify-center bg-brand-gold text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm shadow-md hover:bg-brand-gold-hover hover:shadow-lg transition duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
