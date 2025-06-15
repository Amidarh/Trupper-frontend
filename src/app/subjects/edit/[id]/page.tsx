'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { BackButton } from '@/core/commons/navigation/backButton';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useExamService } from '@/modules/exam/services';
import { useEffect, useState } from 'react';
import { ExamType } from '@/types/exam.types';
import { useSubjectService } from '@/modules/subjects/services';
import { SubjectFormData } from '@/modules/subjects/schemas';
import { useParams } from 'next/navigation';
import DeleteSubjectButton from '@/modules/subjects/components/modal/deleteModal';

const ViewSubject = () => {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      reset,
    },
    editSubject,
    singleSubject,
    getSingleSubject,
  } = useSubjectService();
  const [edit, setEdit] = useState(false);
  const { data: exams, isLoading } = useExamService();
  const [isActive, setIsActive] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamType | undefined>(
    undefined
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getSingleSubject(id);
    }
  }, [id]);

  useEffect(() => {
    if (singleSubject) {
      reset({
        name: singleSubject.name,
        status: singleSubject.status || false,
        exam: singleSubject.exam.id || '',
      });
      setIsActive(singleSubject.status || false);
      setSelectedExam(exams?.find((cat) => cat.id === singleSubject.exam?.id));
    }
  }, [singleSubject, reset]);

  const onSubmit = async (data: SubjectFormData) => {
    try {
      console.log({ data });
      await editSubject({ id: singleSubject?.id, data });
      setEdit(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <DashboardLayout
      pageTitle='Edit Subject'
      subHeading='Create subject for exams'
    >
      <Card>
        <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className='flex flex-row justify-between items-center p-0'>
            <BackButton title='Subjects' />

            <div className='flex flex-row gap-2 items-center'>
              {!edit && (
                <Button type='button' onClick={() => setEdit(true)}>
                  Edit Subject
                </Button>
              )}
              {edit && (
                <Button type='submit' disabled={isSubmitting}>
                  {isSubmitting ? 'Updating...' : 'Update Subject'}
                </Button>
              )}
              {edit ? (
                <Button
                  type='button'
                  variant='destructive'
                  onClick={() => setEdit(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              ) : (
                <DeleteSubjectButton id={singleSubject?.id} />
              )}
            </div>
          </CardHeader>

          <Separator className='my-5' />

          <main className='grid sm:grid-cols-2 grid-cols-1 gap-5'>
            <div className='mb-4'>
              <Label htmlFor='email' className='mb-2'>
                Subject Name
              </Label>
              <Input
                type='text'
                id='name'
                placeholder='Enter Subject Name'
                className='h-12'
                {...register('name')}
                disabled={!edit}
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor='email' className='mb-2'>
                Exam
              </Label>
              <Select
                onValueChange={(value) => {
                  setSelectedExam(exams?.find((cat) => cat.id === value));
                  setValue('exam', value, { shouldValidate: true });
                }}
                value={isLoading ? 'Loading....' : selectedExam?.id || ''}
                disabled={!edit}
              >
                <SelectTrigger className='w-full h-12'>
                  <SelectValue placeholder='Select Category' />
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
          </main>
          <div>
            <h1 className='text-xl'>Status</h1>
            <div className='flex flex-row gap-4 mt-2 items-center'>
              <p className=''>Active</p>
              <Switch
                checked={isActive}
                onCheckedChange={(checked) => {
                  setIsActive(checked);
                  setValue('status', checked, { shouldValidate: true });
                }}
                disabled={!edit}
              />
            </div>
            {errors.status && (
              <p className='text-red-500 text-sm'>{errors.status.message}</p>
            )}
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default ViewSubject;
