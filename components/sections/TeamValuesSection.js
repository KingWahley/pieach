"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_VALUES = [
  {
    title: "Craft",
    description: "Every detail is executed with precision, from raw materials to final finishes.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
    ),
  },
  {
    title: "Context",
    description: "We design spaces that respect local climate, culture, and environmental dynamics.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l.406.34c.125.104.244.223.34.34l.34.406a1.125 1.125 0 01.29.742V18.07c0 .541-.33 1.022-.83 1.233l-2.08.878a1.125 1.125 0 01-1.157-.184l-2.144-2.144a1.125 1.125 0 01-.29-.742V6.63c0-.344.158-.668.432-.883l2.25-1.77a1.125 1.125 0 011.4-.048l.99.742c.16.12.378.12.539 0l.99-.742a1.125 1.125 0 011.4.048l2.25 1.77c.274.215.432.539.432.883v10.655c0 .334-.148.65-.405.864l-.406.34a1.125 1.125 0 01-.742.29H12.75" />
      </svg>
    ),
  },
  {
    title: "Collaboration",
    description: "We work closely with clients, engineers, and builders to achieve a unified vision.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description: "Integrating modern technology, smart building systems, and sustainable design.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a3 3 0 10-3-3H12m0 3a3 3 0 113-3H12m-9 2.25h18M9 21h6" />
      </svg>
    ),
  },
  {
    title: "Integrity",
    description: "Maintaining transparent communication, structural safety, and budget discipline.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: "Community",
    description: "Shaping environments that foster social connection and elevate human experience.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128A9.321 9.321 0 0112 20c-1.034 0-2.023-.167-2.946-.477M18 10a3 3 0 11-6 0 3 3 0 016 0zm-6 2a5 5 0 00-5 5v3h10v-3a5 5 0 00-5-5z" />
      </svg>
    ),
  },
];

export default function TeamValuesSection({ values, title = "Core Values" }) {
  const containerRef = useRef(null);
  const valuesToRender = values || DEFAULT_VALUES;

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    tl.to(".values-header-line", {
      scaleX: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .fromTo(
      ".values-header-title",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(
      ".value-card",
      { opacity: 0, y: 35, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(
      ".value-icon-container",
      { scale: 0 },
      { scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.6"
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="bg-brand-brown text-white py-20 lg:py-24 border-t border-b border-white/5 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12">
          <div className="relative pb-4 inline-block mb-4">
            <h2 className="values-header-title font-serif text-3xl text-brand-gold tracking-tight uppercase">
              {title}
            </h2>
            <div className="values-header-line absolute left-0 bottom-0 h-[1.5px] bg-brand-gold w-full origin-left scale-x-0" />
          </div>
        </div>

        {/* Core Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
          {valuesToRender.map((val, idx) => (
            <div 
              key={idx}
              className="value-card group p-8 lg:p-12 border-r border-b border-white/10 hover:bg-white/[0.04] transition duration-300 min-h-[220px] flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="value-icon-container p-2.5 bg-white/5 rounded-sm transition duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-brand-gold/10">
                    {val.icon}
                  </div>
                  <span className="text-[10px] tracking-widest text-white/30 group-hover:text-white transition duration-300 uppercase font-semibold">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-sans font-black text-lg uppercase tracking-wider text-white mb-3 group-hover:text-brand-gold group-hover:translate-x-1 transition duration-300">
                  {val.title}
                </h3>
                <p className="font-sans text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
