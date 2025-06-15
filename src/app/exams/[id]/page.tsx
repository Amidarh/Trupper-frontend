/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useExamService } from '@/modules/exam/services';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useExamTypeService } from '@/modules/examTypes/services';
import { ExamTypes } from '@/types/examTypes.types';
import ImageUpload from '@/core/commons/components/imageUpload';
import Image from 'next/image';
import DeleteExamButton from '@/modules/exam/components/modal/delete';
import { CreateExamCategoryModal } from '@/modules/exam/components/modal/createExamCategory';
import { ViewExamCategoryModal } from '@/modules/exam/components/modal/viewExamCategory';

const EditExam = () => {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      watch,
      reset,
    },
    editExam,
    getSingleExam,
    singleExam,
    getExamCategories,
    examCategoryList,
    examCategoryLoading
  } = useExamService();

  const image = watch('image');
  const { id } = useParams<{ id: string }>();
  const [edit, setEdit] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<string>('0');
  const [selectedExamType, setSelectedExamType] = useState<
    ExamTypes | undefined
  >(undefined);
  const { data: examTypes, isLoading: examTypeLoading } = useExamTypeService();

  const onSubmit = async (data: any) => {
    try {
      if (!id) return;
      await editExam({ id, data });
      // toast.success("Exam updated successfully");
      setEdit(false);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update Exam');
    }
  };

  useEffect(() => {
    if (id) {
      getSingleExam(id);
      getExamCategories(id);
    }
  }, [id]);

  useEffect(() => {
    if (singleExam && examTypes) {
      reset({
        name: singleExam.name,
        acronym: singleExam.acronym,
        examType: singleExam.examType.id,
        image: singleExam.image, // Keep as is, assuming ImageUpload can handle string or File
        status: singleExam.status || false,
        duration: singleExam.duration,
        subjectToBeWritten: Number(singleExam.subjectToBeWritten),
        noOfQuestions: Number(singleExam.noOfQuestions),
        maxNoOfSubjects: Number(singleExam.maxNoOfSubjects),
        minNoOfSubjects: Number(singleExam.minNoOfSubjects),
        scoreMultiplier: Number(singleExam.scoreMultiplier),
      });
      setIsActive(singleExam.status || false);
      setSelectedDuration(singleExam.duration || '0');
      setSelectedExamType(
        examTypes.find((et) => et.id === singleExam.examType.id)
      );
    }
  }, [singleExam, examTypes, reset]);

  return (
    <DashboardLayout pageTitle='View And Edit an Exam'>
      <Card className='p-4 mb-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex justify-between items-center mb-4'>
            <BackButton title='Exams' />
            <div className='flex gap-2'>
              {!edit && (
                <Button type='button' onClick={() => setEdit(true)}>
                  Edit Exam
                </Button>
              )}
              {edit && (
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  onClick={() => console.log(errors)}
                >
                  {isSubmitting ? 'Updating...' : 'Update Exam'}
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
                <DeleteExamButton id={singleExam?.id} />
              )}
            </div>
          </div>
          <div className='flex justify-start flex-col w-fit items-start'>
            {edit ? (
              <ImageUpload
                value={image}
                onChange={(file) => {
                  if (file) {
                    setValue('image', file, { shouldValidate: true });
                  }
                }}
                error={errors.image?.message as string}
                disabled={!edit}
              />
            ) : (
              <div className='relative h-24 w-24 border rounded-sm'>
                <Image
                  src={
                    typeof singleExam?.image === 'string'
                      ? singleExam.image
                      : ''
                  }
                  alt='Selected image preview'
                  width={96}
                  height={96}
                  className='object-contain rounded-md h-24 w-24'
                  priority
                />
              </div>
            )}
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
                disabled={!edit}
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
                disabled={!edit}
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
                value={selectedExamType?.id || singleExam?.examType?.id || ''}
                disabled={!edit || examTypeLoading || !examTypes?.length}
              >
                <SelectTrigger className='w-full h-12' id='examType'>
                  <SelectValue
                    placeholder={
                      examTypeLoading
                        ? 'Loading...'
                        : singleExam?.examType?.name || 'Select Exam Type'
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
                Duration
              </Label>
              <Select
                onValueChange={(value) => {
                  setSelectedDuration(value);
                  setValue('duration', value, { shouldValidate: true });
                }}
                value={selectedDuration}
                disabled={!edit}
              >
                <SelectTrigger className='w-full h-12' id='duration'>
                  <SelectValue
                    placeholder={
                      examTypeLoading
                        ? 'Loading...'
                        : singleExam?.duration || 'Select Exam Duration'
                    }
                  />
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
                disabled={!edit}
              />
              {errors.subjectToBeWritten && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.subjectToBeWritten.message}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <Label htmlFor='noOfQuestions' className='mb-2'>
                No. of Questions
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
                disabled={!edit}
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
                disabled={!edit}
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
                disabled={!edit}
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
                disabled={!edit}
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
                disabled={!edit}
              />
            </div>
            {errors.status && (
              <p className='text-red-500 text-sm'>{errors.status.message}</p>
            )}
          </div>
        </form>
        <Separator className='my-5' />
        <div>
          <h1 className='text-xl'>Exam Categories</h1>
          <div className='flex flex-row gap-2 items-center py-2'>
            {!examCategoryLoading ? examCategoryList &&
              examCategoryList.map((category) => (
                <ViewExamCategoryModal key={category.id} category={category} />
              )) : <p>loading...</p>}
            <CreateExamCategoryModal />
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default EditExam;
