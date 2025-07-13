'use client';

import { BackButton } from '@/core/commons/navigation/backButton';
import { ResultType } from '@/types/result.types';
import { Skeleton } from '@/components/ui/skeleton';

export function PerformanceResultLayout({
  loading,
  data,
}: {
  loading: boolean;
  data: ResultType | null;
}) {
  return (
    <main>
      <BackButton title='My performance' />
      <main className='w-full flex justify-center mt-20'>
        {loading ? (
          <div className='w-full max-w-[500px]'>
            <div className='text-center flex flex-col gap-5'>
              <h1 className='text-xl text-gray-700 dark:text-gray-300 font-bold'>
                Your Score
              </h1>
              <Skeleton className='h-24' />
              <h1 className='text-xl text-gray-700 dark:text-gray-300 font-bold'>
                performance Analysis
              </h1>
            </div>
            <div className='flex flex-col items-center justify-center gap-3 w-full mt-5  '>
              <Skeleton className='h-12' />
              <Skeleton className='h-12' />
              <Skeleton className='h-12' />
              <Skeleton className='h-12' />
              <Skeleton className='h-12' />
            </div>
          </div>
        ) : (
          <div className='w-full max-w-[500px]'>
            <div className='text-center flex flex-col gap-5'>
              <h1 className='text-xl text-gray-700 dark:text-gray-300 font-bold'>
                Your Score
              </h1>
              <h1 className='text-5xl font-bold'>{data?.score}%</h1>
              <h1 className='text-xl text-gray-700 dark:text-gray-300 font-bold'>
                performance Analysis
              </h1>
            </div>
            <div className='flex flex-col items-center justify-center gap-3 w-full mt-5  '>
              <div className='w-full max-w-[350px] flex flex-row justify-between items-center'>
                <p className='font-bold'>Total Questions</p>
                <p className='text-gray-700 dark:text-gray-300'>
                  {data?.totalQuestions}
                </p>
              </div>
              <div className='w-full max-w-[350px] flex flex-row justify-between items-center'>
                <p className='font-bold'>Attempted Questions</p>
                <p className='text-gray-700 dark:text-gray-300'>
                  {data?.attempted}
                </p>
              </div>
              <div className='w-full max-w-[350px] flex flex-row justify-between items-center'>
                <p className='font-bold'>Skipped Questions</p>
                <p className='text-gray-700 dark:text-gray-300'>
                  {data?.skipped}
                </p>
              </div>
              <div className='w-full max-w-[350px] flex flex-row justify-between items-center'>
                <p className='font-bold'>Correctly Answered Questions</p>
                <p className='text-gray-700 dark:text-gray-300'>
                  {data?.passed}
                </p>
              </div>
              <div className='w-full max-w-[350px] flex flex-row justify-between items-center'>
                <p className='font-bold'>Wrong Questions</p>
                <p className='text-gray-700 dark:text-gray-300'>
                  {data?.failed}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </main>
  );
}
