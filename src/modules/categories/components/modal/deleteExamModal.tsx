'use client';

import { useCallback } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useExamModeService } from '../../services/examModeService';

export default function DeleteExamModeModeButton({
  id,
}: {
  id: string | undefined;
}) {
  const { deleteSingleExamMode, singleExamMode } = useExamModeService();

  const handleDelete = useCallback(async () => {
    await deleteSingleExamMode(id);
  }, [deleteSingleExamMode, id]);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className='cursor-pointer h-7 text-xs'>
          Delete
        </Button>
      </AlertDialogTrigger>
      {singleExamMode ? (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deleting...</AlertDialogTitle>
            <AlertDialogDescription>
              Please wait while we delete this exam mode.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      ) : (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this Exam Mode?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              Exam Mode.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='bg-destructive text-white hover:bg-destructive/90'
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}
