"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import gsap from "gsap";

function ProjectSlider({ images, isVisible }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);

  const slideTo = (direction) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const nextIndex = direction === 'next' 
      ? (currentIndex + 1) % images.length 
      : (currentIndex - 1 + images.length) % images.length;
    const currentEl = document.querySelector(`.slider-image-${currentIndex}`);
    const nextEl = document.querySelector(`.slider-image-${nextIndex}`);
    if (!currentEl || !nextEl) {
      isAnimating.current = false;
      return;
    }
    
    // Reset next element position and slide it in
    gsap.set(nextEl, { xPercent: direction === 'next' ? 100 : -100, zIndex: 10, autoAlpha: 1 });
    gsap.set(currentEl, { zIndex: 1 });
    
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentEl, { autoAlpha: 0 }); // Hide old image
        setCurrentIndex(nextIndex);
        isAnimating.current = false;
      }
    });
    
    tl.to(currentEl, { xPercent: direction === 'next' ? -100 : 100, duration: 0.8, ease: "power3.inOut" }, 0)
      .to(nextEl, { xPercent: 0, duration: 0.8, ease: "power3.inOut" }, 0);
  };

  return (
    <div 
      className={`absolute inset-0 z-50 flex items-center justify-center transition-opacity duration-500 overflow-hidden ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-[#090d12]">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className={`slider-image-${idx} absolute inset-0 h-full w-full ${idx === 0 ? "opacity-100" : "opacity-0 invisible"}`}
          >
            <Image
              src={img.src || "/placeholder.svg"}
              alt={img.alt || `Slider image ${idx + 1}`}
              fill
              className="object-cover"
            />
            {(img.title || img.description) && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-6 pb-20 pt-20 md:px-12 md:pb-24 md:pt-40 text-white flex flex-col items-start">
                {img.title && (
                  <h3 className="mb-8 text-xl sm:text-3xl md:text-4xl font-semibold tracking-wide leading-tight drop-shadow-md">
                    {img.title}
                  </h3>
                )}
                <a
                  href="/projects"
                  className="animate-[pulse-border_3s_infinite] relative z-0 inline-block overflow-hidden border border-[#c9a96e] px-8 md:px-12 py-[0.9rem] md:py-[1.1rem] text-[0.7rem] md:text-[0.78rem] uppercase tracking-[0.2em] text-[#f5f2ec] transition-colors duration-400 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-[#c9a96e] before:transition-transform before:duration-400 hover:text-[#0b0f14] hover:before:scale-x-100"
                >
                  View All Projects
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.button 
              initial={{ scale: 0.5, opacity: 0, x: "40vw", y: "-50%" }}
              animate={{ scale: 1, opacity: 1, x: 0, y: "-50%" }}
              exit={{ scale: 0.5, opacity: 0, x: "40vw", y: "-50%" }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: 0.2 }}
              onClick={() => slideTo('prev')}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors hover:bg-gray-200 md:left-8 md:h-16 md:w-16 focus:outline-none cursor-pointer"
            >
              <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </motion.button>
            <motion.button 
              initial={{ scale: 0.5, opacity: 0, x: "-40vw", y: "-50%" }}
              animate={{ scale: 1, opacity: 1, x: 0, y: "-50%" }}
              exit={{ scale: 0.5, opacity: 0, x: "-40vw", y: "-50%" }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: 0.2 }}
              onClick={() => slideTo('next')}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors hover:bg-gray-200 md:right-8 md:h-16 md:w-16 focus:outline-none cursor-pointer"
            >
              <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </motion.button>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3"
            >
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${
                    idx === currentIndex ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ZoomParallax({ images }) {
  const container = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isZoomComplete, setIsZoomComplete] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.85 && !isZoomComplete) {
      setIsZoomComplete(true);
    } else if (latest <= 0.85 && isZoomComplete) {
      setIsZoomComplete(false);
    }
  });

  const scaleDesktopCenter = useTransform(scrollYProgress, [0, 0.85], [1, 4]);
  const scaleMobileCenter = useTransform(scrollYProgress, [0, 0.85], [1, 2]);
  
  const scale5 = useTransform(scrollYProgress, [0, 0.85], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 0.85], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 0.85], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 0.85], [1, 9]);
  
  const scales = [isMobile ? scaleMobileCenter : scaleDesktopCenter, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[350vh] md:h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#090d12]">
        <ProjectSlider images={images} isVisible={isZoomComplete} />
        
        <div className={`transition-opacity duration-500 ${isZoomComplete ? 'opacity-0' : 'opacity-100'}`}>
          {images.map(({ src, alt, title, description }, index) => {
            const scale = scales[index % scales.length];
            return (
              <motion.div
                key={`${src}-${index}`}
                style={{ scale }}
                className={`absolute top-0 flex h-full w-full items-center justify-center will-change-transform ${
                  index === 1
                    ? "[&>div]:!-top-[43vh] [&>div]:!left-[10vw] [&>div]:!h-[35vh] [&>div]:!w-[32vw] md:[&>div]:!-top-[30vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[30vh] md:[&>div]:!w-[35vw]"
                    : ""
                } ${
                  index === 2
                    ? "[&>div]:!-top-[8vh] [&>div]:!-left-[42vw] [&>div]:!h-[45vh] [&>div]:!w-[24vw] md:[&>div]:!-top-[10vh] md:[&>div]:!-left-[25vw] md:[&>div]:!h-[45vh] md:[&>div]:!w-[20vw]"
                    : ""
                } ${
                  index === 3
                    ? "[&>div]:!top-[2vh] [&>div]:!left-[44vw] [&>div]:!h-[22vh] [&>div]:!w-[28vw] md:[&>div]:!left-[27.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[25vw]"
                    : ""
                } ${
                  index === 4
                    ? "[&>div]:!top-[37vh] [&>div]:!-left-[28vw] [&>div]:!h-[22vh] [&>div]:!w-[35vw] md:[&>div]:!top-[27.5vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[20vw]"
                    : ""
                } ${
                  index === 5
                    ? "[&>div]:!top-[40vh] [&>div]:!left-[10vw] [&>div]:!h-[28vh] [&>div]:!w-[24vw] md:[&>div]:!top-[27.5vh] md:[&>div]:!-left-[22.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[30vw]"
                    : ""
                } ${
                  index === 6
                    ? "[&>div]:!top-[35vh] [&>div]:!left-[35vw] [&>div]:!h-[18vh] [&>div]:!w-[18vw] md:[&>div]:!top-[22.5vh] md:[&>div]:!left-[25vw] md:[&>div]:!h-[15vh] md:[&>div]:!w-[15vw]"
                    : ""
                }`}
              >
                <div className="group relative h-[50vh] w-[50vw] overflow-hidden rounded-xs shadow-[0_40px_100px_rgba(0,0,0,0.35)] md:h-[25vh] md:w-[25vw]">
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={alt || `Parallax image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 65vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  {(title || description) && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-2 pb-2 pt-6 md:px-4 md:pb-4 md:pt-10 text-white">
                      {title && (
                        <h3 className="text-[0.6rem] sm:text-[0.65rem] md:text-sm font-semibold tracking-[0.02em] leading-tight">
                          {title}
                        </h3>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
