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
import { Trash2 } from 'lucide-react';
import { useMockExamsService } from '@/modules/mock-exams/services';

export default function DeleteExamCardButton({
  id,
}: {
  id: string | undefined;
}) {
  const { deleteExamCard, loading } = useMockExamsService();

  const handleDelete = useCallback(async () => {
    await deleteExamCard(id);
  }, [deleteExamCard, id]);

  console.log(id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className='text-left text-sm flex flex-row items-center cursor-pointer hover:bg-destructive/90 bg-destructive/90 p-1 rounded-md'>
          <Trash2 className='mr-2' size={17} />
          <p className='text-sm'>Delete</p>
        </div>
      </AlertDialogTrigger>
      {loading ? (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deleting...</AlertDialogTitle>
            <AlertDialogDescription>
              Please wait while we delete this exam card.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      ) : (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this exam card?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              Question.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='bg-destructive hover:bg-destructive/90'
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
