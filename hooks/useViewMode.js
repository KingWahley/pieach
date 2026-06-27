import { useState } from 'react';

/**
 * Standardized hook for managing list/grid view state across the CMS.
 * Defaults to 'list' view as per architectural requirements.
 * 
 * @param {string} initialMode - Optional override for the initial view mode
 * @returns {[string, function]} - [viewMode, setViewMode]
 */
export function useViewMode(initialMode = 'list') {
  const [viewMode, setViewMode] = useState(initialMode);
  return [viewMode, setViewMode];
}
