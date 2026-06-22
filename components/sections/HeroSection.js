'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';
import styles from './HeroSection.module.css';
import HeroBar from './HeroBar';

export default function HeroSection() {
  const containerRef = useRef(null);
  const colosseumRef = useRef(null);
  const revealRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    // 1. Register custom ease on client-side
    gsap.registerPlugin(CustomEase);
    CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
    gsap.defaults({ ease: "main", duration: 0.7 });

    // 2. Establish GSAP context for safe React cleanup
    const ctx = gsap.context(() => {
      // Set initial cursor states (centered coordinate offset)
      gsap.set([cursorDotRef.current, cursorRingRef.current], { xPercent: -50, yPercent: -50 });

      // Entrance Timeline for Typography Elements
      const heroTl = gsap.timeline({ delay: 0.6 });
      
      heroTl.from(`.${styles['hero-line']}`, {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      })
      .from(`.${styles['hero-desc']}`, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8")
      .fromTo(btnRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
        "-=0.7"
      );

      // Interpolation quickTo methods for lagging cursor
      const dotX = gsap.quickTo(cursorDotRef.current, "x", { duration: 0, ease: "none" });
      const dotY = gsap.quickTo(cursorDotRef.current, "y", { duration: 0, ease: "none" });
      const ringX = gsap.quickTo(cursorRingRef.current, "x", { duration: 0.15, ease: "power3" });
      const ringY = gsap.quickTo(cursorRingRef.current, "y", { duration: 0.15, ease: "power3" });

      // Mousemove logic: custom cursors, background parallax, and x-ray mask variables
      const handleMouseMove = (e) => {
        const xVal = e.clientX;
        const yVal = e.clientY;

        dotX(xVal);
        dotY(yVal);
        ringX(xVal);
        ringY(yVal);

        if (containerRef.current && revealRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const relativeX = xVal - rect.left;
          const relativeY = yVal - rect.top;

          // Set custom CSS variables for radial mask alignment
          gsap.to(revealRef.current, {
            "--x": `${relativeX}px`,
            "--y": `${relativeY}px`,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto"
          });
          
          revealRef.current.classList.add(styles.visible);
        }

        // Parallax calculation
        if (colosseumRef.current && revealRef.current) {
          const xMove = (xVal / window.innerWidth - 0.5) * 30;
          const yMove = (yVal / window.innerHeight - 0.5) * 30;

          gsap.to([colosseumRef.current, revealRef.current], {
            x: xMove,
            y: yMove,
            scale: 1.05,
            duration: 1.5,
            ease: "power2.out"
          });
        }
      };

      // Custom Cursor Enter / Leave dynamics
      const handleMouseEnter = () => {
        gsap.to([cursorDotRef.current, cursorRingRef.current], { opacity: 1, duration: 0.3 });
      };

      const handleMouseLeave = () => {
        gsap.to([cursorDotRef.current, cursorRingRef.current], { opacity: 0, duration: 0.3 });
        
        if (revealRef.current) {
          revealRef.current.classList.remove(styles.visible);
        }
        
        // Reset background parallax on leave
        if (colosseumRef.current && revealRef.current) {
          gsap.to([colosseumRef.current, revealRef.current], {
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power2.out"
          });
        }
      };

      // Register listeners
      window.addEventListener('mousemove', handleMouseMove);
      containerRef.current?.addEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

      // Magnetic Action Button effect
      const btn = btnRef.current;
      const handleBtnMouseMove = (e) => {
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      const handleBtnMouseLeave = () => {
        if (!btn) return;
        gsap.to(btn, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)"
        });
      };

      btn?.addEventListener('mousemove', handleBtnMouseMove);
      btn?.addEventListener('mouseleave', handleBtnMouseLeave);

      // Cursors scaling for standard links inside the section
      const handleInteractableEnter = () => {
        cursorDotRef.current?.classList.add(styles.hovering);
        cursorRingRef.current?.classList.add(styles.hovering);
      };
      
      const handleInteractableLeave = () => {
        cursorDotRef.current?.classList.remove(styles.hovering);
        cursorRingRef.current?.classList.remove(styles.hovering);
      };

      const interactables = containerRef.current?.querySelectorAll('a, button');
      interactables?.forEach(el => {
        el.addEventListener('mouseenter', handleInteractableEnter);
        el.addEventListener('mouseleave', handleInteractableLeave);
      });
    }, containerRef);

    // Context clean-up prevents double trigger issues in React strict mode
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Absolute cursor layers */}
      <div ref={cursorDotRef} className={styles['cursor-dot']} />
      <div ref={cursorRingRef} className={styles['cursor-ring']} />

      <div ref={containerRef} className={styles['container-hero']}>
        {/* Responsive Content Card */}
        <div className={styles['glass-card']}>
          <h1 className={styles['hero-title']}>
            <span className={styles['hero-line']}>BEYOND</span>
            <br />
            <span className={styles['hero-line']}>ARCHITECTURE</span>
          </h1>
          <p className={styles['hero-desc']}>
            We design spaces that tell your story, transforming ideas into striking architectural experiences. From concept to landmark, we push boundaries to create spaces that inspire and endure.
          </p>
          <a ref={btnRef} href="/projects" className={styles.btn}>
            Contact Us
          </a>
        </div>

        {/* Visual Background Layers (next/image optimized) */}
        <div className={styles['colosseum-wrapper']}>
          <div className={styles['image-base']}>
            <Image
              ref={colosseumRef}
              src="/assets/homepagehero/front.jpg"
              alt="Hero Base Background"
              fill
              priority
              sizes="100vw"
              className={styles.colosseum}
            />
          </div>
          <div className={styles['image-reveal']}>
            <Image
              ref={revealRef}
              src="/assets/homepagehero/back.png"
              alt="Hero Reveal Foreground"
              fill
              sizes="100vw"
              className={styles['colosseum-reveal']}
            />
          </div>
        </div>
        <HeroBar />
      </div>
    </>
  );
}
