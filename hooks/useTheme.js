'use client';

import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('architectural');

  useEffect(() => {
    const savedTheme = localStorage.getItem('pieach-theme') || 'architectural';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme === 'architectural' ? '' : savedTheme);
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('pieach-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme === 'architectural' ? '' : newTheme);
  };

  return { theme, changeTheme };
}
