import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { QuestionTable } from '../components/tables/questionsTable';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { StatsCard } from '@/modules/dashboard/components/card/statsCard';
import { ChartSpline } from 'lucide-react';
import { useQuestionService } from '../services';

export const Questions = () => {
  const router = useRouter();
  const { data } = useQuestionService({});
  return (
    <Card>
      <CardHeader>
        <section className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
          <StatsCard
            Icon={ChartSpline}
            stat={data?.totalOfOrganization}
            title='Total Questions'
          />
          <StatsCard
            Icon={ChartSpline}
            stat={data?.totalAIOrganization}
            title='Ai Generated Questions'
          />
          <StatsCard Icon={ChartSpline} stat='0' title='AI Trials left' />
          <StatsCard Icon={ChartSpline} stat='0' title='AI Trials left' />
          {/* <StatsCard
          Icon={ChartSpline}
          stat="0"
          title='Total passed Questions'
        /> */}
        </section>
      </CardHeader>
      <CardHeader className='flex flex-row justify-between items-center'>
        <div className='flex gap-2 flex-col'>
          <Label>Filters</Label>
          <Input className='h-8' />
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <Button
            className='cursor-pointer'
            variant='glass'
            onClick={() => router.push('/questions/generate')}
          >
            Generate Question
          </Button>
          <Button
            className='cursor-pointer'
            onClick={() => router.push('/questions/create')}
          >
            Add new Question
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <QuestionTable />
      </CardContent>
    </Card>
  );
};
