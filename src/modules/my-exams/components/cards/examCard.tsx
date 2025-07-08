import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExamCardType } from '@/types/examCards.types';
import moment from 'moment';
import { ExamCardOptionsButton } from '../buttons/options';
import ExamDetailsButton from '../modal/examInfo';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const ExamCard = ({ data }: { data: ExamCardType }) => {
  const router = useRouter()
  return (
    <Card className='p-3 gap-0 w-full max-w-[290px] min-h-[220px]'>
      <CardHeader className='flex flex-row justify-between items-center w-full px-0'>
        <h1 className='text-[14px]'>{data.exam.acronym} Exam</h1>
        <ExamCardOptionsButton id={data.id} />
      </CardHeader>
      <CardContent className='p-0 mt-2 flex justify-between flex-col h-full'>
        {/* <div> */}
        <div className='flex-col gap-2'>
          <Separator />
          <div className='mt-3  flex justify-between flex-row'>
            <p className='font-bold text-sm'>Category</p>
            <p className='text-sm text-gray-500'>{data.category.name}</p>
          </div>
          <div className='flex justify-between flex-row'>
            <p className='font-bold text-sm'>Creation Date</p>
            <p className='text-sm text-right text-gray-500'>
              {moment(data.createdAt).format('MMMM D, YYYY')}
            </p>
          </div>
          <div className='flex justify-between flex-row gap-2'>
            <p className='font-bold text-sm'>Subjects</p>
            <div className='flex gap-1 flex-wrap justify-end items-end text-gray-500'>
              {data.subjects.map((subject) => (
                <p key={subject.id} className='text-sm'>
                  {subject.name},
                </p>
              ))}
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className='mt-3'>
          {data.exam.subjectToBeWritten > 1 ? <ExamDetailsButton title='Start Exam' data={data} /> : 
            <Button className='text-left w-full text-sm flex flex-row items-center cursor-pointer p-1 rounded-md'
              onClick={() => router.push(`/my-exams/${data.id}`)}
            >
              <p className='text-sm'>Open</p>
            </Button>
          }
        </div>
      </CardContent>
    </Card>
  );
};
