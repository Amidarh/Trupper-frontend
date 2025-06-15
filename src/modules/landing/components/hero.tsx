import { Button } from '@/components/ui/button';
import { useAltStore } from '@/lib/zustand/userStore';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const organization = useAltStore((state) => state.organization);
  const route = useRouter();
  return (
    <section className='flex justify-center items-center pt-40 lg:pt-60 px-5'>
      <div className='text-center flex flex-col gap-2 justify-between items-center'>
        <h1 className='text-[3rem] lg:text-[4rem] font-bold'>
          Empowering Education at Every Step
        </h1>
        {/* <h1 className="text-6xl font-bold">Trupper</h1> */}
        <p className='w-full max-w-2xl text-gray-600 dark:text-gray-200 mt-5'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
          aspernatur provident aperiam, dolores quibusdam labore quos mollitia
          dolor eius nam, molestiae sapiente nisi ad quisquam? Explicabo totam
          molestias sapiente exercitationem?
        </p>

        <Button
          className='text-base rounded-full h-12 w-50 mt-3'
          onClick={() =>
            route.push(organization?.enableSignup ? '/sign-up' : '/login')
          }
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}
