"use client";

import { useState } from "react";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Residential",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      projectType: "Residential",
      message: "",
    });
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white text-neutral-900 pt-20">
      
      {/* 1. Hero Section */}
      <section className="relative h-[85vh] min-h-[550px] flex items-center bg-neutral-950 text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-65 scale-102"
          style={{ backgroundImage: "url('/assets/hero_background.png')" }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/20" />

        {/* Content Container */}
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-12">
          <div className="max-w-3xl space-y-6">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight tracking-tight text-white">
              Let's Build Something<br />Exceptional
            </h1>
            <p className="font-sans text-neutral-300 text-sm sm:text-base md:text-lg max-w-xl font-light leading-relaxed">
              Connect with Pieach to discuss architecture, interiors, landscapes, and visionary spaces designed with purpose.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center bg-brand-brown hover:bg-brand-brown-hover text-white text-[10px] font-bold uppercase tracking-widest px-8 py-4 transition duration-300 shadow-md rounded-none"
              >
                BOOK AN APPOINTMENT
              </Link>
              <a
                href="#inquiry-section"
                className="inline-flex items-center justify-center border border-white text-white text-[10px] font-bold uppercase tracking-widest px-8 py-4 transition duration-300 hover:bg-white hover:text-neutral-950 shadow-md rounded-none"
              >
                SEND AN INQUIRY
              </a>
            </div>
          </div>
        </div>

        {/* Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 z-20">
          <span className="font-sans font-bold text-[9px] uppercase tracking-[0.3em] text-white/50">
            OFFICES
          </span>
          <svg className="w-4 h-4 text-white/50 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* 2. Get In Touch Narrative Section */}
      <section className="bg-white text-neutral-900 py-24 border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Left Column: Section Title */}
            <div className="lg:col-span-4">
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-brown font-normal uppercase tracking-wide leading-tight">
                GET IN TOUCH
              </h2>
            </div>
            
            {/* Right Column: Paragraph */}
            <div className="lg:col-span-8 max-w-3xl">
              <p className="font-serif text-neutral-750 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
                At PIEACH, we believe that every structure starts with a conversation. Our collaborative approach across the African continent ensures that each project is a bespoke reflection of its environment and the people who inhabit it. We combine technical rigor with an editorial eye for detail to deliver spaces that transcend the ordinary.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Details & Form Section */}
      <section id="inquiry-section" className="bg-[#F9F7F5] py-24 border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Details Column */}
            <div className="lg:col-span-5 space-y-10">
              <h3 className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold pb-4 border-b border-brand-brown/10">
                CONNECT / DETAILS
              </h3>
              
              <div className="divide-y divide-brand-brown/10">
                <div className="flex justify-between items-baseline py-5">
                  <span className="font-sans font-semibold text-[10px] tracking-widest text-[#B5A898] uppercase">Studio</span>
                  <span className="font-serif text-base text-brand-brown font-medium">LAGOS, NIGERIA</span>
                </div>
                
                <div className="flex justify-between items-baseline py-5">
                  <span className="font-sans font-semibold text-[10px] tracking-widest text-[#B5A898] uppercase">Email</span>
                  <a href="mailto:studio@pieach.com" className="font-serif text-base text-brand-brown font-medium hover:text-brand-gold transition duration-200">
                    studio@pieach.com
                  </a>
                </div>

                <div className="flex justify-between items-baseline py-5">
                  <span className="font-sans font-semibold text-[10px] tracking-widest text-[#B5A898] uppercase">Phone</span>
                  <a href="tel:+2348095456434" className="font-serif text-base text-brand-brown font-medium hover:text-brand-gold transition duration-200">
                    +234 80 9545 6434
                  </a>
                </div>

                <div className="flex justify-between items-baseline py-5">
                  <span className="font-sans font-semibold text-[10px] tracking-widest text-[#B5A898] uppercase">Press</span>
                  <a href="mailto:press@pieach.com" className="font-serif text-base text-brand-brown font-medium hover:text-brand-gold transition duration-200">
                    press@pieach.com
                  </a>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="flex gap-4 pt-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 h-12 flex items-center justify-center border border-brand-brown/30 text-[10px] font-bold uppercase tracking-widest text-brand-brown hover:bg-brand-brown hover:text-white transition duration-300 rounded-none gap-2"
                >
                  INSTAGRAM
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 h-12 flex items-center justify-center border border-brand-brown/30 text-[10px] font-bold uppercase tracking-widest text-brand-brown hover:bg-brand-brown hover:text-white transition duration-300 rounded-none gap-2"
                >
                  LINKEDIN
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 space-y-8">
              <h3 className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-brand-gold pb-4 border-b border-brand-brown/10">
                PROJECT INQUIRY FORM
              </h3>

              {submitted && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-none text-sm font-sans">
                  <strong>Thank you!</strong> Your project inquiry has been received. Our studio will review it and get in touch with you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8 pt-4">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-wider text-[#B5A898] mb-1">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full py-2 bg-transparent border-b border-brand-brown/20 text-sm text-brand-brown placeholder-neutral-400 focus:outline-none focus:border-brand-gold transition duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-[#B5A898] mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full py-2 bg-transparent border-b border-brand-brown/20 text-sm text-brand-brown placeholder-neutral-400 focus:outline-none focus:border-brand-gold transition duration-200"
                    />
                  </div>
                </div>

                {/* Project Type Selector */}
                <div className="relative">
                  <label htmlFor="projectType" className="block text-[10px] font-bold uppercase tracking-wider text-[#B5A898] mb-1">
                    PROJECT TYPE
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full py-2 bg-transparent border-b border-brand-brown/20 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition duration-200 appearance-none cursor-pointer"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Interior Architecture">Interior Architecture</option>
                    <option value="Landscape Design">Landscape Design</option>
                    <option value="Master Planning">Master Planning</option>
                    <option value="Project Management">Project Management</option>
                  </select>
                  <div className="absolute right-0 bottom-3 pointer-events-none text-[#B5A898]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>

                {/* Project Brief Textarea */}
                <div>
                  <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-wider text-[#B5A898] mb-1">
                    PROJECT BRIEF
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Briefly describe the site and vision..."
                    className="w-full py-2 bg-transparent border-b border-brand-brown/20 text-sm text-brand-brown placeholder-neutral-400 focus:outline-none focus:border-brand-gold transition duration-200 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-64 h-12 flex items-center justify-center bg-[#0E0807] hover:bg-brand-brown text-white text-[10px] font-bold uppercase tracking-widest transition duration-300 rounded-none gap-2"
                  >
                    SUBMIT REQUEST
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Quote Section */}
      <section className="bg-brand-brown text-white py-20 lg:py-24 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <span className="font-serif text-6xl text-brand-gold leading-none block mb-6 font-normal">
            &#8222;
          </span>
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-relaxed max-w-3xl">
            "Architecture is the thoughtful balance between vision, people, and place."
          </blockquote>
          <div className="w-16 h-[1px] bg-brand-gold mt-8" />
        </div>
      </section>

      {/* 5. Bottom CTA Section */}
      <CTASection />

    </div>
  );
}
