// app/(public)/book-appointment/page.js
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { supabase } from "@/lib/supabase/client";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BookAppointmentPage() {
  const [selectedService, setSelectedService] = useState("Architectural Consultation");
  const [meetingFormat, setMeetingFormat] = useState("virtual"); // "virtual" or "physical"
  const [projectContext, setProjectContext] = useState("commercial"); // "residential", "commercial", "hospitality"
  const [selectedDate, setSelectedDate] = useState(5); // October 5th (Sunday)
  const [selectedTime, setSelectedTime] = useState("11:30 AM");
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    projectLocation: "",
    phoneNumber: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pageContainerRef = useRef(null);

  const timeSlots = ["09:00 AM", "11:30 AM", "02:00 PM", "04:00 PM"];

  // Calendar cells for October 2026 (starting on Wednesday, Oct 1st)
  // Mon, Tue are blank offsets
  const calendarDays = [
    { day: "", disabled: true },
    { day: "", disabled: true },
    { day: 1, disabled: false },
    { day: 2, disabled: false },
    { day: 3, disabled: false },
    { day: 4, disabled: false },
    { day: 5, disabled: false }, // Oct 5th
    { day: 6, disabled: false },
    { day: 7, disabled: false },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.emailAddress || !formData.phoneNumber) {
      alert("Please enter your name, email address, and phone number.");
      return;
    }

    setIsSubmitting(true);

    const formattedDate = `2026-10-${selectedDate.toString().padStart(2, "0")}`;

    try {
      const { error } = await supabase
        .from('appointments')
        .insert([{
          id: `appt_${Date.now()}`,
          client_name: formData.fullName,
          client_email: formData.emailAddress,
          client_phone: formData.phoneNumber,
          preferred_date: formattedDate,
          preferred_time: selectedTime,
          service: selectedService,
          message: `Format: ${meetingFormat}. Context: ${projectContext}. Location: ${formData.projectLocation}. Description: ${formData.description}`,
          status: 'Pending',
          date: new Date().toISOString().split('T')[0]
        }]);

      if (error) {
        alert("Booking failed: " + error.message);
      } else {
        setSubmitted(true);
        setFormData({
          fullName: "",
          emailAddress: "",
          projectLocation: "",
          phoneNumber: "",
          description: "",
        });
        setTimeout(() => {
          setSubmitted(false);
        }, 6000);
      }
    } catch (err) {
      alert("An error occurred during booking: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(() => {
    if (!pageContainerRef.current) return;

    const tl = gsap.timeline();

    // 1. Left Side: Background image zoom-out curtain effect
    tl.fromTo(
      ".appt-bg-img",
      { scale: 1.12, opacity: 0 },
      { scale: 1.0, opacity: 0.85, duration: 1.5, ease: "power2.out" }
    )
    // 2. Left Side: Text details glide in
    .fromTo(
      ".appt-left-tag",
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=1.0"
    )
    .fromTo(
      ".appt-left-title",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      "-=0.8"
    )
    // 3. Right Side: Waterfall form fields staggers
    .fromTo(
      ".appt-right-header",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(
      ".appt-form-group",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
      "-=0.4"
    );
  }, { scope: pageContainerRef });

  return (
    <div ref={pageContainerRef} className="bg-white text-neutral-900">
      
      {/* 50/50 Split Screen Section */}
      <div className="relative flex flex-col lg:flex-row min-h-screen mb-12 lg:mb-20">
        
        {/* Left Side: Sticky Image, 100vh */}
        <div className="lg:w-1/2 lg:h-screen lg:sticky lg:top-0 relative h-[400px] sm:h-[500px] bg-neutral-900 overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-16 lg:pt-32 z-10">
          {/* Background image with pool reflection */}
          <div 
            className="appt-bg-img absolute inset-0 bg-cover bg-center opacity-85 mix-blend-luminosity"
            style={{ backgroundImage: "url('/assets/templo_road.png')" }}
          />
          <div className="absolute inset-0 bg-neutral-950/20 z-0" />

          {/* Top tagline: PIEACH MANIFESTO */}
          <div className="relative z-10">
            <span className="appt-left-tag font-sans font-bold text-[10px] tracking-[0.3em] text-white/80 uppercase block">
              PIEACH MANIFESTO
            </span>
          </div>

          {/* Center-left typography */}
          <div className="relative z-10 max-w-md mt-auto lg:mb-10">
            <h2 className="appt-left-title font-serif text-white text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight">
              Designing<br />
              Spaces With<br />
              Purpose
            </h2>
          </div>
        </div>

        {/* Right Side: Appointment Form */}
        <div className="lg:w-1/2 bg-white p-8 sm:p-12 lg:p-16 lg:pt-32 flex flex-col justify-center">
          <div className="max-w-xl w-full mx-auto space-y-10">
            
            {/* Title & Description */}
            <div className="appt-right-header">
              <h1 className="font-serif text-3xl sm:text-4xl text-neutral-950 tracking-tight mb-3">
                Book an Appointment
              </h1>
              <p className="font-sans text-neutral-500 text-xs sm:text-sm leading-relaxed font-light">
                Reserve a dedicated session with our lead architects to discuss your spatial vision and project requirements.
              </p>
            </div>

            {submitted && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-sm text-xs">
                <strong>Appointment Request Sent!</strong> We have logged your request for an <strong>{selectedService}</strong> ({meetingFormat === "virtual" ? "Virtual" : "Physical"}) on <strong>October {selectedDate}, 2026</strong> at <strong>{selectedTime}</strong>. Confirmation coordinates will be sent via email.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* SELECT SERVICE */}
              <div className="appt-form-group space-y-2">
                <label className="block font-sans font-bold text-[9px] uppercase tracking-[0.2em] text-brand-gold">
                  SELECT SERVICE
                </label>
                <div className="relative">
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full border border-neutral-200 bg-white px-4 py-3.5 text-xs text-neutral-800 rounded-sm focus:outline-none focus:border-brand-gold appearance-none cursor-pointer"
                  >
                    <option value="Architectural Consultation">Architectural Consultation</option>
                    <option value="Interior Design Consultation">Interior Design Consultation</option>
                    <option value="Landscape Planning">Landscape Planning</option>
                    <option value="Project Feasibility Study">Project Feasibility Study</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* MEETING FORMAT */}
              <div className="appt-form-group space-y-2">
                <label className="block font-sans font-bold text-[9px] uppercase tracking-[0.2em] text-brand-gold">
                  MEETING FORMAT
                </label>
                <div className="flex border-b border-neutral-200/80">
                  <button
                    type="button"
                    onClick={() => setMeetingFormat("virtual")}
                    className={`flex-1 pb-3 text-center text-[10px] font-bold uppercase tracking-widest transition duration-200 cursor-pointer
                      ${meetingFormat === "virtual" 
                        ? "border-b-2 border-brand-brown text-neutral-950 font-bold" 
                        : "text-neutral-400 hover:text-neutral-600"
                      }
                    `}
                  >
                    Virtual Meeting
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeetingFormat("physical")}
                    className={`flex-1 pb-3 text-center text-[10px] font-bold uppercase tracking-widest transition duration-200 cursor-pointer
                      ${meetingFormat === "physical" 
                        ? "border-b-2 border-brand-brown text-neutral-950 font-bold" 
                        : "text-neutral-400 hover:text-neutral-600"
                      }
                    `}
                  >
                    Physical Meeting
                  </button>
                </div>
              </div>

              {/* PROJECT CONTEXT */}
              <div className="appt-form-group space-y-2">
                <label className="block font-sans font-bold text-[9px] uppercase tracking-[0.2em] text-brand-gold">
                  PROJECT CONTEXT
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {/* Residential Card */}
                  <button
                    type="button"
                    onClick={() => setProjectContext("residential")}
                    className={`flex flex-col items-center justify-center p-4 border rounded-sm transition duration-300 hover:scale-105 active:scale-[0.98] cursor-pointer
                      ${projectContext === "residential"
                        ? "bg-brand-brown border-brand-brown text-brand-gold"
                        : "bg-[#fafafa]/80 border-neutral-200/70 text-neutral-500 hover:border-neutral-300"
                      }
                    `}
                  >
                    <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span className="text-[8px] font-bold uppercase tracking-wider">Residential</span>
                  </button>

                  {/* Commercial Card */}
                  <button
                    type="button"
                    onClick={() => setProjectContext("commercial")}
                    className={`flex flex-col items-center justify-center p-4 border rounded-sm transition duration-300 hover:scale-105 active:scale-[0.98] cursor-pointer
                      ${projectContext === "commercial"
                        ? "bg-brand-brown border-brand-brown text-brand-gold"
                        : "bg-[#fafafa]/80 border-neutral-200/70 text-neutral-500 hover:border-neutral-300"
                      }
                    `}
                  >
                    <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <rect x="4" y="4" width="16" height="16" rx="1" />
                      <path d="M9 9h2M9 13h2M13 9h2M13 13h2" />
                    </svg>
                    <span className="text-[8px] font-bold uppercase tracking-wider">Commercial</span>
                  </button>

                  {/* Hospitality Card */}
                  <button
                    type="button"
                    onClick={() => setProjectContext("hospitality")}
                    className={`flex flex-col items-center justify-center p-4 border rounded-sm transition duration-300 hover:scale-105 active:scale-[0.98] cursor-pointer
                      ${projectContext === "hospitality"
                        ? "bg-brand-brown border-brand-brown text-brand-gold"
                        : "bg-[#fafafa]/80 border-neutral-200/70 text-neutral-500 hover:border-neutral-300"
                      }
                    `}
                  >
                    <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5M7.5 21H3.75M3.75 21V6.545m0 0H7.5" />
                    </svg>
                    <span className="text-[8px] font-bold uppercase tracking-wider">Hospitality</span>
                  </button>
                </div>
              </div>

              {/* SELECT DATE */}
              <div className="appt-form-group space-y-2">
                <div className="flex justify-between items-end">
                  <label className="block font-sans font-bold text-[9px] uppercase tracking-[0.2em] text-brand-gold">
                    SELECT DATE
                  </label>
                  <span className="font-sans font-bold text-[9px] uppercase tracking-[0.2em] text-brand-gold">
                    OCTOBER 2026
                  </span>
                </div>
                
                <div className="border border-neutral-200/80 rounded-sm overflow-hidden bg-white">
                  {/* Grid Header Days */}
                  <div className="grid grid-cols-7 border-b border-neutral-100 bg-[#fafafa]/50 text-center py-2 text-[8px] font-bold uppercase tracking-wider text-neutral-400">
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span>F</span>
                    <span>S</span>
                    <span>S</span>
                  </div>

                  {/* Grid Days */}
                  <div className="grid grid-cols-7 text-center">
                    {calendarDays.map((cell, idx) => {
                      const isSelected = cell.day === selectedDate;
                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={cell.disabled}
                          onClick={() => cell.day && setSelectedDate(cell.day)}
                          className={`py-3.5 text-[11px] font-medium transition border-r border-b border-neutral-100/70 last:border-r-0 cursor-pointer
                            ${cell.disabled ? "text-neutral-200 cursor-default" : "text-neutral-700 hover:bg-neutral-50"}
                            ${isSelected ? "bg-brand-brown text-brand-gold font-bold hover:bg-brand-brown" : ""}
                          `}
                        >
                          {cell.day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* AVAILABLE SLOTS */}
              <div className="appt-form-group space-y-2">
                <label className="block font-sans font-bold text-[9px] uppercase tracking-[0.2em] text-brand-gold">
                  AVAILABLE SLOTS
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 text-center text-[10px] tracking-wider rounded-sm transition font-medium border cursor-pointer
                          ${isSelected 
                            ? "bg-brand-brown border-brand-brown text-brand-gold font-bold" 
                            : "bg-white border-neutral-200 text-neutral-600 hover:border-brand-gold hover:text-brand-gold"
                          }
                        `}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* INPUT FIELDS */}
              <div className="appt-form-group space-y-4 pt-4 border-t border-neutral-200/60">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="FULL NAME"
                    className="w-full px-4 py-3 border border-neutral-200 bg-white text-neutral-800 text-[10px] tracking-widest rounded-sm focus:outline-none focus:border-brand-gold placeholder-neutral-400"
                  />
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    required
                    placeholder="EMAIL ADDRESS"
                    className="w-full px-4 py-3 border border-neutral-200 bg-white text-neutral-800 text-[10px] tracking-widest rounded-sm focus:outline-none focus:border-brand-gold placeholder-neutral-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="projectLocation"
                    value={formData.projectLocation}
                    onChange={handleInputChange}
                    required
                    placeholder="PROJECT LOCATION"
                    className="w-full px-4 py-3 border border-neutral-200 bg-white text-neutral-800 text-[10px] tracking-widest rounded-sm focus:outline-none focus:border-brand-gold placeholder-neutral-400"
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="PHONE NUMBER"
                    className="w-full px-4 py-3 border border-neutral-200 bg-white text-neutral-800 text-[10px] tracking-widest rounded-sm focus:outline-none focus:border-brand-gold placeholder-neutral-400"
                  />
                </div>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="PROJECT DESCRIPTION & VISION"
                  className="w-full px-4 py-3 border border-neutral-200 bg-white text-neutral-800 text-[10px] tracking-widest rounded-sm focus:outline-none focus:border-brand-gold placeholder-neutral-400"
                />
              </div>

              {/* Submit Button */}
              <div className="appt-form-group">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-brown py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-brand-gold hover:text-brand-navy transition duration-300 shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "SCHEDULING..." : "Schedule Consultation"}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>

      {/* Global CTA Section */}
      <CTASection />

    </div>
  );
}
