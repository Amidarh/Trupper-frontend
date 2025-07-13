'use client';

import { StatsCard } from '@/modules/my-dashboard/components/cards/statsCard';
import { ChartSpline } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PerformanceTable } from '../components/tables/performanceTable';
import { useResultService } from '../services';

export const MyPerformance = () => {
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
        <PerformanceTable loading={isLoading} data={data?.data} />
      </div>
    </Card>
  );
};
