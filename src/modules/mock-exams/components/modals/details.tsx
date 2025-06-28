'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { Button } from '@/components/ui/button';
import { ExamType } from '@/types/exam.types';
import { ExamCategoryType } from '@/types/examCategory.types';
import { SubjectType } from '@/types/subject.types';
import { ExamTypes } from '@/types/examTypes.types';
// import { useMockExamsService } from '@/modules/mock-exams/services';

export default function ExamDetailsButton({
  title,
  examType,
  exam,
  category,
  subjects,
  action,
  disabled,
}: {
  title: string;
  examType: ExamTypes | undefined;
  exam: ExamType | undefined;
  category: ExamCategoryType;
  subjects: SubjectType[];
  action: () => void;
  disabled: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={disabled}>
        <Button
          className='text-left px-4 text-sm flex flex-row items-center cursor-pointer py-1 rounded-md'
          disabled={disabled}
        >
          <p className='text-sm px-3'>{title}</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-center text-3xl font-bold'>
            Confirm your exam details
          </AlertDialogTitle>
          <AlertDialogDescription className='text-center'>
            Confirm exam details
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex flex-row justify-between w-full'>
            <p className='font-bold'>Exam Type:</p>
            <p className='font-light text-sm'>{examType?.name}</p>
          </div>
          <div className='flex flex-row justify-between w-full'>
            <p className='font-bold'>Exam:</p>
            <p className='font-light text-sm'>{exam?.name}</p>
          </div>
          <div className='flex flex-row justify-between w-full'>
            <p className='font-bold'>Category:</p>
            <p className='font-light text-sm'>{category.name}</p>
          </div>
          <div className='flex flex-row justify-between w-full'>
            <p className='font-bold'>Duration:</p>
            <p className='font-light text-sm'>{exam?.duration} minutes</p>
          </div>
          <div className='flex flex-row justify-between w-full'>
            <p className='font-bold'>Subject(s): </p>
            <div className='flex gap-1 flex-wrap justify-end items-end'>
              {subjects.map((subject) => (
                <p key={subject.id} className='text-sm'>
                  {subject.name},
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-between w-full'>
          <AlertDialogCancel>Back</AlertDialogCancel>
          <AlertDialogAction onClick={action}>Continue</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
