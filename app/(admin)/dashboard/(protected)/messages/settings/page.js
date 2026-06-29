'use client';

import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import gsap from 'gsap';
import { supabase } from '@/lib/supabase/client';

const POPULAR_SOCIALS = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'x', label: 'X (Twitter)' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'pinterest', label: 'Pinterest' },
  { value: 'whatsapp', label: 'WhatsApp' }
];

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

export default function EditContactDetailsPage() {
  const [formData, setFormData] = useState({
    address: '12 Admiralty Road, Lekki Phase 1, Lagos, Nigeria',
    primaryPhone: '+234 800 000 0000',
    secondaryPhone: '+234 801 234 5678',
    primaryEmail: 'hello@pieach.com',
    supportEmail: 'enquiries@pieach.com',
    googleMapLink: '',
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/...' },
      { platform: 'facebook', url: 'https://facebook.com/...' },
      { platform: 'x', url: 'https://x.com/...' }
    ]
  });

  const [showPreviewPanel, setShowPreviewPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const panelRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    async function loadContactDetails() {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('content')
          .eq('key', 'contact_details')
          .single();
        if (data && data.content) {
          setFormData(data.content);
        }
      } catch (err) {
        console.error("Error loading contact details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadContactDetails();
  }, []);

  useEffect(() => {
    if (showPreviewPanel) {
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 });
      gsap.fromTo(panelRef.current, 
        { x: '100%' }, 
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      );
    } else {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3 });
      gsap.to(panelRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
    }
  }, [showPreviewPanel]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialChange = (index, value) => {
    const newLinks = [...formData.socialLinks];
    newLinks[index].url = value;
    setFormData(prev => ({ ...prev, socialLinks: newLinks }));
  };

  const handlePlatformChange = (index, platform) => {
    const newLinks = [...formData.socialLinks];
    newLinks[index].platform = platform;
    setFormData(prev => ({ ...prev, socialLinks: newLinks }));
  };

  const addSocialLink = () => {
    setFormData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '' }]
    }));
  };

  const removeSocialLink = (index) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSaveAndPublish = () => {
    setShowPreviewPanel(true);
  };

  const handleProceed = async () => {
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({
          key: 'contact_details',
          content: formData
        });

      if (error) {
        alert('Failed to update contact details: ' + error.message);
      } else {
        setShowPreviewPanel(false);
        alert('Contact details updated and published successfully!');
      }
    } catch (err) {
      alert('An error occurred while saving: ' + err.message);
    }
  };

  if (loading) {
    return (
      <DashboardLayout 
        title="" 
        subtitle="Loading contact details..."
      >
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D5A73F]"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="" 
      subtitle="Update public contact information, map embed, and social media links"
    >
      <div className="contact-settings max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#32171B] mb-1">Edit Contact Details</h1>
            <p className="text-[11px] text-[#9A8C82]">Manage the public contact information displayed on the Pieach website.</p>
          </div>
          <button 
            onClick={handleSaveAndPublish}
            className="bg-[#32171B] text-white px-5 py-2.5 rounded-md text-xs font-bold hover:bg-[#4a2228] transition-colors"
          >
            Save Contact Details
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {/* Primary Contact Info Section */}
          <div className="bg-white border border-[#DDD5C8] rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DDD5C8] bg-[#FAF7F2]">
              <h2 className="text-[11px] font-bold text-[#32171B] tracking-widest uppercase">Primary Contact Information</h2>
            </div>
            <div className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Business Address<span className="text-red-500 ml-0.5">*</span></label>
                <textarea 
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full p-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-xs text-[#1A1410] outline-none focus:border-[#D5A73F] min-h-[100px] resize-none"
                />
                <p className="text-[9px] text-[#9A8C82]">This address will appear on the Contact page and website footer.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Primary Phone Number<span className="text-red-500 ml-0.5">*</span></label>
                  <input 
                    type="text" 
                    value={formData.primaryPhone}
                    onChange={(e) => handleChange('primaryPhone', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-xs text-[#1A1410] outline-none focus:border-[#D5A73F]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Secondary Phone Number</label>
                  <input 
                    type="text" 
                    value={formData.secondaryPhone}
                    onChange={(e) => handleChange('secondaryPhone', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-xs text-[#1A1410] outline-none focus:border-[#D5A73F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Primary Email<span className="text-red-500 ml-0.5">*</span></label>
                  <input 
                    type="email" 
                    value={formData.primaryEmail}
                    onChange={(e) => handleChange('primaryEmail', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-xs text-[#1A1410] outline-none focus:border-[#D5A73F]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Support / Enquiries Email</label>
                  <input 
                    type="email" 
                    value={formData.supportEmail}
                    onChange={(e) => handleChange('supportEmail', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-xs text-[#1A1410] outline-none focus:border-[#D5A73F]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Google Map Embedded Link</label>
                <textarea 
                  value={formData.googleMapLink}
                  onChange={(e) => handleChange('googleMapLink', e.target.value)}
                  placeholder="Paste Google Maps Iframe embed code or link"
                  className="w-full p-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-xs text-[#1A1410] outline-none focus:border-[#D5A73F] min-h-[100px] resize-none"
                />
                <p className="text-[9px] text-[#9A8C82]">Paste the Google Maps embed code so the map can display directly on the Contact page.</p>
              </div>
            </div>
          </div>

          {/* Social Media Links Section */}
          <div className="bg-white border border-[#DDD5C8] rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DDD5C8] bg-[#FAF7F2] flex justify-between items-center">
              <h2 className="text-[11px] font-bold text-[#32171B] tracking-widest uppercase">Social Media Links</h2>
              <button className="text-[10px] text-[#A87E28] hover:underline font-bold">Clear inactive links →</button>
            </div>
            <div className="p-6 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {formData.socialLinks.map((link, index) => {
                  return (
                    <div key={index} className="flex flex-col gap-1.5 relative group">
                      <div className="flex justify-between items-center">
                        <select 
                          value={POPULAR_SOCIALS.some(s => s.value === link.platform) ? link.platform : ''}
                          onChange={(e) => handlePlatformChange(index, e.target.value)}
                          className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider bg-transparent border-b border-transparent focus:border-[#D5A73F] outline-none w-36 cursor-pointer py-0.5"
                        >
                          <option value="" disabled>Select Platform</option>
                          {POPULAR_SOCIALS.map((social) => (
                            <option key={social.value} value={social.value}>
                              {social.label}
                            </option>
                          ))}
                        </select>
                        <button 
                          onClick={() => removeSocialLink(index)}
                          className="text-[9px] text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all font-bold uppercase"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-stretch">
                        <div className="w-10 bg-[#32171B] flex items-center justify-center text-[#D5A73F] rounded-l-md border border-[#32171B] shrink-0">
                          {getSocialIcon(link.platform)}
                        </div>
                        <input 
                          type="text" 
                          value={link.url}
                          onChange={(e) => handleSocialChange(index, e.target.value)}
                          placeholder={`https://${link.platform || 'social'}.com/username`}
                          className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C8] border-l-0 rounded-r-md text-xs text-[#1A1410] outline-none focus:border-[#D5A73F]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={addSocialLink}
                className="mt-2 flex items-center gap-2 text-[10px] font-bold text-[#A87E28] hover:text-[#32171B] transition-colors uppercase tracking-widest border border-dashed border-[#DDD5C8] p-3 rounded-md justify-center"
              >
                <Icons.plus className="w-3 h-3" />
                Add Social Platform
              </button>
            </div>
            <div className="p-6 bg-[#FAF7F2] border-t border-[#DDD5C8] flex justify-end gap-3">
              <button className="px-6 py-2 bg-white border border-[#DDD5C8] rounded-md text-xs font-bold text-[#32171B] hover:bg-gray-50">Cancel</button>
              <button 
                onClick={handleSaveAndPublish}
                className="px-6 py-2 bg-[#32171B] text-white rounded-md text-xs font-bold hover:bg-[#4a2228]"
              >
                Save and Publish
              </button>
            </div>
          </div>
        </div>

        {/* Side Panel Overlay */}
        <div 
          ref={overlayRef}
          className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm opacity-0 invisible"
          onClick={() => setShowPreviewPanel(false)}
        />

        {/* Side Panel: Review and Publish */}
        <div 
          ref={panelRef}
          className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white z-[70] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-[#D5A73F] flex flex-col translate-x-full"
        >
          {/* Header */}
          <div className="p-8 border-b border-[#DDD5C8] bg-[#FAF7F2] relative">
            <button 
              onClick={() => setShowPreviewPanel(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-[#32171B] hover:bg-[#D5A73F] hover:text-white transition-all"
            >
              <Icons.close className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-[#32171B]">Review & Publish</h2>
            <p className="text-[11px] text-[#9A8C82] mt-1 uppercase tracking-wider font-bold">Verification Step</p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 bg-white">
            <div className="mb-8 p-4 bg-[#FFF9E6] border border-[#F5E9C8] rounded-md">
              <p className="text-[12px] text-[#32171B] leading-relaxed">
                <span className="font-bold">Are you sure?</span> These changes will be applied to the public website immediately after you click proceed.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* Address Summary */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D5A73F]" />
                  <h3 className="text-[10px] font-bold text-[#32171B] uppercase tracking-[0.2em]">Studio Address</h3>
                </div>
                <div className="pl-3.5 border-l border-[#F0EBE3]">
                  <p className="text-[13px] text-[#1A1410] leading-relaxed font-medium">
                    {formData.address || 'Not set'}
                  </p>
                </div>
              </section>

              {/* Contact Summary */}
              <section className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D5A73F]" />
                    <h3 className="text-[10px] font-bold text-[#32171B] uppercase tracking-[0.2em]">Phone Numbers</h3>
                  </div>
                  <div className="pl-3.5 border-l border-[#F0EBE3] flex flex-col gap-1">
                    <p className="text-[12px] font-bold text-[#1A1410]">{formData.primaryPhone || 'N/A'}</p>
                    {formData.secondaryPhone && (
                      <p className="text-[12px] text-[#9A8C82]">{formData.secondaryPhone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D5A73F]" />
                    <h3 className="text-[10px] font-bold text-[#32171B] uppercase tracking-[0.2em]">Emails</h3>
                  </div>
                  <div className="pl-3.5 border-l border-[#F0EBE3] flex flex-col gap-1">
                    <p className="text-[12px] font-bold text-[#1A1410]">{formData.primaryEmail || 'N/A'}</p>
                    {formData.supportEmail && (
                      <p className="text-[12px] text-[#9A8C82]">{formData.supportEmail}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Social Links Summary */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D5A73F]" />
                  <h3 className="text-[10px] font-bold text-[#32171B] uppercase tracking-[0.2em]">Social Presence</h3>
                </div>
                <div className="pl-3.5 border-l border-[#F0EBE3] flex flex-wrap gap-2">
                  {formData.socialLinks
                    .filter(link => link.url && link.url !== 'https://' && !link.url.endsWith('...'))
                    .map((link, i) => (
                      <div key={i} className="bg-[#FAF7F2] border border-[#DDD5C8] px-3 py-1 rounded-md text-[10px] font-bold text-[#32171B]">
                        {link.platform.toUpperCase()}
                      </div>
                    ))}
                  {formData.socialLinks.every(link => !link.url || link.url.endsWith('...')) && (
                    <span className="text-[11px] text-[#9A8C82] italic">No active social links</span>
                  )}
                </div>
              </section>

              {/* Map Preview Placeholder */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D5A73F]" />
                  <h3 className="text-[10px] font-bold text-[#32171B] uppercase tracking-[0.2em]">Map Integration</h3>
                </div>
                <div className="aspect-video bg-[#FAF7F2] border border-dashed border-[#DDD5C8] rounded-md flex items-center justify-center p-6 text-center">
                  <p className="text-[10px] text-[#9A8C82] leading-relaxed max-w-[180px]">
                    Interactive map component will be re-initialized with new coordinates.
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-[#DDD5C8] bg-[#FAF7F2] flex flex-col gap-3">
            <button 
              onClick={handleProceed}
              className="w-full py-4 bg-[#32171B] text-white rounded-md text-xs font-bold uppercase tracking-widest hover:bg-[#4a2228] transition-all shadow-lg"
            >
              Confirm and Publish Changes
            </button>
            <button 
              onClick={() => setShowPreviewPanel(false)}
              className="w-full py-4 bg-white border border-[#DDD5C8] text-[#32171B] rounded-md text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
            >
              Back to Editor
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
