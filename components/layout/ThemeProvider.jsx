'use client';

import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import SmoothScroll from './SmoothScroll';

export default function ThemeProvider({ children }) {
  // This component just initializes the theme on mount
  useTheme(); 
  
  return (
    <SmoothScroll>
      {children}
    </SmoothScroll>
  );
}
