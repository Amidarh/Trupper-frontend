'use client';

import { useEffect } from 'react';
import { useAltStore } from '@/lib/zustand/userStore';
import Navbar from '@/modules/landing/components/navbar';
import Hero from '@/modules/landing/components/hero';
import Features from '@/modules/landing/components/features';
import FloatingParticles from '@/modules/landing/components/floating-particles';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const organization = useAltStore((state) => state.organization);
  const router = useRouter();

  useEffect(() => {
    if (organization && !organization?.isOnboarded) {
      router.push('/onboarding/personnel');
    }
  }, [organization]);

  return (
    <main className='w-full relative'>
      <FloatingParticles />
      <Navbar />
      <Hero />
      <Features />
    </main>
  );
}
