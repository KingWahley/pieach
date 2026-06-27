'use client';

import React from 'react';
import { Icons } from './Icons';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalItems,
  pageSize = 7
}) {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-[#DDD5C8] bg-white sticky bottom-0 z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
      <div className="flex items-center text-[11px] text-[#9A8C82]">
        Showing <span className="font-bold text-[#32171B] ml-1 mr-1">{startItem}</span> to <span className="font-bold text-[#32171B] ml-1 mr-1">{endItem}</span> of <span className="font-bold text-[#32171B] ml-1 mr-1">{totalItems}</span> results
        <span className="ml-4 pl-4 border-l border-[#DDD5C8] font-medium text-[#32171B]">Page {currentPage} of {totalPages}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded border border-[#DDD5C8] text-[#32171B] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF7F2] transition-colors"
          aria-label="Previous Page"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            // Only show first, last, and pages around current
            if (
              page === 1 || 
              page === totalPages || 
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`w-8 h-8 text-[11px] font-bold rounded transition-all ${
                    currentPage === page 
                      ? 'bg-[#32171B] text-white' 
                      : 'text-[#32171B] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {page}
                </button>
              );
            } else if (
              page === currentPage - 2 || 
              page === currentPage + 2
            ) {
              return <span key={page} className="text-[#9A8C82] text-[10px]">...</span>;
            }
            return null;
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded border border-[#DDD5C8] text-[#32171B] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF7F2] transition-colors"
          aria-label="Next Page"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
