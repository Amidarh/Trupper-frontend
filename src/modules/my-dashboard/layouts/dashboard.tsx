import { Card } from '@/components/ui/card';
import { PerformanceBarChart } from '../components/charts/performanceBarChart';
import { StatsCard } from '../components/cards/statsCard';
import {
  // Sparkles,
  User2,
  SquareLibrary,
  PenBox,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { NotificationsTable } from '../components/tables/notifications';
import { useMyDashboardService } from '../services';
import { EmptyNotification } from '../components/cards/emptyNotification';
// import { NewsCarousel } from '../components/carousel';
import { StartExamCard } from '../components/cards/start';
import { useRouter } from 'next/navigation';
// import { TopPerformersTable } from '../components/tables/topPerformers';

export const MyDashboard = () => {
  const { data } = useMyDashboardService();
  const router = useRouter();
  return (
    <main>
      <h1>Quick Overview</h1>
      {/* <div className='mt-3 mb-4'>
        <NewsCarousel/>
      </div> */}
      {(data?.results?.length ?? 0) <= 0 ? (
        <section className='mt-4 flex flex-row w-full max-lg:mb-5'>
          <StartExamCard />
        </section>
      ) : (
        <section className='mt-4 flex max-lg:flex-col flex-row gap-4 max-lg:mb-5'>
          <PerformanceBarChart data={data?.results} />
          <Card className='grid grid-cols-2 gap-4 w-full px-4 max-lg:w-full lg:max-w-md'>
            <StatsCard
              Icon={User2}
              stat={data?.stats.totalExams ?? 0}
              title='Total Exam Taken'
            />
            <StatsCard
              Icon={User2}
              stat={`${Math.round(data?.stats.averageScore ?? 0)}%`}
              title='Average Score'
            />
            <StatsCard
              Icon={User2}
              stat={Math.round(data?.stats.totalAttemptedQuestions ?? 0)}
              title='Tried Questions'
            />
            <StatsCard
              Icon={User2}
              stat={data?.stats.totalPassedQuestions ?? 0}
              title='Correct Questions'
            />
          </Card>
        </section>
      )}
      <div className='flex flex-row gap-2 items-center mt-3'>
        {/* <Button>
          <Sparkles scale={16} />
          <p>AI Examiner</p>
        </Button> */}
        <Button onClick={() => router.push('/my-exams')}>
          <SquareLibrary scale={16} />
          <p>My Exams</p>
        </Button>
        <Button onClick={() => router.push('/mock-exams')}>
          <PenBox scale={16} />
          <p>Mock Exams</p>
        </Button>
      </div>
      <div className='mt-5'>
        {/* <TopPerformersTable/> */}
        {/* <NotificationsTable /> */}
        <EmptyNotification />
      </div>
    </main>
  );
};
