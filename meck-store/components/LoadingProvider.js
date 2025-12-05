"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import GlobalLoader from './GlobalLoader';

const LoadingProvider = ({ children }) => {
  const [showLoader, setShowLoader] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user has already visited in this session
    const hasVisited = sessionStorage.getItem('hasVisitedSite');
    
    if (hasVisited) {
      // If already visited, don't show loader
      setIsFirstVisit(false);
      setShowLoader(false);
    } else {
      // First visit - show loader
      setIsFirstVisit(true);
      
      // Hide loader after delay
      const timer = setTimeout(() => {
        setShowLoader(false);
        // Mark as visited in session storage
        sessionStorage.setItem('hasVisitedSite', 'true');
      }, 1500); // 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  // If not first visit, render immediately
  if (!isFirstVisit) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && <GlobalLoader key="loader" />}
      </AnimatePresence>
      {!showLoader && children}
    </>
  );
};

export default LoadingProvider;
