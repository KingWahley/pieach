'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

// Replace with your project data
const images = [
  {
    src: 'https://pieach.com/wp-content/uploads/2023/10/PJ18101-4.jpg',
    alt: 'uba structure',
    title: 'UBA Ghana Head Office',
    description: 'Accra, Ghana',
  },
  {
    src: 'https://pieach.com/wp-content/uploads/2022/10/c2-2-scaled.jpg',
    alt: 'Urban cityscape at sunset',
    title: 'Temple Road',
    description: 'Ikoyi, Lagos, Nigeria.',
  },
  {
    src: 'https://pieach.com/wp-content/uploads/2023/11/PJ7115B_3-scaled.jpg',
    alt: 'Abstract geometric pattern',
    title: 'Meliora Residential Tower',
    description: 'Gerrard Road, Ikoyi, Lagos',
  },
  {
    src: 'https://pieach.com/wp-content/uploads/2023/11/PJ7115A_3.jpg',
    alt: 'Modern architecture building',
    title: 'West Foster Apartments',
    description: 'Ikoyi, Lagos, Nigeria',
  },
  {
    src: 'https://pieach.com/wp-content/uploads/2023/11/9108-1-scaled.jpg',
    alt: 'Mountain landscape',
    title: 'The Sphere',
    description: 'Victoria Island, Lagos, Nigeria',
  },
  {
    src: 'https://pieach.com/wp-content/uploads/2023/11/PJ13107_2-scaled.jpg',
    alt: 'Minimalist design elements',
    title: 'Falomo Shopping Center',
    description: 'Ikoyi, Lagos State, Nigeria',
  },
  {
    src: 'https://pieach.com/wp-content/uploads/2023/10/PJ17106-2-scaled.jpg',
    alt: 'Ocean waves and beach',
    title: 'Abeokuta Shopping Centre',
    description: 'Abeokuta, Ogun State, Nigeria.',
  },
];

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
      <ZoomParallax images={images} />
    </section>
  );
}
