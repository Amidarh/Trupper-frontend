import { StatsCard } from '@/modules/dashboard/components/card/statsCard';
import { User, User2 } from 'lucide-react';
import { ResultChart } from '../components/charts/result';
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ResultTable } from '../components/results/resultTable';
import { MyDashboardStatsType, ResultType } from '@/types';
import { PerformanceBarChart } from '@/modules/my-dashboard/components/charts/performanceBarChart';
import { PerformanceLineChart } from '../components/charts/line';
import {
  ArrowUpRight,
  CalendarDays,
  LayoutDashboard,
  LineChart,
  UserPlus,
} from 'lucide-react';

export const UserActivities = ({ data, results } : { data: MyDashboardStatsType | undefined, results: ResultType[] | undefined }) => {
  return (
    <main>
      <h1>Analytics</h1>
      <section className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-lg:mb-5">
        <StatsCard
          Icon={User2}
          stat={data?.totalExams ?? 0}
          title="Total Exam Taken"
        />
        <StatsCard
          Icon={User2}
          stat={`${Math.round(data?.averageScore ?? 0)}%`}
          title="Average Score"
        />
        <StatsCard
          Icon={User2}
          stat={Math.round(data?.totalAttemptedQuestions ?? 0)}
          title="Tried Questions"
        />
        <StatsCard
          Icon={User2}
          stat={data?.totalPassedQuestions ?? 0}
          title="Correct Questions"
        />
      </section>

      <section className='mt-5'>
        {/* <Card className='lg:col-span-4'>
          <CardHeader>
            <CardTitle>Student Statistics</CardTitle>
            <CardDescription>
              Student enrollment and attendance over time
            </CardDescription>
          </CardHeader>
          <CardContent className='pl-2'>
            <ResultChart />
          </CardContent>
        </Card> */}
        <PerformanceLineChart data={results} />

        {/* <Card className='lg:col-span-3'>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-5'>
              {[
                {
                  title: 'New Student Registration',
                  description: '10 new students registered this week',
                  icon: UserPlus,
                  timestamp: '2 hours ago',
                },
                {
                  title: 'Upcoming Parent-Teacher Conference',
                  description: 'Scheduled for November 15-16',
                  icon: CalendarDays,
                  timestamp: 'Yesterday',
                },
                {
                  title: 'Quarterly Report Published',
                  description:
                    'Q3 academic performance report is now available',
                  icon: LineChart,
                  timestamp: '3 days ago',
                },
                {
                  title: 'System Update Completed',
                  description: 'New features have been added to your dashboard',
                  icon: LayoutDashboard,
                  timestamp: '1 week ago',
                },
              ].map((item, i) => (
                <div key={i} className='flex items-start gap-4'>
                  <div className='rounded-full p-2 bg-primary/10'>
                    <item.icon className='h-4 w-4 text-primary' />
                  </div>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium leading-none'>
                      {item.title}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      {item.description}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {item.timestamp}
                    </p>
                  </div>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='ml-auto'
                    asChild
                  >
                    <Link href='#'>
                      <ArrowUpRight className='h-4 w-4' />
                      <span className='sr-only'>View details</span>
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </section>

      <Card className='mt-5'>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>
            Current and upcoming classes for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResultTable />
        </CardContent>
      </Card>
    </main>
  );
};
