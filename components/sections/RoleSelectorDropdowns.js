"use client";

import { useRouter } from "next/navigation";

export default function RoleSelectorDropdowns({ currentSlug, currentLocation, roles }) {
  const router = useRouter();

  const handleRoleChange = (e) => {
    const slug = e.target.value;
    if (slug) {
      router.push(`/careers/${slug}`);
    }
  };

  const handleLocationChange = (e) => {
    const loc = e.target.value;
    // Find the first role in that location and navigate to it
    const matchingRole = roles.find(r => r.location.toLowerCase().includes(loc.toLowerCase()));
    if (matchingRole) {
      router.push(`/careers/${matchingRole.slug}`);
    }
  };

  // Get unique locations
  const locations = Array.from(
    new Set(
      roles.map((r) => {
        const parts = r.location.split(",");
        return parts[parts.length - 1]?.trim() || r.location;
      })
    )
  );

  const currentLocSuffix = currentLocation.split(",").pop()?.trim() || currentLocation;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto my-16 px-4">
      
      {/* Location Select */}
      <div className="relative">
        <label className="block font-sans text-[9px] font-bold tracking-widest text-neutral-400 uppercase mb-2">
          Select Location
        </label>
        <div className="relative">
          <select
            value={currentLocSuffix.toLowerCase()}
            onChange={handleLocationChange}
            className="w-full appearance-none border border-neutral-300 rounded-sm bg-white px-5 py-4 font-sans text-xs font-semibold tracking-wider text-neutral-700 uppercase cursor-pointer focus:border-brand-gold focus:outline-none"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc.toLowerCase()}>
                {loc} Office
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Role Select */}
      <div className="relative">
        <label className="block font-sans text-[9px] font-bold tracking-widest text-neutral-400 uppercase mb-2">
          Select Role
        </label>
        <div className="relative">
          <select
            value={currentSlug}
            onChange={handleRoleChange}
            className="w-full appearance-none border border-neutral-300 rounded-sm bg-white px-5 py-4 font-sans text-xs font-semibold tracking-wider text-neutral-700 uppercase cursor-pointer focus:border-brand-gold focus:outline-none"
          >
            {roles.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.title}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
}
