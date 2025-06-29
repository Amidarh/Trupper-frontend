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
import { X, Info } from 'lucide-react';

export default function QuitExamButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className='border border-red-600 dark:border-red-600  hover:bg-red-600 text-red-600 font-bold py-2 px-4 rounded flex flex-row items-center justify-center gap-2'
          variant='outline'
        >
          <X size={15} />
          <p className='text-xs'>Quit Exam</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='size-10 rounded-full flex justify-center items-center bg-red-100/30'>
              <Info className='text-red-700' />
            </div>
            <h1>Why are you Quitting</h1>
          </div>
          <AlertDialogDescription className='text-center'>
            Are you sure you want to quit this exam? This action cannot be
            undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='flex flex-row justify-between items-center'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-destructive hover:bg-destructive/80'>
            Quit
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
