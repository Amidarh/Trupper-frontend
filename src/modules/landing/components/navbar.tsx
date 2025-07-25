'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAltStore } from '@/lib/zustand/userStore';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const organization = useAltStore((state) => state.organization);
  const route = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className='py-4 px-2 lg:px-5 w-full flex justify-center items-center h-fit fixed top-0 z-50 transition-all duration-300'>
      <section 
        className={`w-full max-w-7xl rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md border shadow-lg p-4 flex justify-between items-center transition-all duration-300 ${
          scrolled 
            ? 'bg-white/20 border-white/30 shadow-xl' 
            : 'bg-white/10 border-white/20 shadow-md'
        }`}
      >
        <div
          className='flex flex-row items-center gap-2 cursor-pointer group transition-transform duration-300 hover:scale-105'
          onClick={() => route.push('/')}
        >
          {organization?.logo && (
            <div className='relative'>
              <Image
                src={organization?.logo || '/default-logo.png'}
                height={35}
                width={35}
                className='size-[35px] rounded-lg text-xs transition-transform duration-300 group-hover:rotate-12'
                alt={`${organization?.name ?? 'Organization'} logo`}
              />
              <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </div>
          )}
          <h2 className='text-lg font-semibold text-white group-hover:text-purple-200 transition-colors duration-300'>
            {organization?.name || 'Trupper'}
          </h2>
        </div>

        <div className='flex flex-row items-center gap-3'>
          {/* <Button 
            variant='ghost'
            className='text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300'
          >
            Features
          </Button>
          <Button 
            variant='ghost'
            className='text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300'
          >
            Pricing
          </Button>
          <Button 
            variant='ghost'
            className='text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300'
          >
            About
          </Button> */}
          <Button 
            onClick={() => route.push('/login')}
            className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25'
          >
            Login
          </Button>
        </div>
      </section>
    </main>
  );
}
