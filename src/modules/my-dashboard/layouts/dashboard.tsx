import { Card } from '@/components/ui/card';
import { PerformanceBarChart } from '../components/charts/performanceBarChart';
import { StatsCard } from '../components/cards/statsCard';
import { Sparkles, User2, SquareLibrary, PenBox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotificationsTable } from '../components/tables/notifications';
// import { TopPerformersTable } from '../components/tables/topPerformers';

export const MyDashboard = () => {
  return (
    <main>
      <h1>Quick Overview</h1>
      <section className='mt-4 flex max-lg:flex-col flex-row gap-4 max-lg:mb-5'>
        <PerformanceBarChart />
        <Card className='grid grid-cols-2 gap-4 w-full px-4 max-lg:w-full lg:max-w-md'>
          <StatsCard Icon={User2} stat={10} title='Total Exam Taken' />
          <StatsCard Icon={User2} stat={10} title='Total Exam Taken' />
          <StatsCard Icon={User2} stat={10} title='Total Exam Taken' />
          <StatsCard Icon={User2} stat={10} title='Total Exam Taken' />
        </Card>
      </section>
      <div className='flex flex-row gap-2 items-center mt-3'>
        <Button>
          <Sparkles scale={16} />
          <p>AI Examiner</p>
        </Button>
        <Button>
          <SquareLibrary scale={16} />
          <p>My Exams</p>
        </Button>
        <Button>
          <PenBox scale={16} />
          <p>Mock Exams</p>
        </Button>
      </div>
      <div className='mt-5'>
        {/* <TopPerformersTable/> */}
        <NotificationsTable />
      </div>
    </main>
  );
};
