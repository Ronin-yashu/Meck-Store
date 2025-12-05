import { Suspense } from 'react';
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
        <FeaturedProducts />
      </Suspense>
    </>
  );
}
