"use client";
import LoadingProvider from "@/components/LoadingProvider";
import React from "react";
export default function ClientProviders({ children }) {
  return (
    <LoadingProvider>
      {children}
    </LoadingProvider>
  );
}
