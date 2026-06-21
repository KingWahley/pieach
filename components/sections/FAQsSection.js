"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "What services does Pieach Ltd. offer?",
    answer: "We offer a wide range of services including architectural design, masterplanning, project management, interior design, and landscape design. We work on residential, commercial, hospitality, and civic projects.",
  },
  {
    question: "What type of projects do you specialize in?",
    answer: "We specialize in luxury residential estates, custom commercial offices, high-end hospitality hubs, and large-scale masterplanning urban developments across West Africa.",
  },
  {
    question: "Do you handle both design and project execution?",
    answer: "Yes, our team manages the entire project lifecycle, from initial architectural schematic sketches and detail design drawings to on-site project management, site supervision, and final walkthrough delivery.",
  },
  {
    question: "How does your design process work?",
    answer: "Our process follows 'The Blueprint Journey' consisting of 6 core phases: Discovery (research), Concept (sketches), Planning (detailed layouts & approvals), Technical (specifications), Construction (supervision), and Delivery (walkthrough).",
  },
  {
    question: "Is sustainability part of your design approach?",
    answer: "Absolutely. We prioritize ecological responsibility by integrating passive solar cooling, natural ventilation, water recycling networks, and low-carbon materials in our technical specifications.",
  },
  {
    question: "Can Pieach work on renovation or restoration projects?",
    answer: "Yes, we handle deep renovations and structural transformations for existing commercial and premium residential properties, blending historical context with modern performance standards.",
  },
  {
    question: "Do you work outside Nigeria?",
    answer: "Yes, while our headquarters is located in Lagos, Nigeria, our multi-disciplinary team delivers master planning, architectural designs, and consultation services for clients across the wider West African region.",
  },
];

export default function FAQsSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-white text-neutral-900 py-20 lg:py-24 overflow-hidden border-b border-neutral-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Large FAQ Header */}
        <div className="text-center mb-16">
          <h2 className="font-sans font-black text-6xl sm:text-7xl lg:text-8xl text-neutral-800 tracking-tight leading-none uppercase">
            FAQs
          </h2>
        </div>

        {/* Accordions List */}
        <div className="space-y-4 border-t border-neutral-200">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="border-b border-neutral-200/80 transition-all duration-300"
              >
                {/* Header/Question */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans font-bold text-sm sm:text-base text-neutral-950 group-hover:text-brand-gold transition duration-200">
                    {faq.question}
                  </span>
                  
                  {/* Chevron Icon */}
                  <span className={`ml-4 transform transition-transform duration-300 text-neutral-400 group-hover:text-brand-gold ${
                    isOpen ? "rotate-180" : ""
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>

                {/* Answer Block */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] pb-6 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="font-sans text-neutral-500 text-xs sm:text-sm leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
