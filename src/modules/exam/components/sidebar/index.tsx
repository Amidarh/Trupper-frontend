'use client';

import { bgBlur, cn } from '@/lib/utils';
import { CheckCircle2, X, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAltStore } from '@/lib/zustand/userStore';

export const ExamSidebar = ({
  onToggle,
  isOpen,
}: {
  onToggle: () => void;
  isOpen: boolean;
}) => {
  const examState = useAltStore((state) => state.examState);
  const setCurrentQuestion = useAltStore((state) => state.setCurrentQuestion);
  const currentQuestion = useAltStore((state) => state.currentQuestion);

  return (
    <div
      className={cn(
        isOpen
          ? 'fixed inset-y-0 left-0 top-22 z-10 w-80 border-r transform h-[90vh] transition-transform duration-300 ease-in-out md:translate-x-0 '
          : 'hidden',
        bgBlur
      )}
    >
      {/* Overlay for mobile */}
      <div className='p-4 border-b'>
        <div className='flex items-center justify-between'>
          <h2 className='font-semibold text-slate-900 dark:text-slate-100'>
            Question Navigator
          </h2>
          <Button
            variant='ghost'
            size='sm'
            // className='md:hidden'
            onClick={onToggle}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
        <div className='mt-2 flex gap-4 text-sm'>
          <div className='flex items-center gap-1'>
            <CheckCircle2 className='h-4 w-4 text-green-500' />
            <span>
              {
                examState?.questions.filter(
                  (question) => question.userAnswer !== ''
                ).length
              }{' '}
              Answered
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <Circle className='h-4 w-4 text-slate-400' />
            <span>
              {(examState?.questions?.length ?? 0) -
                (examState?.questions.filter(
                  (question) => question.userAnswer !== ''
                ).length ?? 0)}{' '}
              Remaining
            </span>
          </div>
        </div>
      </div>

      <div className='p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto'>
        {examState?.questions.map((question, index) => (
          <button
            key={question.id}
            className={cn(
              'w-full p-3 rounded-lg border text-left transition-all duration-200 hover:shadow-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer',
              currentQuestion === index + 1 && 'bg-slate-100 dark:bg-slate-800'
            )}
            onClick={() => setCurrentQuestion(index + 1)}
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
            </div>
            <div className='mt-1'>
              <Badge variant='secondary' className='text-xs'>
                {question.subject.name}
              </Badge>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
