"use client"
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    brand: 'all',
    minPrice: '0',
    maxPrice: '100000',
    search: '',
    sort: 'newest',
    page: 1
  });

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      category: 'all',
      brand: 'all',
      minPrice: '0',
      maxPrice: '100000',
      search: '',
      sort: 'newest',
      page: 1
    });
  }, []);

  const setPage = useCallback((page) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const value = useMemo(
    () => ({
      filters,
      updateFilter,
      updateFilters,
      clearFilters,
      setPage
    }),
    [filters, updateFilter, updateFilters, clearFilters, setPage]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return context;
};
