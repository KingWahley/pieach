'use client';

import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import gsap from 'gsap';

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
  const panelRef = useRef(null);
  const overlayRef = useRef(null);

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
      socialLinks: [...prev.socialLinks, { platform: 'new', url: '' }]
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

  const handleProceed = () => {
    // Logic to save data would go here
    console.log('Saving data:', formData);
    setShowPreviewPanel(false);
    alert('Contact details updated and published successfully!');
  };

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
                  const initials = link.platform === 'x' ? 'X' : link.platform.substring(0, 2).toUpperCase();
                  const isDefault = ['instagram', 'facebook', 'x'].includes(link.platform) && index < 3;
                  
                  return (
                    <div key={index} className="flex flex-col gap-1.5 relative group">
                      <div className="flex justify-between items-center">
                        {isDefault ? (
                          <label className="text-[9px] font-bold text-[#32171B] uppercase tracking-wider">{link.platform === 'x' ? 'X (Twitter)' : link.platform}</label>
                        ) : (
                          <input 
                            type="text"
                            value={link.platform}
                            onChange={(e) => handlePlatformChange(index, e.target.value)}
                            placeholder="Platform Name"
                            className="text-[9px] font-bold text-[#A87E28] uppercase tracking-wider bg-transparent border-none outline-none w-24"
                          />
                        )}
                        {!isDefault && (
                          <button 
                            onClick={() => removeSocialLink(index)}
                            className="text-[9px] text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all font-bold uppercase"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="flex items-stretch">
                        <div className="w-10 bg-[#32171B] flex items-center justify-center text-[#D5A73F] font-bold text-[11px] rounded-l-md border border-[#32171B]">
                          {initials || '?'}
                        </div>
                        <input 
                          type="text" 
                          value={link.url}
                          onChange={(e) => handleSocialChange(index, e.target.value)}
                          placeholder={`https://...`}
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
