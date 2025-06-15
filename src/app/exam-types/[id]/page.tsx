'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { BackButton } from '@/core/commons/navigation/backButton';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useExamTypeService } from '@/modules/examTypes/services';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ExamTypeFormData } from '@/modules/examTypes/schema';
import DeleteExamTypeButton from '@/modules/examTypes/components/modal/deleteModal';

const ViewExamType = () => {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      watch,
      reset,
    },
    singleExamTypeLoading,
    singleExamType,
    getSingleExamType,
    deleteExamType,
    editExamType,
  } = useExamTypeService();

  const { id } = useParams();
  const [edit, setEdit] = useState(false);

  // Watch status from form state
  const status = watch('status');

  useEffect(() => {
    if (singleExamType) {
      reset({
        name: singleExamType.name,
        status: singleExamType.status,
      });
    }
  }, [singleExamType, reset]);

  useEffect(() => {
    if (typeof id === 'string') {
      getSingleExamType(id);
    }
  }, [id]);

  const handleEditState = () => {
    if (edit && singleExamType) {
      reset({
        name: singleExamType.name,
        status: singleExamType.status,
      });
    }
    setEdit(!edit);
  };

  const onSubmit = async (data: ExamTypeFormData) => {
    try {
      console.log({ data });
      await editExamType({ id: singleExamType?.id, data });
      setEdit(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <DashboardLayout pageTitle='Create Exam type'>
      <Card>
        <CardHeader className='flex flex-row justify-between items-center'>
          <BackButton title='Exam Types' />

          <div className='flex flex-row gap-2 items-center'>
            <div className='flex gap-2 flex-row'>
              {edit && (
                <Button
                  type='submit'
                  form='categoryForm'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update Category'}
                </Button>
              )}
              {!edit && (
                <Button
                  onClick={handleEditState}
                  disabled={singleExamTypeLoading}
                >
                  Edit Category
                </Button>
              )}
              {edit ? (
                <Button variant='destructive' onClick={handleEditState}>
                  Cancel
                </Button>
              ) : (
                <DeleteExamTypeButton id={singleExamType?.id} />
              )}
            </div>
          </div>
        </CardHeader>

        <form
          id='categoryForm'
          onSubmit={handleSubmit(onSubmit)}
          className='px-4'
        >
          <Separator className='my-5' />

          <main className='grid sm:grid-cols-2 grid-cols-1 gap-5'>
            <div className='mb-4'>
              <Label htmlFor='categoryName' className='mb-2'>
                Name
              </Label>
              <Input
                type='text'
                id='categoryName'
                placeholder='Enter Category Name'
                className='h-12'
                disabled={!edit}
                {...register('name', { required: 'Category name is required' })}
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name.message}</p>
              )}
            </div>
          </main>

          <div>
            <h1 className='text-xl'>Status</h1>
            <div className='flex flex-row items-center gap-2.5 mt-5'>
              <Label htmlFor='statusSwitch' className='text-sm'>
                Active
              </Label>
              <Switch
                id='statusSwitch'
                checked={status}
                onCheckedChange={(checked) =>
                  setValue('status', checked, { shouldValidate: true })
                }
                disabled={!edit}
              />
            </div>
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default ViewExamType;
