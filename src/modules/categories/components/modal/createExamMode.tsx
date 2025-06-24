'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useExamService } from '@/modules/exams/services';
import { ExamType } from '@/types/exam.types';
import { useState } from 'react';
import { useExamModeService } from '../../services/examModeService';
import { ExamModeFormData } from '../../schema/categoriesSchema';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';

export function CreateExamModeModal() {
  const [selectedExam, setSelectedExam] = useState<ExamType>();
  const { data: exams, isLoading: examLoading } = useExamService();
  const { id } = useParams<{ id: string }>();

  const {
    form: {
      register,
      formState: { isSubmitting, errors },
      handleSubmit,
      setValue,
    },
    createExamMode,
  } = useExamModeService();

  const onSubmit = async (data: ExamModeFormData) => {
    try {
      createExamMode({
        name: data.name,
        exam: data.exam,
        subCategory: id,
      });
    } catch (error) {
      toast.error((error as Error).message || 'Failed to update Exam');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Plus />
          <p>Create Exam Mode</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className='flex flex-row items-center justify-between'>
          <h2>Create an exam mode</h2>
          <AlertDialogCancel className='border-none p-0 m-0 w-fit bg-transparent'>
            <XCircle />
          </AlertDialogCancel>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <Label htmlFor='subjectToBeWritten' className='mb-2'>
              Mode name
            </Label>
            <Input
              id='categoryName'
              placeholder='Enter Category Name'
              className='h-12'
              {...register('name')}
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div className='mb-5'>
            <Label className='mb-2'>Exam</Label>
            <Select
              onValueChange={(value) => {
                const exam = exams?.find((e) => e.id === value);
                setSelectedExam(exam);
                setValue('exam', value, { shouldValidate: true });
              }}
              value={selectedExam?.id || ''}
              disabled={examLoading || !exams?.length}
            >
              <SelectTrigger className='w-full h-12'>
                <SelectValue
                  placeholder={examLoading ? 'Loading...' : 'Select exam'}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {exams?.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.exam && (
              <p className='text-red-500 text-sm'>{errors.exam.message}</p>
            )}
          </div>
          <div className='flex items-end justify-end'>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
