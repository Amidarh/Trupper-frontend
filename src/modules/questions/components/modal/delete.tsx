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
import { useQuestionService } from '../../services';
import { Trash2 } from 'lucide-react';

export default function DeleteQuestionButton({
  id,
}: {
  id: string | undefined;
}) {
  const { deleteQuestion, singleQuestionLoading } = useQuestionService();

  const handleDelete = useCallback(async () => {
    await deleteQuestion(id);
  }, [deleteQuestion, id]);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className='cursor-pointer'>
          <Trash2 />
          <p>Delete Question</p>
        </Button>
      </AlertDialogTrigger>
      {singleQuestionLoading ? (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deleting...</AlertDialogTitle>
            <AlertDialogDescription>
              Please wait while we delete this question.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      ) : (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this Question?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              Queustion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='bg-red-800 hover:bg-red-700'
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
