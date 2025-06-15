import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SubjectCard } from '../components/card/subjectCard';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useExamService } from '@/modules/exam/services';

export const Subject = () => {
  const router = useRouter();
  const { data } = useExamService();
  return (
    <Card>
      <CardHeader className='flex flex-row justify-between items-center w-full'>
        <div>Subjects by exams</div>
        <Button
          className='cursor-pointer'
          onClick={() => router.push('/subjects/create')}
        >
          <Plus />
          <p>Add Subject</p>
        </Button>
      </CardHeader>
      <CardContent className='flex flex-row gap-2'>
        {data?.map((exam) => <SubjectCard exam={exam.acronym} id={exam.id} />)}
      </CardContent>
    </Card>
  );
};
