import { Progress } from '@/components/ui/progress';
import { ModeToggle } from '@/core/commons/modeToggle';
import { useAltStore } from '@/lib/zustand/userStore';
import { Countdown } from '../countdown';
import QuitExamButton from '../buttons/quit';
import SubmitExamButton from '../buttons/submit';

export const ExamHeader = () => {
  const currentQuestion = useAltStore((state) => state.currentQuestion);
  const examState = useAltStore((state) => state.examState);
  return (
    <nav className='flex flex-col gap-2 items-center justify-between px-4 py-2 shadow-sm w-screen border-b'>
      <main className='w-full flex flex-row items-center justify-between'>
        <QuitExamButton />

        <div className='flex-col items-center justify-center hidden sm:flex'>
          <h1 className='text-lg'>JAMB Exam</h1>
          <div className='flex flex-row items-center justify-center text-sm gap-2'>
            <p>
              Question {currentQuestion} of {examState?.questions?.length ?? 0}
            </p>
            <span className='text-gray-500'>|</span>
            <p>
              {examState?.questions.filter(
                (question) => question.userAnswer !== ''
              ).length ?? 0}{' '}
              answered
            </p>
          </div>
        </div>

        <div className='sm:hidden flex'>
          <p className='text-green-600'>10:20</p>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <Countdown />
          {/* <p className='hidden sm:flex text-green-600'>10:20</p> */}
          <div className='hidden sm:flex'>
            <ModeToggle />
          </div>
          <SubmitExamButton />
        </div>
      </main>
      <Progress
        value={
          ((examState?.questions.filter(
            (question) => question.userAnswer !== ''
          ).length ?? 0) /
            (examState?.questions?.length ?? 0)) *
          100
        }
        className='w-full mt-2'
      />
    </nav>
  );
};
