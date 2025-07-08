'use client';

// import { useCallback } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useExamService } from '../../services';

export default function SubmitExamButton() {
  const { endExam } = useExamService();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='bg-green-500 hover:bg-green-600 font-bold py-2 px-4 flex flex-row items-center justify-center gap-2'>
          <p className='text-xs'>Submit Exam</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='size-10 rounded-full flex justify-center items-center bg-green-100/30'>
              <Info className='text-green-700' />
            </div>
            <h1>Are you done?</h1>
          </div>
          <AlertDialogDescription className='text-center'>
            Are you sure you want to submit this exam? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='flex flex-row justify-between items-center'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='bg-green-500 hover:bg-green-600 font-bold py-2 px-4 flex flex-row items-center justify-center gap-2'
            onClick={() => endExam('submit')}
          >
            Submit
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
