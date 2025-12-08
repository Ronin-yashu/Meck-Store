"use client";
import { SessionProvider } from "next-auth/react";
import LoadingProvider from "@/components/LoadingProvider";
import ReduxProvider from "@/components/ReduxProvider";
import React from "react";

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <ReduxProvider>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}