'use client';

import { StatsCard } from '@/modules/my-dashboard/components/cards/statsCard';
import { ChartSpline } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PerformanceTable } from '../components/tables/performanceTable';
import { useResultService } from '../services';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const MyPerformance = () => {
  const router = useRouter();
  const { data, isLoading } = useResultService();
  return (
    <Card className='p-2'>
      <section className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
        <StatsCard
          Icon={ChartSpline}
          stat={data?.totalExams ?? 0}
          title='Total Exams Taken'
        />
        <StatsCard
          Icon={ChartSpline}
          stat={`${Math.round(data?.averageScore ?? 0)}%`}
          title='Average Score'
        />
        <StatsCard
          Icon={ChartSpline}
          stat={data?.totalQuestions ?? 0}
          title='Total Questions'
        />
        <StatsCard
          Icon={ChartSpline}
          stat={data?.totalPassed ?? 0}
          title='Total passed Questions'
        />
      </section>
      <div>
        {(data?.data.length ?? 0) <= 0 ? (
          <main className='text-center flex justify-center items-center w-full flex-col gap-5 mt-5 mb-10'>
            <h1 className='text-3xl'>
              Take an exam so we could calculate your performance.
            </h1>
            <h1 className='text-6xl animate-bounce mt-15'>🐣</h1>
            <Button onClick={() => router.push('/mock-exams')}>
              Take an exam
            </Button>
          </main>
        ) : (
          <PerformanceTable loading={isLoading} data={data?.data} />
        )}
      </div>
    </Card>
  );
};
