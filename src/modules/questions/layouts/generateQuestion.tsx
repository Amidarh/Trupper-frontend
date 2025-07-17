'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
import { UploadCloud } from 'lucide-react';
import { BackButton } from '@/core/commons/navigation/backButton';
import { Separator } from '@/components/ui/separator';
import FileUpload from '@/core/commons/components/upload/fileUpload';
import { useExamService } from '@/modules/exams/services';
import { useSubjectService } from '@/modules/subjects/services';
import { useQuestionService } from '../services';
import { toast } from 'sonner';
import { ExamType, SubjectType } from '@/types';
import { questionTypeData, questionCategoryData } from '@/constants/question';
// Removed: import { register } from 'module'; // <-- This is a bug, it shadows the register from react-hook-form
import { GenerateQuestionFormData } from '../schemas';

export function GenerateQuestionLayout() {
  // Fixed typo: GeneratQuestionLayout -> GenerateQuestionLayout
  const [selectedExam, setSelectedExam] = useState<ExamType>();
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>();
  const [selectedQuestionType, setSelectedQuestionType] = useState<{
    name: string;
    label: string;
  }>();
  const [selectedQuestionCategory, setSelectedQuestionCategory] = useState<{
    name: string;
    label: string;
  }>();
  const [upload, setUpload] = useState<File | null>(null);
  const { data: exams, isLoading: examLoading } = useExamService();
  const { getSubjectByExam, subjectList, subjectListLoading } =
    useSubjectService();

  const {
    generateQuestionForm: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      watch,
    },
    generateQuestion,
    serverError,
  } = useQuestionService({});

  const onSubmit = useCallback(
    async (data: GenerateQuestionFormData) => {
      try {
        console.log({ data });
        const formData = new FormData();
        formData.append('exam', data.exam);
        formData.append('subject', data.subject);
        formData.append('questionType', data.questionType);
        formData.append('noOfQuestions', String(data.noOfQuestions));
        formData.append('questionCategory', data.questionCategory);
        if (upload) {
          formData.append('files', upload);
        }
        await generateQuestion(formData);
      } catch (error: any) {
        console.error('Failed to create question:', error);
        toast.error(serverError || 'Failed to create question');
      }
    },
    [serverError, generateQuestion, upload]
  );

  return (
    <Card>
      <form className='py-0 px-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-row justify-between items-center'>
          <BackButton title='Back to Questions' />
          <Button
            type='submit'
            disabled={isSubmitting}
            onClick={() => console.log({ errors })}
            className='flex gap-2'
          >
            <UploadCloud className='w-4 h-4' />
            {isSubmitting ? 'Generating...' : 'Generate Questions'}
          </Button>
        </div>
        <Separator className='my-5' />
        <main className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <div>
            <Label className='mb-2'>Exam</Label>
            <Select
              onValueChange={(value) => {
                const exam = exams?.find((e) => e.id === value);
                setSelectedExam(exam);
                getSubjectByExam(exam?.id);
                setValue('exam', value, { shouldValidate: true });
                // Reset subject when exam changes
                setSelectedSubject(undefined);
                setValue('subject', '', { shouldValidate: true });
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
          <div>
            <Label className='mb-2'>Subject</Label>
            <Select
              onValueChange={(value) => {
                const subject = subjectList?.find((s) => s.id === value);
                setSelectedSubject(subject);
                setValue('subject', value, { shouldValidate: true });
              }}
              value={selectedSubject?.id || ''}
              disabled={subjectListLoading || !subjectList?.length}
            >
              <SelectTrigger className='w-full h-12'>
                <SelectValue placeholder='Select subject' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {subjectList?.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.subject && (
              <p className='text-red-500 text-sm'>{errors.subject.message}</p>
            )}
          </div>
          <div>
            <Label className='mb-2'>Question Type</Label>
            <Select
              onValueChange={(value) => {
                const type = questionTypeData?.find((q) => q.name === value);
                setSelectedQuestionType(type);
                setValue('questionType', value, { shouldValidate: true });
              }}
              value={selectedQuestionType?.name || ''}
            >
              <SelectTrigger className='w-full h-12'>
                <SelectValue placeholder='Select question type' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {questionTypeData?.map((type) => (
                    <SelectItem key={type.name} value={type.name}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.questionType && (
              <p className='text-red-500 text-sm'>
                {errors.questionType.message}
              </p>
            )}
          </div>
          <div>
            <Label className='mb-2'>Number Of Questions</Label>
            <Input
              type='number'
              min={1}
              max={25}
              {...register('noOfQuestions', { valueAsNumber: true })}
            />
            {errors.noOfQuestions && (
              <p className='text-red-500 text-sm'>
                {errors.noOfQuestions.message}
              </p>
            )}
          </div>
          <div>
            <Label className='mb-2'>Questions Category</Label>
            <Select
              onValueChange={(value) => {
                const type = questionCategoryData?.find(
                  (q) => q.name === value
                );
                setSelectedQuestionCategory(type);
                setValue('questionCategory', value, { shouldValidate: true });
              }}
              value={selectedQuestionCategory?.name || ''}
            >
              <SelectTrigger className='w-full h-12'>
                <SelectValue placeholder='Select question type' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {questionCategoryData?.map((type) => (
                    <SelectItem key={type.name} value={type.name}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.questionCategory && (
              <p className='text-red-500 text-sm'>
                {errors.questionCategory.message}
              </p>
            )}
          </div>
          <div />
          <div>
            <FileUpload
              value={upload}
              onChange={(e) => {
                if (e) {
                  setValue('files', e, { shouldValidate: true });
                  setUpload(e);
                }
              }}
              height={400}
              error={errors.files?.message}
            />
            {errors.files && (
              <p className='text-red-500 text-sm'>{errors.files.message}</p>
            )}
          </div>
        </main>
      </form>
    </Card>
  );
}
