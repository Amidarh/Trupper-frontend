import { StatsCard } from '@/modules/my-dashboard/components/cards/statsCard';
import { ChartSpline } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ExamsTable } from '@/modules/exam/components/tables/main';
import { PerformanceTable } from '../components/tables/performanceTable';

export const MyPerformance = () => {
  return (
    <Card className='p-2'>
      <section className='flex flex-row gap-3'>
        <StatsCard Icon={ChartSpline} stat='1000' title='Total Exams Taken' />
        <StatsCard Icon={ChartSpline} stat='1000' title='Average Score' />
        <StatsCard Icon={ChartSpline} stat='1000' title='Total Questions' />
        <StatsCard
          Icon={ChartSpline}
          stat='1000'
          title='Total passed Questions'
        />
      </section>
      <div>
        <PerformanceTable />
      </div>
    </Card>
  );
};
