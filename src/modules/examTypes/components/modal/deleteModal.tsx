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
import { useExamTypeService } from '../../services';
import { Trash2 } from 'lucide-react';

export default function DeleteExamTypeButton({
  id,
}: {
  id: string | undefined;
}) {
  const { deleteExamType, singleExamTypeLoading } = useExamTypeService();

  const handleDelete = useCallback(async () => {
    await deleteExamType(id);
  }, [deleteExamType, id]);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className='cursor-pointer'>
          <Trash2 />
          <p>Delete Exam Type</p>
        </Button>
      </AlertDialogTrigger>
      {singleExamTypeLoading ? (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deleting...</AlertDialogTitle>
            <AlertDialogDescription>
              Please wait while we delete the exam type.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      ) : (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this Exam Type?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              Exam Type.
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
