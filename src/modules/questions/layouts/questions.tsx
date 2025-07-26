import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { QuestionTable } from '../components/tables/questionsTable';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { StatsCard } from '@/modules/dashboard/components/card/statsCard';
import { ChartSpline } from 'lucide-react';
import { useQuestionService } from '../services';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { questionTypeData } from '@/constants/question';
import { useExamService } from '@/modules/exams/services';

export const Questions = () => {
  const router = useRouter();

  const { data:examList, isLoading:loading } = useExamService()

  // Filter state
  const [search, setSearch] = useState('');
  // Default to undefined, but use 'all' as the value for "All Types"
  const [questionType, setQuestionType] = useState<string | undefined>(undefined);
  const [selectedExam, setSelectedExam] = useState<string | undefined>(undefined);

  // Compose filter params
  const filterParams = useMemo(() => {
    const params: Record<string, any> = {};
    if (search) params.search = search;
    // Only add type if not "all" and not undefined
    if (selectedExam && selectedExam !== 'all') params.exam = selectedExam;
    return params;
  }, [search, selectedExam]);

  // Fetch data with filters
  const { data, isLoading } = useQuestionService(filterParams);

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
        </section>
      </CardHeader>
      <CardHeader className='flex flex-col md:flex-row justify-between items-center'>
        <div className='flex gap-2 flex-row flex-wrap md:flex-row md:items-end'>
          {/* <div className="flex flex-col">
            <Label htmlFor="search" className='mb-2'>Search</Label>
            <Input
              id="search"
              className='h-11'
              placeholder="Search by question, keyword, etc."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div> */}
          <div className="flex flex-col">
            <Label htmlFor="type" className='mb-2'>Type</Label>
            <Select
              value={questionType ?? 'all'}
              onValueChange={val => setSelectedExam(val === 'all' ? undefined : val)}
            >
              <SelectTrigger className="h-8 w-40" id="type">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Types</SelectItem>
                  {examList?.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.acronym}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='flex flex-row gap-3 items-center mt-4 md:mt-0'>
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
        <QuestionTable filters={filterParams} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};
