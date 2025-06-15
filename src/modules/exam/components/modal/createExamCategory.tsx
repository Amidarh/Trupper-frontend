'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Plus, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MultiSelect } from '@/components/ui/multiSelect';
import { useEffect, useState } from 'react';
import { useSubjectService } from '@/modules/subjects/services';
import { SubjectType } from '@/types/subject.types';
import { useParams } from 'next/navigation';
import { ExamCategoryFormData } from '../../schema/examCategory';
import { useExamService } from '../../services';

export function CreateExamCategoryModal() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { getSubjectByExam, subjectList } = useSubjectService();
  const { id } = useParams<{ id: string }>();
  const {
    createExamCategory,
    examCategoryForm: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
    },
  } = useExamService();

  useEffect(() => {
    getSubjectByExam(id);
  }, []);

  function mapSubjectsToOptions(subjects: SubjectType[]) {
    return subjects.map((subject) => ({
      value: subject.id,
      label: subject.name,
    }));
  }

  const handleCategory = async (data: ExamCategoryFormData) => {
    try {
      createExamCategory({
        name: data.name,
        exam: id,
        subjects: (subjectList ?? [])
          .filter((subject) => selected.includes(subject.id))
          .map((subject) => ({ value: subject.name, id: subject.id })),
        status: isActive,
      });
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='rounded-full'>
          <Plus />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className='flex flex-row items-center justify-between'>
          <h2>Create exam category</h2>
          <AlertDialogCancel className='border-none p-0 m-0 w-fit bg-transparent'>
            <XCircle />
          </AlertDialogCancel>
        </div>
        <form onSubmit={handleSubmit(handleCategory)}>
          <div className='mb-4'>
            <Label htmlFor='subjectToBeWritten' className='mb-2'>
              Category Name
            </Label>
            <Input
              id='categoryName'
              placeholder='Enter Category Name'
              className='h-12'
              {...register('name')}
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
            )}
          </div>
          <div className='mb-4'>
            <Label htmlFor='subjectToBeWritten' className='mb-2'>
              Subjects (select category subjects)
            </Label>
            <MultiSelect
              name='Select Subjects'
              options={mapSubjectsToOptions(subjectList ?? [])}
              onChange={(e) => {
                setSelected(e);
                const mappedSubjects = e.map((id) => ({ value: id, id }));
                setValue('subjects', mappedSubjects, { shouldValidate: true });
              }}
              value={selected}
              // { ...register("subjects") }
            />
          </div>
          <div>
            <Label className='text-xl'>Status</Label>
            <div className='flex flex-row gap-5 items-center'>
              <p className='text-sm'>Active</p>
              <Switch
                checked={isActive}
                onCheckedChange={(checked) => {
                  setIsActive(checked);
                  setValue('status', checked, { shouldValidate: true });
                }}
              />
            </div>
          </div>
          <div className='flex items-end justify-end'>
            <Button type='submit' disabled={isSubmitting}>
              Create Category
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
