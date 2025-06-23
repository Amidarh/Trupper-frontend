'use client';

import { ExamCard } from '../../components/cards/examCard';
import { useMockExamsService } from '@/modules/mock-exams/services';
import { Skeleton } from '@/components/ui/skeleton';

export const MainCards = () => {
  const { data, isLoading } = useMockExamsService();
  return (
    <main>
      <section className='mt-3 flex gap-4 flex-row flex-wrap'>
        {isLoading ? (
          <Skeleton className='w-full h-[200px] max-w-[290px]' />
        ) : data?.length === 0 ? (
          <p className='text-gray-500'>No exams available</p>
        ) : (
          data?.map((card) => <ExamCard key={card.id} data={card} />)
        )}
      </section>
    </main>
  );
};
