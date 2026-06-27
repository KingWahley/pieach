'use client';

import { useState, useMemo } from 'react';

export function useFilterSort(data = [], initialFilters = {}, initialSort = { key: 'date', order: 'desc' }) {
  const [filters, setFilters] = useState(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState(initialSort);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((item) => {
        return Object.values(item).some(
          (val) => val && typeof val === 'string' && val.toLowerCase().includes(lowerQuery)
        );
      });
    }

    // Filter
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter((item) => item[key] === value);
      }
    });

    // Sort
    if (sortConfig && sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.order === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.order === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [data, filters, searchQuery, sortConfig]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setSearchQuery('');
  };

  const requestSort = (key) => {
    let order = 'asc';
    if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'desc';
    }
    setSortConfig({ key, order });
  };

  return {
    filteredAndSortedData,
    filters,
    searchQuery,
    sortConfig,
    setSearchQuery,
    updateFilter,
    clearFilters,
    requestSort,
  };
}
