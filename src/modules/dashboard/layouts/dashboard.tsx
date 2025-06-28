import { StatsCard } from '@/modules/dashboard/components/card/statsCard';
import { UserSignupChart } from '@/modules/dashboard/components/chart/usersSignupBarChart';
import { Users } from 'lucide-react';
// import { DailyActivityBarChart } from "@/modules/dashboard/components/chart/dailyActiveStatusChart";
// import { UserCategoryChart } from "@/modules/dashboard/components/chart/userCategoryChart";
import { ExamTable } from '@/modules/dashboard/components/table/examsTable';
import { UserCategoryTable } from '@/modules/dashboard/components/table/userCategoryTable';
import { useGetAnalytics } from '../services/dashboard';

export const Dashboard = () => {
  const { data } = useGetAnalytics();
  console.log({ data });
  return (
    <main>
      <p>Overview of entire school management platform</p>

      <section className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 '>
        <StatsCard Icon={Users} title='Total Users' stat={data?.userCount} />
        <StatsCard Icon={Users} title='Total Admins' stat={data?.AdminCount} />
        <StatsCard
          Icon={Users}
          title='Total User Categories'
          stat={data?.userCategoryCount}
        />
        <StatsCard
          Icon={Users}
          title='Total Exam Types'
          stat={data?.ExamTypeCount}
        />
        <StatsCard
          Icon={Users}
          title='Total Subjects'
          stat={data?.subjectCount}
        />
        <StatsCard
          Icon={Users}
          title='Total Questions'
          stat={data?.QuestionsCount}
        />
      </section>

      {/* Charts */}

      <section className='mt-7'>
        <UserSignupChart chartData={data?.monthlyUserAnalytics} />
      </section>
      {/* <section className="mt-6 grid grid-cols-2 gap-4">
            <DailyActivityBarChart/>
            <UserCategoryChart/>
        </section> */}

      <section className='mt-7 grid grid-col-1 md:grid-cols-2 gap-4'>
        <ExamTable />
        <UserCategoryTable />
      </section>
    </main>
  );
};
