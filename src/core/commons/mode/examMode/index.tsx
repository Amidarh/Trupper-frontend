'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Info, Puzzle, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useExamModeService } from '@/modules/categories/services/examModeService';
import { useAltStore } from '@/lib/zustand/userStore';
import { isTimeActive } from '@/utils';
import { useMockExamsService } from '@/modules/mock-exams/services';

// Define interfaces for type safety
interface Exam {
  name: string;
  category: string;
  duration: number;
  subjects: string[];
  validFrom?: string;
  validTill?: string;
}

interface ExamMode {
  status: boolean;
  exam?: Exam;
}

// Dummy exam data
const DUMMY_EXAM: Exam = {
  name: 'WAEC',
  category: 'Arts',
  duration: 60,
  subjects: ['Maths', 'English'],
};

function isExamActive(exam?: { validFrom?: string; validTill?: string }) {
  if (!exam?.validFrom || !exam?.validTill) return false;
  const now = new Date();
  const from = new Date(exam.validFrom);
  const till = new Date(exam.validTill);
  console.log('now', now);
  console.log('from', from);
  console.log('till', till);
  return now >= from && now <= till;
}

export const ExamModeModal = () => {
  const user = useAltStore((state) => state.user);
  const { getActiveExamMode, activeExamMode } = useExamModeService();
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedMode, setSelectedMode] = useState<
    'practice' | 'real-time' | null
  >(null);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const { startExam, loading } = useMockExamsService();

  // Fetch active exam mode with error handling
  useEffect(() => {
    const fetchExamMode = async () => {
      try {
        await getActiveExamMode();
      } catch (err) {
        console.error('Failed to fetch active exam mode:', err);
        setError('Failed to load exam data. Please try again.');
      }
    };
    if (user?.role?.toLowerCase() === 'user') {
      fetchExamMode();
    }
  }, []);

  // Compute exam active status
  const examIsActive = useMemo(() => {
    if (!activeExamMode?.exam) return false;
    return isTimeActive({
      validFrom: activeExamMode.validFrom,
      validTill: activeExamMode.validTill,
    });
  }, [activeExamMode?.exam]);

  // Control dialog visibility
  useEffect(() => {
    if (
      activeExamMode?.status &&
      user?.role?.toLowerCase() === 'user' &&
      examIsActive
    ) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [activeExamMode, user, examIsActive]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setShowInstructions(false);
      setSelectedMode(null);
      setSelectedDuration('');
      setError('');
    }
  }, [open]);

  // Compute exam data with fallback
  const examData = useMemo(() => {
    if (activeExamMode?.exam) {
      return {
        name: activeExamMode.exam.name || DUMMY_EXAM.name,
        category: activeExamMode.exam.category || DUMMY_EXAM.category,
        duration: activeExamMode.exam.duration || DUMMY_EXAM.duration,
        // subjects: activeExamMode?.exam?.subjects || DUMMY_EXAM.subjects,
      };
    }
    return DUMMY_EXAM;
  }, [activeExamMode?.exam]);

  const handleNextStep = () => {
    setError('');
    if (!selectedMode) {
      setError('Please select a mode to continue.');
      return;
    }
    if (selectedMode === 'practice') {
      const durationNum = Number(selectedDuration);
      if (
        !selectedDuration ||
        isNaN(durationNum) ||
        durationNum < 10 ||
        durationNum > Number(examData.duration)
      ) {
        setError(
          `Please enter a valid duration (10 - ${examData.duration} minutes) for practice mode.`
        );
        return;
      }
    }
    setShowInstructions(true);
  };

  // Guard clause to prevent rendering if conditions aren't met
  if (
    !user ||
    user?.role?.toLowerCase() !== 'user' ||
    !activeExamMode?.status ||
    !examIsActive
  ) {
    return null;
  }

  const handleStartExam = () => {
    startExam(examData.category, {
      examMode: true,
      examModeId: activeExamMode?.id,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className='max-w-[95vw] sm:max-w-lg p-0'>
        <div className='p-4 sm:p-6'>
          {showInstructions ? (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-center text-xl sm:text-2xl font-bold'>
                  Exam Information
                </AlertDialogTitle>
                <AlertDialogDescription className='text-center text-sm sm:text-base'>
                  Please review the details before starting the exam.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className='flex flex-col gap-2 w-full my-4'>
                <div className='flex flex-col sm:flex-row justify-between w-full gap-1'>
                  <span className='font-semibold'>Exam:</span>
                  <span className='font-light text-sm'>{examData.name}</span>
                </div>
                <div className='flex flex-col sm:flex-row justify-between w-full gap-1'>
                  <span className='font-semibold'>Category:</span>
                  <span className='font-light text-sm'>
                    {examData.category}
                  </span>
                </div>
                <div className='flex flex-col sm:flex-row justify-between w-full gap-1'>
                  <span className='font-semibold'>Duration:</span>
                  <span className='font-light text-sm'>
                    {selectedMode === 'practice' && selectedDuration
                      ? selectedDuration
                      : examData.duration}{' '}
                    minutes
                  </span>
                </div>
                {Array.isArray((examData as any).subjects) && (
                  <div className='flex flex-col sm:flex-row justify-between w-full gap-1'>
                    <span className='font-semibold'>Subject(s):</span>
                    <span className='font-light text-sm'>
                      {'subjects' in examData &&
                      Array.isArray((examData as any).subjects)
                        ? (examData as any).subjects.join(', ')
                        : 'subject' in examData && (examData as any).subject
                          ? (examData as any).subject
                          : 'N/A'}
                    </span>
                  </div>
                )}
                <div className='flex flex-col sm:flex-row justify-between w-full gap-1'>
                  <p>
                    <b>Note:</b> The minimum time allowed for this exam is{' '}
                    <b>10 minutes</b>. The maximum is{' '}
                    <b>{examData.duration} minutes</b>.
                  </p>
                </div>
                <ul className='list-disc pl-5 space-y-1'>
                  <li>You can skip questions and return to them later.</li>
                  <li>Attempted questions will be highlighted in orange.</li>
                  <li>You can revisit any question before submitting.</li>
                  <li>If time runs out, your test will be auto-submitted.</li>
                </ul>
              </div>
              <div className='flex flex-col-reverse sm:flex-row justify-between w-full mt-2 gap-2'>
                <Button
                  variant='outline'
                  className='w-full sm:w-auto'
                  onClick={() => setShowInstructions(false)}
                  type='button'
                  aria-label='Go back to mode selection'
                >
                  Back
                </Button>
                <AlertDialogAction
                  className='w-full sm:w-auto'
                  onClick={handleStartExam}
                  type='button'
                  aria-label='Start the exam'
                >
                  Start Exam
                </AlertDialogAction>
              </div>
            </>
          ) : (
            <>
              <AlertDialogHeader>
                <div className='flex flex-col items-center gap-2'>
                  <div className='size-10 rounded-full flex justify-center items-center bg-orange-100/50'>
                    <Info className='text-[#e8a23d]' />
                  </div>
                  <h1 className='text-base sm:text-lg font-semibold'>
                    Exam Information
                  </h1>
                </div>
                <AlertDialogDescription className='text-center mt-2 text-xs sm:text-sm'>
                  <span className='font-medium'>Practice mode</span> allows you
                  to set a custom duration.
                  <br />
                  <span className='font-medium'>Real-time mode</span> uses the
                  default exam duration.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 my-4'>
                <div
                  className={cn(
                    'px-4 py-5 rounded-2xl flex flex-col items-center justify-center cursor-pointer w-full max-w-[150px] border transition-all',
                    selectedMode === 'practice'
                      ? 'border-[#e8a23d] bg-[#e8a23d]/20'
                      : 'border border-gray-200'
                  )}
                  onClick={() => {
                    setSelectedMode('practice');
                    setError('');
                  }}
                  tabIndex={0}
                  role='button'
                  aria-label='Select Practice Mode'
                  aria-pressed={selectedMode === 'practice'}
                >
                  <Puzzle className='mb-1' />
                  <span className='font-semibold text-sm sm:text-base'>
                    Practice Demo
                  </span>
                </div>
                <div
                  className={cn(
                    'px-4 py-5 rounded-2xl flex flex-col items-center justify-center cursor-pointer w-full max-w-[150px] border transition-all',
                    selectedMode === 'real-time'
                      ? 'border-gray-900 bg-blue-800/10'
                      : 'border border-gray-200'
                  )}
                  onClick={() => {
                    setSelectedMode('real-time');
                    setError('');
                    setSelectedDuration('');
                  }}
                  tabIndex={0}
                  role='button'
                  aria-label='Select Real-time Mode'
                  aria-pressed={selectedMode === 'real-time'}
                >
                  <Newspaper className='mb-1' />
                  <span className='font-semibold text-sm sm:text-base'>
                    Start Exam
                  </span>
                </div>
              </div>
              {error && (
                <div className='text-red-500 text-xs sm:text-sm mb-2'>
                  {error}
                </div>
              )}
              <div className='flex flex-col-reverse sm:flex-row justify-between w-full mt-2 gap-2'>
                <div></div>
                <Button
                  className='w-full sm:w-auto'
                  onClick={handleNextStep}
                  type='button'
                  aria-label='Continue to exam instructions'
                >
                  Continue
                </Button>
              </div>
            </>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
