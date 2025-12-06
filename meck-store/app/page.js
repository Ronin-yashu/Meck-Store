import { Suspense } from 'react';
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Brands from "@/components/Brands";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
        <Categories />
      </Suspense>
      <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
        <FeaturedProducts />
      </Suspense>
      <WhyChooseUs />
      <Testimonials />
      <Brands />
      <FAQ />
    </>
  );
}
