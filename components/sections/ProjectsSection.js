'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Replace with your project data
const images = [
  {
    src: '/assets/projects/uba_ghana_head_office.jpg',
    alt: 'uba structure',
    title: 'UBA Ghana Head Office',
    description: 'Accra, Ghana',
  },
  {
    src: '/assets/projects/temple_road.jpg',
    alt: 'Urban cityscape at sunset',
    title: 'Temple Road',
    description: 'Ikoyi, Lagos, Nigeria.',
  },
  {
    src: '/assets/projects/meliora_residential_tower.jpg',
    alt: 'Abstract geometric pattern',
    title: 'Meliora Residential Tower',
    description: 'Gerrard Road, Ikoyi, Lagos',
  },
  {
    src: '/assets/projects/west_foster_apartments.jpg',
    alt: 'Modern architecture building',
    title: 'West Foster Apartments',
    description: 'Ikoyi, Lagos, Nigeria',
  },
  {
    src: '/assets/projects/the_sphere.jpg',
    alt: 'Mountain landscape',
    title: 'The Sphere',
    description: 'Victoria Island, Lagos, Nigeria',
  },
  {
    src: '/assets/projects/falomo_shopping_center.jpg',
    alt: 'Minimalist design elements',
    title: 'Falomo Shopping Center',
    description: 'Ikoyi, Lagos State, Nigeria',
  },
  {
    src: '/assets/projects/abeokuta_shopping_centre.jpg',
    alt: 'Ocean waves and beach',
    title: 'Abeokuta Shopping Centre',
    description: 'Abeokuta, Ogun State, Nigeria.',
  },
];

function MobileProjectsShowcase({ images }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      ".mobile-project-card",
      { opacity: 0, x: 50, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  const handleScroll = (e) => {
    const container = e.currentTarget;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;
    
    const progress = container.scrollLeft / maxScroll;
    setScrollProgress(progress);

    const cardWidth = container.scrollWidth / images.length;
    const index = Math.min(
      images.length - 1,
      Math.max(0, Math.round(container.scrollLeft / cardWidth))
    );
    setActiveIndex(index);
  };

  const getProjectLink = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes("abeokuta")) return "/projects/abeokuta-shopping-center";
    if (lower.includes("falomo")) return "/projects/falomo-shopping-centre";
    if (lower.includes("temple")) return "/projects/temple-road";
    return "/projects";
  };

  return (
    <div ref={containerRef} className="w-full pb-16 overflow-hidden">
      
      {/* Active Indicator & Swipe instruction */}
      <div className="flex justify-between items-center px-5 sm:px-8 mb-6">
        <span className="font-sans font-bold text-xs text-brand-gold uppercase tracking-[0.25em] tabular-nums">
          {(activeIndex + 1).toString().padStart(2, "0")} / {images.length.toString().padStart(2, "0")}
        </span>
        <span className="font-sans text-[10px] text-white/40 uppercase tracking-widest font-semibold">
          Swipe to explore
        </span>
      </div>

      {/* Snap Scrolling Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 scroll-smooth w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {images.map((img, idx) => {
          const href = getProjectLink(img.title);
          return (
            <Link
              key={idx}
              href={href}
              className="mobile-project-card shrink-0 snap-center relative w-[78vw] aspect-[3/4] rounded-sm overflow-hidden border border-white/5 mr-5 first:ml-[11vw] last:mr-[11vw] bg-neutral-950 shadow-2xl active:scale-98 transition duration-300 block"
            >
              {/* Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt || img.title}
                  fill
                  sizes="78vw"
                  className="object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

              {/* Text Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end">
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wide leading-tight mb-1">
                  {img.title}
                </h3>
                <span className="font-sans text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">
                  {img.description}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Progress Bar Track */}
      <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden mt-6 mx-auto relative">
        <div 
          className="absolute inset-y-0 left-0 bg-brand-gold w-full origin-left transition-transform duration-100 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-[#090d12] text-white">
      <div className="mx-auto flex min-h-[55vh] w-full max-w-7xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/55">
            Selected Work
          </p>
          <div
            aria-hidden="true"
            className={cn(
              'mb-8 h-px w-32 bg-white/15',
              'shadow-[0_0_40px_rgba(255,255,255,0.08)]'
            )}
          />
          <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
            Our Recent Projects
          </h2>
        </div>
      </div>

      {/* Desktop version - unchanged */}
      <div className="hidden md:block">
        <ZoomParallax images={images} />
      </div>

      {/* Mobile version - custom touch-snap slider */}
      <div className="block md:hidden">
        <MobileProjectsShowcase images={images} />
      </div>
    </section>
  );
}
