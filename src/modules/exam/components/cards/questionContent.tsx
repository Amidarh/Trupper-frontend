'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ChevronRight,
  ChevronLeft,
  PanelLeft,
  Calculator,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAltStore } from '@/lib/zustand/userStore';
// import DOMPurify from 'dompurify';

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
  const examState = useAltStore((state) => state.examState);

  const questionIndex = (currentQuestion ?? 1) - 1;

  // const sanitizedHtml = DOMPurify.sanitize(
  //   examState?.questions?.[questionIndex]?.question ?? ''
  // );

  return (
    <Card className='w-full bg-card max-w-2xl p-4 shadow-md'>
      <CardHeader className='px-0 flex flex-col items-start justify-start'>
        <div className='flex items-center justify-between w-full mb-1'>
          <p>Physics</p>
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
        <h1 className='font-bold'>Question 1</h1>
        {/* <div
          className='text-sm text-gray-900 dark:text-gray-300'
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        /> */}
        <div className='text-sm text-gray-900 dark:text-gray-300'>
          {examState?.questions?.[questionIndex]?.question}
        </div>
      </CardHeader>

      <CardContent className='px-0'>
        <RadioGroup defaultValue='option-one'>
          {['Option One', 'Option Two', 'Option Three', 'Option Four'].map(
            (option, i) => {
              const value = `option-${i + 1}`;
              const labelId = `option-${i + 1}`;
              const optionLetter = String.fromCharCode(65 + i);
              return (
                <div
                  key={value}
                  className='flex cursor-pointer items-center space-x-2 w-full px-2 py-3 border rounded'
                >
                  <RadioGroupItem value={value} id={labelId} />
                  <div className='flex items-center justify-center text-center text-sm rounded-full h-6 w-6 bg-gray-500 text-white'>
                    {optionLetter}
                  </div>
                  <Label htmlFor={labelId}>{option}</Label>
                </div>
              );
            }
          )}
        </RadioGroup>
      </CardContent>

      <Separator />

      <CardFooter className='flex flex-row items-center px-0 pt-0 justify-between'>
        <Button
          onClick={previousQuestion}
          disabled={currentQuestion === 1}
        >
          <ChevronLeft />
          <p className='text-xs'>Previous</p>
        </Button>
        <Button
          onClick={nextQuestion}
          disabled={
            examState?.questions.length === currentQuestion
          }
        >
          <p className='text-xs'>Next</p>
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
};
