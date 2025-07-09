"use client"

import { Card } from '@/components/ui/card';
import { BackButton } from '@/core/commons/navigation/backButton';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useMockExamsService } from '@/modules/mock-exams/services';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
// import ExamDetailsButton from '../components/modal/examInfo';

export function SingleExamCardLayout() {
  const { id } = useParams<{ id: string }>();
  const { getExamCardSubject, categorySubjectList, loading } = useMockExamsService()

  useEffect(() => {
    getExamCardSubject(id)
  }, [id])

  return (
    <Card className='px-3'>
      <BackButton title='My Exams' />
        {loading ? (
          <div className='flex flex-row flex-wrap gap-3'>
            <Skeleton className='w-full h-[190px] max-w-[280px]' />
            <Skeleton className='w-full h-[190px] max-w-[280px]' />
            <Skeleton className='w-full h-[190px] max-w-[280px]' />
            <Skeleton className='w-full h-[190px] max-w-[280px]' />
          </div>
          ) : categorySubjectList?.length === 0 ? (
            <p className='text-gray-500'>No subject card available</p>
          ) : (
            <div className='flex flex-row flex-wrap gap-3'>
            {categorySubjectList?.map((subject) => (
              <Card key={subject.id} className='p-2 w-fit max-w-[280px] gap-0'>
                <h1 className='font-bold'>{subject.name}</h1>
                <p className='mt-5 text-sm text-gray-300'>Practice and test your knowledge on {subject.name}</p>
                <div className='flex text-sm flex-row justify-between items-center my-2'>
                  <p className='text-gray-300'>{subject.exam.noOfQuestions} questions</p>
                  <p>{subject.exam.duration} minutes</p>
                </div>
                {/* <div>
                  <ExamDetailsButton title='Start Exam' data={data} />
                </div> */}
                <Button className='mt-3'>
                  Start
                </Button>
              </Card>
            ))}
            </div>
          )}
    </Card>
  );
}
