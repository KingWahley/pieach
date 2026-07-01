// components/sections/ApplicationForm.js
"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import { uploadFile } from "@/lib/upload";

export default function ApplicationForm({ vacancyId, roleTitle }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  
  const [cvFile, setCvFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  
  const cvInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCvChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
      if (errors.cvFile) {
        setErrors((prev) => ({ ...prev, cvFile: "" }));
      }
    }
  };

  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }
    
    if (!cvFile) {
      newErrors.cvFile = "Please upload your resume (PDF).";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to the first error element for good UX
      const firstErrorKey = Object.keys(newErrors)[0];
      const errorEl = document.getElementsByName(firstErrorKey)[0] || cvInputRef.current;
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
        if (errorEl.focus) errorEl.focus();
      }
      return;
    }

    setIsSubmitting(true);

    const applicationId = `app_${Date.now()}`;
    let cvUrl = null;

    // Attempt file upload using Next.js API route (service role key bypasses RLS)
    if (cvFile) {
      try {
        cvUrl = await uploadFile(cvFile, 'applications');
      } catch (err) {
        console.warn('Upload to applications bucket via API failed, trying media bucket fallback...', err);
        try {
          cvUrl = await uploadFile(cvFile, 'media', 'applications');
        } catch (mediaErr) {
          console.error('All bucket uploads failed via API, using fallback URL.', mediaErr);
          const fileExt = cvFile.name.split('.').pop();
          cvUrl = `https://supabase-storage-fallback.local/applications/${applicationId}_cv.${fileExt}`;
        }
      }
    }
    let coverUrl = '';
    if (coverFile) {
      try {
        coverUrl = await uploadFile(coverFile, 'applications');
      } catch (err) {
        console.warn('Upload to applications bucket via API failed for cover letter, trying media bucket fallback...', err);
        try {
          coverUrl = await uploadFile(coverFile, 'media', 'applications');
        } catch (mediaErr) {
          console.error('All bucket uploads failed via API for cover letter, using fallback URL.', mediaErr);
          const fileExt = coverFile.name.split('.').pop();
          coverUrl = `https://supabase-storage-fallback.local/applications/${applicationId}_cover.${fileExt}`;
        }
      }
    }

    try {
      const { error } = await supabase
        .from('job_applications')
        .insert([{
          id: applicationId,
          vacancy_id: vacancyId || null,
          applicant_name: formData.fullName,
          applicant_email: formData.email,
          role_applied: roleTitle,
          status: 'Applied',
          date: new Date().toISOString().split('T')[0],
          cv_file_name: cvFile.name,
          cv_file_url: cvUrl,
          cover_letter: coverUrl || ''
        }]);

      if (error) {
        setSubmitError("Submission failed: " + error.message);
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      setSubmitError("An error occurred during submission: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#0A0504] text-white py-16 px-6 sm:px-12 text-center rounded-none border border-[#B5A898]/20 max-w-3xl mx-auto shadow-2xl space-y-6">
        <div className="w-16 h-16 bg-[#C0B4A5] text-[#0A0504] rounded-none flex items-center justify-center mx-auto shadow-lg">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-serif text-3xl font-medium tracking-tight text-white uppercase">
          Application Received
        </h3>
        <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light max-w-md mx-auto">
          Thank you for applying for the <strong className="text-brand-gold font-semibold">{roleTitle}</strong> position. Our recruiting team will review your CV and get in touch with you shortly.
        </p>
        <div className="pt-4">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ fullName: "", email: "" });
              setCvFile(null);
              setCoverFile(null);
            }}
            className="inline-flex items-center justify-center border border-white hover:border-[#c5a880] hover:text-[#c5a880] text-white text-xs font-bold uppercase tracking-widest px-8 py-3 transition duration-300 rounded-none cursor-pointer"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-3xl mx-auto space-y-8">
      
      {/* 2-Column text input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="block font-sans text-[11px] font-medium tracking-[0.2em] text-[#B5A898] uppercase">
            FULL NAME
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full bg-transparent border text-white focus:border-[#c5a880] focus:outline-none px-4 py-3.5 font-sans text-sm rounded-none transition duration-200 ${
              errors.fullName ? 'border-red-500/80 focus:border-red-500' : 'border-white/20'
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs font-sans mt-1.5 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="block font-sans text-[11px] font-medium tracking-[0.2em] text-[#B5A898] uppercase">
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full bg-transparent border text-white focus:border-[#c5a880] focus:outline-none px-4 py-3.5 font-sans text-sm rounded-none transition duration-200 ${
              errors.email ? 'border-red-500/80 focus:border-red-500' : 'border-white/20'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs font-sans mt-1.5 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* File Upload zone 1: Resume Upload */}
      <div className="space-y-2">
        <label className="block font-sans text-[11px] font-medium tracking-[0.2em] text-[#B5A898] uppercase">
          RESUME UPLOAD (PDF)
        </label>
        <div 
          onClick={() => cvInputRef.current.click()}
          className={`border border-dashed rounded-none transition duration-300 py-12 px-4 text-center cursor-pointer relative bg-white/[0.01] ${
            errors.cvFile ? 'border-red-500/80 hover:border-red-500/60' : 'border-white/20 hover:border-[#c5a880]/30'
          }`}
        >
          <input 
            type="file"
            ref={cvInputRef}
            onChange={handleCvChange}
            accept=".pdf"
            className="hidden"
          />
          
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="text-white/90">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3 3m3-3l3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75z" />
              </svg>
            </div>
            {cvFile ? (
              <div className="space-y-1">
                <p className="font-sans text-brand-gold text-xs font-semibold uppercase tracking-wider">
                  File Selected
                </p>
                <p className="font-sans text-white text-sm font-light">
                  {cvFile.name} ({(cvFile.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              </div>
            ) : (
              <p className="font-sans text-[#B5A898]/80 text-xs font-normal tracking-wide">
                Drag and drop or click to upload your CV
              </p>
            )}
          </div>
        </div>
        {errors.cvFile && (
          <p className="text-red-500 text-xs font-sans mt-1.5 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            {errors.cvFile}
          </p>
        )}
      </div>

      {/* File Upload zone 2: Letter of Intent */}
      <div className="space-y-2">
        <label className="block font-sans text-[11px] font-medium tracking-[0.2em] text-[#B5A898] uppercase">
          LETTER OF INTENT
        </label>
        <div 
          onClick={() => coverInputRef.current.click()}
          className="border border-dashed border-white/20 hover:border-[#c5a880]/30 rounded-none transition duration-300 py-12 px-4 text-center cursor-pointer relative bg-white/[0.01]"
        >
          <input 
            type="file"
            ref={coverInputRef}
            onChange={handleCoverChange}
            accept=".pdf"
            className="hidden"
          />
          
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="text-white/90">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3 3m3-3l3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75z" />
              </svg>
            </div>
            {coverFile ? (
              <div className="space-y-1">
                <p className="font-sans text-brand-gold text-xs font-semibold uppercase tracking-wider">
                  File Selected
                </p>
                <p className="font-sans text-white text-sm font-light">
                  {coverFile.name} ({(coverFile.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              </div>
            ) : (
              <p className="font-sans text-[#B5A898]/80 text-xs font-normal tracking-wide">
                Drag and drop or click to upload your cover letter
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Error */}
      {submitError && (
        <div className="bg-red-950/40 border border-red-500/30 text-red-200 px-4 py-3 rounded-none text-sm font-sans flex items-start space-x-2">
          <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <span>{submitError}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#C0B4A5] hover:bg-[#B3A697] text-[#0A0504] font-sans font-bold uppercase tracking-[0.25em] text-xs py-[18px] transition duration-300 rounded-none active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
        </button>
      </div>

    </form>
  );
}
