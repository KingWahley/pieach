'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

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
