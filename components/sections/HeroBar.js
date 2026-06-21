'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroBar() {
  const { scrollY } = useScroll();
  
  // Transform logic:
  // - As scroll moves from 0 to 100px:
  //   * y (vertical position) moves down by 24px (disappearing into the page crease).
  //   * opacity fades from 100% to 0%.
  const y = useTransform(scrollY, [0, 100], [0, 24]);
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <motion.div
      style={{ y, opacity, x: '-50%' }}
      className="absolute bottom-0 left-1/2 z-10 h-6 w-[min(420px,calc(100%-2rem))] rounded-t-[1.25rem] bg-white"
    />
  );
}
