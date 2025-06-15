import { Button } from '@/components/ui/button';
// import { ModeToggle } from "@/core/commons/modeToggle";
import { useRouter } from 'next/navigation';
import { useAltStore } from '@/lib/zustand/userStore';
import Image from 'next/image';

export default function Navbar() {
  const organization = useAltStore((state) => state.organization);
  const route = useRouter();
  return (
    <main className='py-4 px-2 lg:px-5 w-full flex justify-center items-center h-fit fixed'>
      <section className='w-full max-w-7xl bg-white-200 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border shadow-md p-4 flex justify-between items-center'>
        <div
          className='flex flex-row items-center gap-1.5 cursor-pointer'
          onClick={() => route.push('/')}
        >
          {organization?.logo && (
            <Image
              src={organization?.logo || '/default-logo.png'}
              height={30}
              width={30}
              className='size-[30px] rounded-lg text-xs'
              alt={`${organization?.name ?? 'Organization'} logo`}
            />
          )}
          <h2>{organization?.name}</h2>
        </div>

        <div className='flex flex-row items-center gap-2'>
          {/* <ModeToggle/> */}
          <Button onClick={() => route.push('/login')}>Login</Button>
        </div>
      </section>
    </main>
  );
}
