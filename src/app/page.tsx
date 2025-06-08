"use client"

import { useAltStore } from "@/lib/zustand/userStore";
import Navbar from "@/modules/landing/components/navbar";
import Hero from "@/modules/landing/components/hero";

export default function HomePage() {
  return (
    <main className="w-full">
      <Navbar/>
      <Hero/>
    </main>
  );
}
