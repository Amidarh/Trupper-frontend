import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X } from 'lucide-react';
import { ModeToggle } from '@/core/commons/modeToggle';

export const ExamHeader = () => {
  return (
    <nav className='flex flex-col gap-2 items-center justify-between px-4 py-2 shadow-sm w-screen border-b'>
      <main className='w-full flex flex-row items-center justify-between'>
        <Button
          className='border border-red-600 dark:border-red-600  hover:bg-red-600 text-red-600 font-bold py-2 px-4 rounded flex flex-row items-center justify-center gap-2'
          variant='outline'
        >
          <X size={15} />
          <p className='text-xs'>Quit Exam</p>
        </Button>

        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-lg'>JAMB Exam</h1>
          <div className='flex flex-row items-center justify-center text-sm gap-2'>
            <p>Question 1 of 50</p>
            <span className='text-gray-500'>|</span>
            <p>5 answered</p>
          </div>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <ModeToggle />
          <Button className='bg-green-500 hover:bg-green-600 font-bold py-2 px-4 flex flex-row items-center justify-center gap-2'>
            <p className='text-xs'>Submit Exam</p>
          </Button>
        </div>
      </main>
      <Progress value={50} className='w-full mt-2' />
    </nav>
  );
};
