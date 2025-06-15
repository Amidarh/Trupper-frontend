'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { BackButton } from '@/core/commons/navigation/backButton';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useExamTypeService } from '@/modules/examTypes/services';

const CreateExamType = () => {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
    },
    createExamType,
  } = useExamTypeService();

  const [isActive, setIsActive] = useState(false);
  return (
    <DashboardLayout pageTitle='Create Exam type'>
      <Card>
        <form onSubmit={handleSubmit(createExamType)}>
          <CardHeader className='flex flex-row justify-between items-center'>
            <BackButton title='Exam Types' />

            <div className='flex flex-row gap-2 items-center'>
              {isSubmitting ? (
                <Button>Creating...</Button>
              ) : (
                <Button type='submit'>Create</Button>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <Separator className='my-5' />

            <main className='grid sm:grid-cols-2 grid-cols-1 gap-5'>
              <div className='mb-4'>
                <Label className='mb-2'>Name</Label>
                <Input
                  placeholder='Enter Category name'
                  className='h-12'
                  {...register('name')}
                />
                {errors.name && (
                  <p className='text-red-500 text-sm'>{errors.name.message}</p>
                )}
              </div>
            </main>
            <div>
              <h1 className='text-xl'>Status</h1>
              <div className='flex flex-row gap-4 mt-2 items-center'>
                <p className=''>Active</p>
                <Switch
                  checked={isActive} // Control Switch with local state
                  onCheckedChange={(checked) => {
                    setIsActive(checked); // Update local state
                    setValue('status', checked, { shouldValidate: true }); // Update form state with boolean
                  }}
                />
              </div>
              {errors.status && (
                <p className='text-red-500 text-sm'>{errors.status.message}</p>
              )}
            </div>
          </CardContent>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default CreateExamType;
