'use client';

import { useState, useCallback } from 'react';
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
import { useCodeService } from '../../services';

export default function DeleteCodeModal({
  id,
  code,
}: {
  id: string;
  code: string;
}) {
  const { deleteCode, singleCodeLoading } = useCodeService();

  const handleDelete = useCallback(async () => {
    await deleteCode(id);
  }, [deleteCode, id]);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className='cursor-pointer'>
          Delete
        </Button>
      </AlertDialogTrigger>
      {singleCodeLoading ? (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deleting...</AlertDialogTitle>
            <AlertDialogDescription>
              Please wait while we delete the code.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      ) : (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this code?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              code.
            </AlertDialogDescription>
            <AlertDialogDescription>Code: {code}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='bg-red-600 hover:bg-red-700'
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
