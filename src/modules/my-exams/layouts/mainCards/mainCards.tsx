'use client';

import { ExamCard } from '../../components/cards/examCard';
import { useMockExamsService } from '@/modules/mock-exams/services';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const MainCards = () => {
  const { data, isLoading } = useMockExamsService();
  const router = useRouter();
  return (
    <main>
      <section className='mt-3 flex gap-4 flex-row flex-wrap'>
        {isLoading ? (
          <div className='flex-row flex gap-2'>
            <Skeleton className='w-full h-[200px] max-w-[290px]' />
            <Skeleton className='w-full h-[200px] max-w-[290px]' />
            <Skeleton className='w-full h-[200px] max-w-[290px]' />
          </div>
        ) : data?.length === 0 ? (
          <main className='text-center flex justify-center items-center w-full flex-col gap-5 mt-20'>
            <h1 className='text-3xl'>No exam card for you here.</h1>
            <h1 className='text-6xl animate-bounce mt-15'>🐣</h1>
            <Button onClick={() => router.push('/mock-exams')}>
              Create One
            </Button>
          </main>
        ) : (
          data?.map((card) => <ExamCard key={card.id} data={card} />)
        )}
      </section>
    </main>
  );
};
