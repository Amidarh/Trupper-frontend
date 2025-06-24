'use client';

import { useState } from 'react';
import { questionObject } from '@/constants/question';
import { cn } from '@/lib/utils';
import { CheckCircle2, X, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ExamSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className='fixed inset-y-0 left-0 top-22 z-40 w-80 border-r transform h-[90vh] transition-transform duration-300 ease-in-out md:translate-x-0 '>
      <div className='p-4 border-b'>
        <div className='flex items-center justify-between'>
          <h2 className='font-semibold text-slate-900 dark:text-slate-100'>
            Question Navigator
          </h2>
          <Button
            variant='ghost'
            size='sm'
            className='md:hidden'
            onClick={() => setSidebarOpen(false)}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
        <div className='mt-2 flex gap-4 text-sm'>
          <div className='flex items-center gap-1'>
            <CheckCircle2 className='h-4 w-4 text-green-500' />
            <span>10 Answered</span>
          </div>
          <div className='flex items-center gap-1'>
            <Circle className='h-4 w-4 text-slate-400' />
            <span>{questionObject.length - 10} Remaining</span>
          </div>
        </div>
      </div>

      <div className='p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto'>
        {questionObject.map((question, index) => (
          <button
            key={question.label}
            // onClick={() => {
            //   setCurrentQuestion(index)
            //   setSidebarOpen(false)
            // }}
            className={cn(
              'w-full p-3 rounded-lg border text-left transition-all duration-200 hover:shadow-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer'
            )}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                  )}
                >
                  {index + 1}
                </div>
                <span className='font-medium text-sm'>Q{index + 1}</span>
              </div>
              {/* <div className="flex items-center gap-1">
                    {question.bookmarked && <Bookmark className="h-3 w-3 text-blue-500 fill-current" />}
                    {question.flagged && <Flag className="h-3 w-3 text-red-500 fill-current" />}
                  </div> */}
            </div>
            <div className='mt-1'>
              <Badge variant='secondary' className='text-xs'>
                Mathematics
              </Badge>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
