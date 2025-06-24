'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { BackButton } from '@/core/commons/navigation/backButton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DurationData } from '@/constants/data';
import { useExamService } from '@/modules/exams/services';
import { useState, useCallback } from 'react';
import { ExamFormData } from '@/modules/exams/schema';
import { useExamTypeService } from '@/modules/examTypes/services';
import { ExamTypes } from '@/types/examTypes.types';
import ImageUpload from '@/core/commons/components/imageUpload';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CreateExam = () => {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      watch,
    },
    createExam,
    serverError,
  } = useExamService();
  const image = watch('image');

  const { data: examTypes, isLoading: examTypeLoading } = useExamTypeService();
  const [selectedExamType, setSelectedExamType] = useState<
    ExamTypes | undefined
  >(undefined);
  const [selectedDuration, setSelectedDuration] = useState<string>('0');
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const onSubmit = useCallback(
    async (data: ExamFormData) => {
      try {
        if (!image) {
          toast.error('Please select an image');
          return;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('acronym', data.acronym);
        formData.append('examType', data.examType);
        formData.append('duration', data.duration);
        formData.append(
          'subjectToBeWritten',
          data.subjectToBeWritten.toString()
        );
        formData.append('noOfQuestions', data.noOfQuestions.toString());
        formData.append('maxNoOfSubjects', data.maxNoOfSubjects.toString());
        formData.append('minNoOfSubjects', data.minNoOfSubjects.toString());
        formData.append('scoreMultiplier', data.scoreMultiplier.toString());
        formData.append('status', data.status ? 'true' : 'false');
        formData.append('image', image);

        await createExam(formData);
      } catch (error) {
        console.error('Failed to create exam:', error);
        toast.error(serverError || 'Failed to create exam');
      }
    },
    [createExam, image, serverError]
  );

  return (
    <DashboardLayout pageTitle='Create an exam'>
      <Card className='p-4 mb-4'>
        <div className='flex justify-between items-center mb-4'>
          <BackButton title='Exams' />
          <Button type='submit' form='examForm' disabled={isSubmitting}>
            {isSubmitting ? 'Creating Exam...' : 'Create Exam'}
          </Button>
        </div>

        <form id='examForm' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex justify-start flex-col w-fit items-start'>
            <ImageUpload
              value={image}
              onChange={(file) => {
                if (file) {
                  setValue('image', file, { shouldValidate: true });
                }
              }}
              error={errors.image?.message}
            />
          </div>

          <Separator className='my-5' />

          <main className='grid sm:grid-cols-2 grid-cols-1 gap-5'>
            <div className='mb-4'>
              <Label htmlFor='name' className='mb-2'>
                Full Name
              </Label>
              <Input
                type='text'
                id='name'
                placeholder='Enter Exam Full Name'
                className='h-12'
                {...register('name')}
              />
              {errors.name && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <Label htmlFor='acronym' className='mb-2'>
                Acronym
              </Label>
              <Input
                type='text'
                id='acronym'
                placeholder='Enter Exam Acronym'
                className='h-12'
                {...register('acronym')}
              />
              {errors.acronym && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.acronym.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor='examType' className='mb-2'>
                Exam Type
              </Label>
              <Select
                onValueChange={(value) => {
                  const examType = examTypes?.find((cat) => cat.id === value);
                  setSelectedExamType(examType);
                  setValue('examType', value, { shouldValidate: true });
                }}
                value={selectedExamType?.id || ''}
                // disabled={examTypeLoading || !examTypes?.length}
              >
                <SelectTrigger className='w-full h-12'>
                  <SelectValue
                    placeholder={
                      examTypeLoading ? 'Loading...' : 'Select Exam Type'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {examTypes?.map((examType) => (
                      <SelectItem key={examType.id} value={examType.id}>
                        {examType.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  {examTypes && examTypes.length <= 0 && (
                    <div className='flex flex-row items-center justify-center py-4'>
                      <Button
                        className='text-xs px-2 py-3 rounded-full h-5'
                        onClick={() => router.push('/exam-types/create')}
                      >
                        Create ExamType
                      </Button>
                    </div>
                  )}
                </SelectContent>
              </Select>
              {errors.examType && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.examType.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor='duration' className='mb-2'>
                Exam Duration
              </Label>
              <Select
                onValueChange={(value) => {
                  setSelectedDuration(value);
                  setValue('duration', value, { shouldValidate: true });
                }}
                value={selectedDuration}
              >
                <SelectTrigger className='w-full h-12'>
                  <SelectValue placeholder='Select Exam Duration' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {DurationData.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.duration && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.duration.message}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <Label htmlFor='subjectToBeWritten' className='mb-2'>
                No. of Subjects to be Written at a Time
              </Label>
              <Input
                type='number'
                id='subjectToBeWritten'
                placeholder='Enter No. of Subjects'
                className='h-12'
                {...register('subjectToBeWritten', {
                  valueAsNumber: true,
                  validate: (value) =>
                    Number.isInteger(value) || 'Must be an integer',
                })}
              />
              {errors.subjectToBeWritten && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.subjectToBeWritten.message}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <Label htmlFor='noOfQuestions' className='mb-2'>
                No. of Questions Per Exam
              </Label>
              <Input
                type='number'
                id='noOfQuestions'
                placeholder='Enter No. of Questions'
                className='h-12'
                {...register('noOfQuestions', {
                  valueAsNumber: true,
                  validate: (value) =>
                    Number.isInteger(value) || 'Must be an integer',
                })}
              />
              {errors.noOfQuestions && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.noOfQuestions.message}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <Label htmlFor='maxNoOfSubjects' className='mb-2'>
                Max No. of Subjects
              </Label>
              <Input
                type='number'
                id='maxNoOfSubjects'
                placeholder='Enter Max No. of Subjects'
                className='h-12'
                {...register('maxNoOfSubjects', {
                  valueAsNumber: true,
                  validate: (value) =>
                    Number.isInteger(value) || 'Must be an integer',
                })}
              />
              {errors.maxNoOfSubjects && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.maxNoOfSubjects.message}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <Label htmlFor='minNoOfSubjects' className='mb-2'>
                Min No. of Subjects
              </Label>
              <Input
                type='number'
                id='minNoOfSubjects'
                placeholder='Enter Min No. of Subjects'
                className='h-12'
                {...register('minNoOfSubjects', {
                  valueAsNumber: true,
                  validate: (value) =>
                    Number.isInteger(value) || 'Must be an integer',
                })}
              />
              {errors.minNoOfSubjects && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.minNoOfSubjects.message}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <Label htmlFor='scoreMultiplier' className='mb-2'>
                Score Multiplier
              </Label>
              <Input
                type='number'
                id='scoreMultiplier'
                placeholder='Enter Score Multiplier'
                className='h-12'
                {...register('scoreMultiplier', {
                  valueAsNumber: true,
                  validate: (value) =>
                    Number.isInteger(value) || 'Must be an integer',
                })}
              />
              {errors.scoreMultiplier && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.scoreMultiplier.message}
                </p>
              )}
            </div>
          </main>
          <Separator className='my-5' />
          <div>
            <h1 className='text-xl'>Status</h1>
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
            {errors.status && (
              <p className='text-red-500 text-sm'>{errors.status.message}</p>
            )}
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default CreateExam;
