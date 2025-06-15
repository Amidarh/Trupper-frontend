import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='py-4 px-2 lg:px-5 w-full flex justify-center items-center h-fit'>
      <section className='w-full max-w-7xl bg-white-200 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border shadow-md p-4 flex justify-between items-center'>
        <div>
          <h2>Trupper</h2>
        </div>

        <div>
          <Button>Login</Button>
        </div>
      </section>
    </main>
  );
}
