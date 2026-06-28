'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset browser scroll to top immediately
    window.scrollTo(0, 0);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.085,
    });

    // Reset Lenis internal scroll state to top immediately
    lenis.scrollTo(0, { immediate: true });

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis with GSAP ticker
    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    
    // Disable lag smoothing to prevent visual stuttering
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
