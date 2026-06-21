"use client";

import { useState } from "react";
import Link from "next/link";

const HIGHLIGHT_SLIDES = [
  {
    number: "29",
    label: "YEARS EXPERIENCE",
    text: "Since our founding in 1997, we have delivered landmark developments that redefine aesthetics and functionality across regions.",
    index: "01 / 03",
  },
  {
    number: "15",
    label: "DESIGN AWARDS",
    text: "Our relentless pursuit of spatial perfection and sustainable project delivery has been recognized by some of the world's most respected design institutions.",
    index: "02 / 03",
  },
  {
    number: "120+",
    label: "COMPLETED PROJECTS",
    text: "Our diverse portfolio spans commercial headquarters, luxury estates, and premium hospitality hubs completed to perfection.",
    index: "03 / 03",
  },
];

export default function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HIGHLIGHT_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HIGHLIGHT_SLIDES.length) % HIGHLIGHT_SLIDES.length);
  };

  const activeHighlight = HIGHLIGHT_SLIDES[currentSlide];

  return (
    <section className="bg-brand-light-gray py-20 lg:py-28 text-neutral-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Highlights (Carousel) */}
          <div className="lg:col-span-5 flex flex-col justify-between min-h-[420px] lg:border-r lg:border-neutral-300/60 pr-0 lg:pr-12">
            <div>
              {/* Header Title with Horizontal line */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-300 mb-8">
                <h2 className="font-sans font-bold text-sm tracking-[0.15em] text-neutral-900 uppercase">
                  HIGHLIGHTS
                </h2>
                <span className="font-sans font-bold text-sm tracking-wider text-neutral-900">
                  {activeHighlight.index}
                </span>
              </div>

              {/* Large Highlight Data */}
              <div className="transition-all duration-500 transform translate-y-0 opacity-100 space-y-4">
                <span className="font-sans font-black text-7xl sm:text-8xl lg:text-8xl text-neutral-950 block leading-none tracking-tighter">
                  {activeHighlight.number}
                </span>
                <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.2em] text-neutral-950 block uppercase">
                  {activeHighlight.label}
                </span>
                <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed max-w-sm font-light pt-2">
                  {activeHighlight.text}
                </p>
              </div>
            </div>

            {/* Slider Controls (Square shape with rounded corners bg-neutral-200) */}
            <div className="flex items-center space-x-3 mt-10 lg:mt-0">
              <button
                onClick={prevSlide}
                className="w-12 h-10 rounded-[8px] bg-neutral-200/60 hover:bg-neutral-300/80 flex items-center justify-center text-neutral-800 transition duration-300 active:scale-95 cursor-pointer"
                aria-label="Previous highlight"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-10 rounded-[8px] bg-neutral-200/60 hover:bg-neutral-300/80 flex items-center justify-center text-neutral-800 transition duration-300 active:scale-95 cursor-pointer"
                aria-label="Next highlight"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: About Us */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[420px]">
            <div>
              {/* Header Title with Horizontal line */}
              <div className="pb-4 border-b border-neutral-300 mb-8">
                <h2 className="font-sans font-bold text-sm tracking-[0.15em] text-neutral-900 uppercase">
                  ABOUT US
                </h2>
              </div>
              
              <p className="font-sans text-neutral-700 text-sm sm:text-base leading-relaxed font-normal max-w-3xl">
                Established in 1997, PIEACH Limited is a multidisciplinary studio of visionary architects, master planners, and interior designers. With an industry-leading reputation across West Africa, our award-winning firm specializes in crafting bespoke, high-performance environments. From monumental civic landmarks to intimate luxury residences, we blend structural precision with timeless aesthetic mastery to redefine the spatial experience.
              </p>
            </div>

            {/* Read More Card / Link styled exactly like mockup */}
            <div className="pt-10">
              <Link href="/about" className="group inline-block space-y-3">
                {/* Stepped outline box with diagonal arrow */}
                <div className="w-44 h-24 border-t border-l border-b border-neutral-300 flex items-center justify-center transition duration-300 group-hover:border-[#c5a880] group-hover:bg-[#c5a880]/5">
                  <svg className="w-8 h-8 text-neutral-950 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
                
                {/* Enclosed text button */}
                <div className="w-44 h-10 border border-neutral-300 flex items-center justify-center transition duration-300 group-hover:border-[#c5a880] group-hover:bg-[#c5a880]/10">
                  <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-neutral-800 uppercase">
                    ABOUT US
                  </span>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
