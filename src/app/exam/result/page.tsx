'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ExamResultPage() {
  const router = useRouter();

  return (
    <main className='w-full flex justify-center mt-20'>
      <div className='w-full max-w-[500px]'>
        <div className='text-center flex flex-col gap-5'>
          <h1 className='text-xl text-gray-700 dark:text-gray-300 font-bold'>
            Your Score
          </h1>
          <h1 className='text-5xl font-bold'>0%</h1>
          <h1 className='text-xl text-gray-700 dark:text-gray-300 font-bold'>
            Your performance
          </h1>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 w-full mt-5  '>
          <div className='w-full max-w-[350px] flex flex-row justify-between items-center'>
            <p className='font-bold'>Total Questions</p>
            <p className='text-gray-700 dark:text-gray-300'>60</p>
          </div>
          <div className='w-full max-w-[350px] flex flex-row justify-between items-center'>
            <p className='font-bold'>Attempted Questions</p>
            <p className='text-gray-700 dark:text-gray-300'>60</p>
          </div>
          <div className='w-full max-w-[350px] flex flex-row justify-between items-center'>
            <p className='font-bold'>Skipped Questions</p>
            <p className='text-gray-700 dark:text-gray-300'>60</p>
          </div>
          <div className='w-full max-w-[350px] flex flex-row justify-between items-center'>
            <p className='font-bold'>Correctly Answered Questions</p>
            <p className='text-gray-700 dark:text-gray-300'>60</p>
          </div>
          <div className='w-full max-w-[350px] flex flex-row justify-between items-center'>
            <p className='font-bold'>Wrong Questions</p>
            <p className='text-gray-700 dark:text-gray-300'>60</p>
          </div>
        </div>
        <div className='mt-10 flex justify-between'>
          <Button variant='outline' onClick={() => router.push('/')}>
            Return Home
          </Button>
          <Button>See Answers</Button>
        </div>
      </div>
    </main>
  );
}
