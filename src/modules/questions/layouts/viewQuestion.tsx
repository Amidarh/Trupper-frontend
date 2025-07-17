/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/core/commons/navigation/backButton';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import RichTextEditor from '@/core/commons/components/richTextEditor';
import ImageUploadTwo from '@/core/commons/components/upload/imageUploadTwo';
import DeleteQuestionButton from '../components/modal/delete';

import { useExamService } from '@/modules/exams/services';
import { useSubjectService } from '@/modules/subjects/services';
import { useQuestionService } from '../services';

import { toast } from 'sonner';
import { questionTypeData, questionObject } from '@/constants/question';
// import { QuestionFormData } from '../schemas';
import { ExamType } from '@/types/exam.types';
import { SubjectType } from '@/types/subject.types';
import { useParams } from 'next/navigation';

export const ViewQuestion = () => {
  const [selectedExam, setSelectedExam] = useState<ExamType>();
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>();
  const [selectedQuestionType, setSelectedQuestionType] = useState<{
    name: string;
    label: string;
  }>();
  const [selectedAnswer, setSelectedAnswer] = useState<{
    name: string;
    label: string;
  }>();
  const { id } = useParams<{ id: string }>();
  const [edit, setEdit] = useState(false);

  const {
    form: {
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      watch,
      reset,
    },
    editQuestion,
    singleQuestion,
    // singleQuestionLoading,
    // deleteQuestion,
    getQuestion,
  } = useQuestionService({});

  const image = watch('image');
  const section = watch('section');
  const question = watch('question');
  const a = watch('a');
  const b = watch('b');
  const c = watch('c');
  const d = watch('d');
  const reason = watch('reason');

  const { data: exams, isLoading: examLoading } = useExamService();
  const { getSubjectByExam, subjectList, subjectListLoading } =
    useSubjectService();

  useEffect(() => {
    if (id) {
      getQuestion(id);
    }
  }, [id]);

  useEffect(() => {
    if (singleQuestion && exams) {
      getSubjectByExam(singleQuestion.exam.id);
      reset({
        subject: singleQuestion.subject.id,
        exam: singleQuestion.exam.id,
        reason: singleQuestion.reason,
        a: singleQuestion.options?.a,
        b: singleQuestion.options?.b,
        c: singleQuestion.options?.c,
        d: singleQuestion.options?.d,
        answer: singleQuestion.answer,
        section: singleQuestion.section,
        questionType: singleQuestion.questionType,
        image: singleQuestion.image,
      });
      setSelectedExam(exams.find((exam) => exam.id === singleQuestion.exam.id));
      setSelectedSubject(
        subjectList?.find((subject) => subject.id === singleQuestion.subject.id)
      );
      setSelectedQuestionType(
        questionTypeData.find(
          (questionType) => questionType.name === singleQuestion.questionType
        )
      );
    }
  }, [singleQuestion, exams, reset]);

  const onSubmit = async (data: any) => {
    try {
      if (!id) return;
      console.log({ data });
      await editQuestion(id, data);
      console.log({ data });
      setEdit(false);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update Exam');
    }
  };

  return (
    <Card>
      <form className='py-0 px-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-row items-center justify-between'>
          <BackButton title='Questions' />
          <div className='flex gap-2'>
            {!edit && (
              <Button type='button' onClick={() => setEdit(true)}>
                Edit Question
              </Button>
            )}
            {edit && (
              <Button
                type='submit'
                disabled={isSubmitting}
                onClick={() => console.log(errors)}
              >
                {isSubmitting ? 'Updating...' : 'Update Question'}
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
              <DeleteQuestionButton id={singleQuestion?.id} />
            )}
          </div>
        </div>

        <Separator className='my-5' />

        <main className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          {/* Exam Select */}
          <div>
            <Label className='mb-2'>Exam</Label>
            <Select
              onValueChange={(value) => {
                const exam = exams?.find((e) => e.id === value);
                setSelectedExam(exam);
                getSubjectByExam(exam?.id);
                setValue('exam', value, { shouldValidate: true });
              }}
              value={selectedExam?.id || singleQuestion?.exam.id || ''}
              disabled={!edit || examLoading || !exams?.length}
            >
              <SelectTrigger className='w-full h-12'>
                <SelectValue
                  placeholder={
                    examLoading
                      ? 'Loading...'
                      : singleQuestion?.exam.name || 'Select exam'
                  }
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

          {/* Subject Select */}
          <div>
            <Label className='mb-2'>Subject</Label>
            <Select
              onValueChange={(value) => {
                const subject = subjectList?.find((s) => s.id === value);
                setSelectedSubject(subject);
                setValue('subject', value, { shouldValidate: true });
              }}
              value={selectedSubject?.id || ''}
              disabled={!edit || subjectListLoading || !subjectList?.length}
            >
              <SelectTrigger className='w-full h-12'>
                <SelectValue
                  placeholder={singleQuestion?.subject.name || 'Select subject'}
                />
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

          {/* Question Type */}
          <div>
            <Label className='mb-2'>Question Type</Label>
            <Select
              onValueChange={(value) => {
                const type = questionTypeData?.find((q) => q.name === value);
                setSelectedQuestionType(type);
                setValue('questionType', value, { shouldValidate: true });
              }}
              value={selectedQuestionType?.name || ''}
              disabled={!edit}
            >
              <SelectTrigger className='w-full h-12'>
                <SelectValue
                  placeholder={
                    selectedQuestionType?.name ??
                    singleQuestion?.questionType ??
                    'Select question type'
                  }
                />
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

          {/* Answer */}
          <div>
            <Label className='mb-2'>Answer</Label>
            <Select
              onValueChange={(value) => {
                const answer = questionObject?.find((a) => a.name === value);
                setSelectedAnswer(answer);
                setValue('answer', value, { shouldValidate: true });
              }}
              value={selectedAnswer?.name || singleQuestion?.answer || ''}
              disabled={!edit}
            >
              <SelectTrigger className='w-full h-20'>
                <SelectValue
                  placeholder={singleQuestion?.answer ?? 'Select answer'}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {questionObject?.map((a) => (
                    <SelectItem key={a.name} value={a.name}>
                      {a.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.answer && (
              <p className='text-red-500 text-sm'>{errors.answer.message}</p>
            )}
          </div>
        </main>

        <Separator className='my-5' />

        {/* Rich Text Fields */}
        <main className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <div className='mb-4'>
            <Label className='mb-2'>Section</Label>
            <RichTextEditor
              content={section}
              onChange={(e) => setValue('section', e, { shouldValidate: true })}
              disabled={!edit}
            />
            {errors.section && (
              <p className='text-red-500 text-sm'>{errors.section.message}</p>
            )}
          </div>

          <div className='mb-4'>
            <ImageUploadTwo
              value={image}
              onChange={(file) => {
                if (file) {
                  setValue('image', file, { shouldValidate: true });
                }
              }}
              error={errors.image?.message}
            />
          </div>
        </main>

        <div className='mb-4'>
          <Label className='mb-2'>Question</Label>
          <RichTextEditor
            content={singleQuestion?.question || question}
            onChange={(e) => setValue('question', e, { shouldValidate: true })}
            disabled={!edit}
          />
          {errors.question && (
            <p className='text-red-500 text-sm'>{errors.question.message}</p>
          )}
        </div>

        <main className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <div>
            <Label className='mb-2'>Option A</Label>
            <RichTextEditor
              content={a}
              onChange={(e) => setValue('a', e, { shouldValidate: true })}
              disabled={!edit}
            />
            {errors.a && (
              <p className='text-red-500 text-sm'>{errors.a.message}</p>
            )}
          </div>

          <div>
            <Label className='mb-2'>Option B</Label>
            <RichTextEditor
              content={b}
              onChange={(e) => setValue('b', e, { shouldValidate: true })}
              disabled={!edit}
            />
            {errors.b && (
              <p className='text-red-500 text-sm'>{errors.b.message}</p>
            )}
          </div>

          <div>
            <Label className='mb-2'>Option C</Label>
            <RichTextEditor
              content={c}
              onChange={(e) => setValue('c', e, { shouldValidate: true })}
              disabled={!edit}
            />
            {errors.c && (
              <p className='text-red-500 text-sm'>{errors.c.message}</p>
            )}
          </div>

          <div>
            <Label className='mb-2'>Option D</Label>
            <RichTextEditor
              content={d}
              onChange={(e) => setValue('d', e, { shouldValidate: true })}
              disabled={!edit}
            />
            {errors.d && (
              <p className='text-red-500 text-sm'>{errors.d.message}</p>
            )}
          </div>

          <div>
            <Label className='mb-2'>Reason</Label>
            <RichTextEditor
              content={reason}
              onChange={(e) => setValue('reason', e, { shouldValidate: true })}
            />
            {errors.reason && (
              <p className='text-red-500 text-sm'>{errors.reason.message}</p>
            )}
          </div>
        </main>
      </form>
    </Card>
  );
};
