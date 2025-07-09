'use client';

import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, ChevronLeft, PanelLeft, Calculator } from 'lucide-react';
import { useAltStore } from '@/lib/zustand/userStore';
import xss from 'xss';
import { ObjectiveQuestions } from './options';

export const QuestionBodyContent = ({
  onToggleSidebar,
  onToggleCalculator,
}: {
  onToggleSidebar: () => void;
  onToggleCalculator: () => void;
}) => {
  const nextQuestion = useAltStore((state) => state.nextQuestion);
  const previousQuestion = useAltStore((state) => state.previousQuestion);
  const currentQuestion = useAltStore((state) => state.currentQuestion);
  const isExamOn = useAltStore((state) => state.isExamOn);
  const examState = useAltStore((state) => state.examState);
  const setExamState = useAltStore((state) => state.setExamState);
  const examDuration = useAltStore((state) => state.examDuration);
  const questionIndex = (currentQuestion ?? 1) - 1;

  const sanitizedHtml = xss(
    examState?.questions?.[questionIndex]?.question ?? ''
  );

  const handleOptionChange = (optionId: string) => {
    if (isExamOn) {
      const updatedQuestions = examState?.questions.map((question, index) =>
        index + 1 === currentQuestion
          ? { ...question, userAnswer: optionId.toLocaleLowerCase() }
          : question
      );
      console.log({ examDuration });
      setExamState({
        duration: examDuration,
        questions: updatedQuestions ?? examState?.questions ?? [],
        resultId: examState?.resultId ?? '',
        subject: examState?.subject ?? '',
      });
    }
  };

  return (
    <Card className='w-full bg-card max-w-2xl p-4 shadow-md'>
      <CardHeader className='px-0 flex flex-col items-start justify-start'>
        <div className='flex items-center justify-between w-full mb-1'>
          <p>{examState?.questions?.[questionIndex]?.subject.name}</p>
          <div className='flex flex-row gap-2 items-center'>
            <Calculator
              className='cursor-pointer'
              size={20}
              onClick={onToggleCalculator}
            />
            <PanelLeft
              onClick={onToggleSidebar}
              size={20}
              className='cursor-pointer'
            />
          </div>
        </div>
        <h1 className='font-bold'>Question {currentQuestion}</h1>
        <div
          className='text-sm text-gray-900 dark:text-gray-300'
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </CardHeader>

      <ObjectiveQuestions
        action={handleOptionChange}
        options={
          examState?.questions?.[questionIndex]?.options ?? {
            a: '',
            b: '',
            c: '',
            d: '',
          }
        }
        selected={examState?.questions?.[questionIndex]?.userAnswer ?? ''}
      />

      <Separator />

      <CardFooter className='flex flex-row items-center px-0 pt-0 justify-between'>
        <Button onClick={previousQuestion} disabled={currentQuestion === 1}>
          <ChevronLeft />
          <p className='text-xs'>Previous</p>
        </Button>
        <Button
          onClick={nextQuestion}
          disabled={examState?.questions.length === currentQuestion}
        >
          <p className='text-xs'>Next</p>
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
};
