import gsap from 'gsap';

// Basic fade in animation
export const fadeIn = (element, duration = 0.3, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
  );
};

// Staggered list animation
export const staggerFadeIn = (elements, duration = 0.4, stagger = 0.05) => {
  if (!elements || elements.length === 0) return;
  gsap.fromTo(
    elements,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration, stagger, ease: 'power2.out' }
  );
};

// Drawer/Panel slide in
export const slideInRight = (element, duration = 0.4) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { x: '100%', opacity: 0 },
    { x: '0%', opacity: 1, duration, ease: 'power3.out' }
  );
};

export const slideOutRight = (element, duration = 0.3, onComplete) => {
  if (!element) return;
  gsap.to(element, {
    x: '100%',
    opacity: 0,
    duration,
    ease: 'power3.in',
    onComplete
  });
};

// Framer Motion common variants for easy use across components
export const fmVariants = {
  fadeIn: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  },
  slideRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  },
  staggerContainer: {
    animate: { transition: { staggerChildren: 0.05 } },
  },
  staggerItem: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }
};
