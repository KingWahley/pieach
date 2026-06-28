// app/(public)/contact/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ContactHeroSection from "@/components/sections/ContactHeroSection";
import CTASection from "@/components/sections/CTASection";
import { supabase } from "@/lib/supabase/client";

const getSocialIcon = (platform) => {
  const lower = platform.toLowerCase();
  if (lower === 'instagram') {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (lower === 'linkedin') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }
  if (lower === 'x' || lower === 'twitter') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (lower === 'facebook') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    );
  }
  if (lower === 'youtube') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.163c-.272-1.015-1.07-1.813-2.085-2.086C19.578 3.545 12 3.545 12 3.545s-7.578 0-9.413.532c-1.015.273-1.813 1.07-2.086 2.086C0 7.998 0 12 0 12s0 4.002.501 5.837c.273 1.015 1.07 1.813 2.086 2.086 1.835.532 9.413.532 9.413.532s7.578 0 9.413-.532c1.015-.273 1.813-1.07 2.086-2.086C24 16.002 24 12 24 12s0-4.002-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (lower === 'tiktok') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v6.62c.03 1.87-.45 3.79-1.74 5.16-1.28 1.39-3.23 2.1-5.11 2.02-1.88-.02-3.79-.69-5.07-2.06-1.32-1.36-1.87-3.37-1.74-5.26.1-1.89.88-3.77 2.37-4.99 1.43-1.19 3.39-1.75 5.24-1.57v4.02c-1.11-.17-2.3.16-3.08.97-.8.83-1.05 2.08-.8 3.2.22 1.04.99 1.95 2.01 2.21.99.27 2.12.03 2.87-.69.83-.81 1.02-2.09.96-3.22-.03-2.92-.01-5.84-.02-8.76z" />
      </svg>
    );
  }
  if (lower === 'pinterest') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.4 7.63 11.16-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.36-.72-.36-1.77c0-1.66.96-2.9 2.17-2.9 1.02 0 1.51.77 1.51 1.69 0 1.03-.65 2.56-.99 3.99-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.47 0-2.86-2.06-4.86-5-4.86-3.4 0-5.4 2.56-5.4 5.2 0 1.03.4 2.14.9 2.75.1.12.1.22.08.33l-.33 1.35c-.05.2-.18.25-.4.15-1.5-.7-2.45-2.88-2.45-4.63 0-3.78 2.75-7.25 7.9-7.25 4.16 0 7.4 2.97 7.4 6.93 0 4.14-2.6 7.47-6.22 7.47-1.2 0-2.35-.64-2.73-1.38l-.75 2.84c-.27 1.04-1 2.33-1.5 3.11C9.6 23.67 10.77 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
      </svg>
    );
  }
  if (lower === 'whatsapp') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6-1.061 3.525-1.621 5.371-1.62 5.561 0 10.086-4.526 10.089-10.089.002-2.696-1.047-5.232-2.955-7.14C17.247 1.397 14.717.348 12.02.348c-5.568 0-10.1 4.531-10.103 10.099-.001 2.03.529 4.015 1.536 5.757L2.457 20.3l4.19-1.146z" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Residential",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [contactDetails, setContactDetails] = useState(null);

  useEffect(() => {
    async function fetchContactDetails() {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('content')
          .eq('key', 'contact_details')
          .single();
        if (data && data.content) {
          setContactDetails(data.content);
        } else {
          // If no database entry exists yet, fall back to safe defaults
          setContactDetails({
            address: '12 Admiralty Road, Lekki Phase 1, Lagos, Nigeria',
            primaryPhone: '+234 800 000 0000',
            secondaryPhone: '',
            primaryEmail: 'studio@pieach.com',
            supportEmail: 'press@pieach.com',
            googleMapLink: '',
            socialLinks: [
              { platform: 'instagram', url: 'https://instagram.com' },
              { platform: 'linkedin', url: 'https://linkedin.com' }
            ]
          });
        }
      } catch (err) {
        console.error("Error fetching contact details:", err);
      }
    }
    fetchContactDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    const nameParts = formData.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          id: `msg_${Date.now()}`,
          first_name: firstName,
          last_name: lastName,
          email: formData.email,
          phone: '',
          subject: `Project Inquiry: ${formData.projectType}`,
          body: formData.message,
          status: 'Unread',
          date: new Date().toISOString().split('T')[0]
        }]);

      if (error) {
        alert("Failed to submit inquiry: " + error.message);
      } else {
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
      }
    } catch (err) {
      alert("An error occurred: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white text-neutral-900">
      
      {/* 1. Hero Section */}
      <ContactHeroSection />

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
              
              {!contactDetails ? (
                <div className="space-y-6 py-5 animate-pulse">
                  <div className="space-y-2">
                    <div className="h-3 bg-neutral-200 rounded w-1/4"></div>
                    <div className="h-12 bg-neutral-200 rounded w-full"></div>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <div className="h-3 bg-neutral-200 rounded w-1/5"></div>
                    <div className="h-5 bg-neutral-200 rounded w-1/3"></div>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <div className="h-3 bg-neutral-200 rounded w-1/5"></div>
                    <div className="h-5 bg-neutral-200 rounded w-1/3"></div>
                  </div>
                  <div className="flex gap-4 pt-6">
                    <div className="h-12 bg-neutral-200 rounded w-1/2"></div>
                    <div className="h-12 bg-neutral-200 rounded w-1/2"></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-brand-brown/10">
                    <div className="flex flex-col gap-2 py-5">
                      <span className="font-sans font-semibold text-[10px] tracking-widest text-[#B5A898] uppercase">Studio Address</span>
                      <span className="font-serif text-base text-brand-brown font-medium leading-relaxed">
                        {contactDetails.address}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-baseline py-5">
                      <span className="font-sans font-semibold text-[10px] tracking-widest text-[#B5A898] uppercase">Email</span>
                      <a href={`mailto:${contactDetails.primaryEmail}`} className="font-serif text-base text-brand-brown font-medium hover:text-brand-gold transition duration-200">
                        {contactDetails.primaryEmail}
                      </a>
                    </div>

                    <div className="flex flex-col gap-1 py-5">
                      <div className="flex justify-between items-baseline">
                        <span className="font-sans font-semibold text-[10px] tracking-widest text-[#B5A898] uppercase">Phone</span>
                        <a href={`tel:${contactDetails.primaryPhone}`} className="font-serif text-base text-brand-brown font-medium hover:text-brand-gold transition duration-200">
                          {contactDetails.primaryPhone}
                        </a>
                      </div>
                      {contactDetails.secondaryPhone && (
                        <div className="flex justify-between items-baseline pt-1">
                          <span className="font-sans font-semibold text-[10px] tracking-widest text-[#B5A898] uppercase opacity-0">Phone 2</span>
                          <a href={`tel:${contactDetails.secondaryPhone}`} className="font-serif text-sm text-neutral-500 font-medium hover:text-brand-gold transition duration-200">
                            {contactDetails.secondaryPhone}
                          </a>
                        </div>
                      )}
                    </div>

                    {contactDetails.supportEmail && (
                      <div className="flex justify-between items-baseline py-5">
                        <span className="font-sans font-semibold text-[10px] tracking-widest text-[#B5A898] uppercase">Support</span>
                        <a href={`mailto:${contactDetails.supportEmail}`} className="font-serif text-base text-brand-brown font-medium hover:text-brand-gold transition duration-200">
                          {contactDetails.supportEmail}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Social Buttons */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    {contactDetails.socialLinks?.map((link, idx) => {
                      if (!link.url) return null;
                      let href = link.url.trim();
                      if (href.endsWith('...')) {
                        href = href.substring(0, href.length - 3);
                      }
                      if (!href || href === 'https://' || href === 'http://') return null;
                      if (!href.startsWith('http')) {
                        href = `https://${href}`;
                      }

                      return (
                        <a 
                          key={idx}
                          href={href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-grow min-w-[140px] h-12 flex items-center justify-center border border-brand-brown/30 text-[10px] font-bold uppercase tracking-widest text-brand-brown hover:bg-brand-brown hover:text-white transition duration-300 rounded-none gap-2 px-4"
                        >
                          <span className="opacity-85">{getSocialIcon(link.platform)}</span>
                          <span>{link.platform.toUpperCase()}</span>
                          <svg className="w-3 h-3 opacity-65" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </a>
                      );
                    })}
                  </div>
                </>
              )}
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
                    disabled={isSubmitting}
                    className="w-full sm:w-64 h-12 flex items-center justify-center bg-[#0E0807] hover:bg-brand-brown text-white text-[10px] font-bold uppercase tracking-widest transition duration-300 rounded-none gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "SUBMITTING..." : "SUBMIT REQUEST"}
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

      {/* Map Section */}
      {contactDetails?.googleMapLink && (
        <section className="w-full h-[450px] bg-neutral-100 overflow-hidden relative border-b border-neutral-100">
          {contactDetails.googleMapLink.trim().startsWith('<iframe') ? (
            <div 
              className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
              dangerouslySetInnerHTML={{ __html: contactDetails.googleMapLink }}
            />
          ) : (
            <iframe
              src={contactDetails.googleMapLink}
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </section>
      )}

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
