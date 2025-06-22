'use client';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@radix-ui/react-separator';
import { SubjectCard } from '../components/cards/subjectCards';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useExamTypeService } from '@/modules/examTypes/services';
import { useExamService } from '@/modules/exam/services';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ExamCategoryType } from '@/types/examCategory.types';
import { ExamType } from '@/types/exam.types';
import { SubjectType } from '@/types/subject.types';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export const MockExams = () => {
  const { data, isLoading } = useExamTypeService();
  const [selectedExam, setSelectedExam] = useState<ExamType | undefined>(
    undefined
  );
  const [defaultTab, setDefaultTab] = useState<string>(data?.[0]?.name || '');
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectType[]>([]);
  const [subjectError, setSubjectError] = useState('');
  const [selectedExamCategory, setSelectedExamCategory] =
    useState<ExamCategoryType | null>(null);
  const {
    getExamByExamTypes,
    examList,
    examListLoading,
    getExamCategories,
    examCategoryLoading,
    examCategoryList,
  } = useExamService();

  const handleExamCategorySelection = (data: ExamCategoryType) => {
    setSelectedExamCategory(data);
    setSelectedSubjects([]);
  };

  const handelShowExam = () => {
    setSubjectError('');
    if (selectedExam && selectedSubjects.length === 0) {
      setSubjectError('Select Subjects');
    } else if (selectedSubjects.length > (selectedExam?.maxNoOfSubjects ?? 0)) {
      setSubjectError(
        `You can only select ${selectedExam?.maxNoOfSubjects} subjects`
      );
    } else if (
      selectedExam?.minNoOfSubjects !== undefined &&
      selectedExam.minNoOfSubjects > selectedSubjects.length
    ) {
      setSubjectError('Select More Subjects ');
    }
  };

  const handleSelect = (option: SubjectType) => {
    // Check if the option is already selected
    setSubjectError('');
    if (
      !selectedSubjects.includes(option) &&
      selectedSubjects.length < (selectedExam?.maxNoOfSubjects ?? 0)
    ) {
      setSelectedSubjects([...selectedSubjects, option]);
    }
  };

  // Function to remove a selected option
  const handleRemove = (option: SubjectType) => {
    setSubjectError('');
    setSelectedSubjects(selectedSubjects.filter((item) => item !== option));
  };

  useEffect(() => {
    if (data && data.length > 0) {
      getExamByExamTypes(data[0].id);
      setDefaultTab(data[0].name);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Card className='flex gap-2 flex-row'>
        <Skeleton className='h-10 rounded-lg' />
        <Skeleton className='h-10 rounded-lg' />
        <Skeleton className='h-10 rounded-lg' />
      </Card>
    );
  }

  return (
    <Card className='p-2 md:p-4'>
      <Tabs defaultValue={defaultTab}>
        <TabsList className='overflow-x-scroll gap-1 overflow-auto'>
          {data?.map((examType) => (
            <TabsTrigger
              onClick={() => {
                getExamByExamTypes(examType.id);
                setSelectedExam(undefined);
                setSelectedExamCategory(null);
                setSelectedSubjects([]);
              }}
              key={examType.id}
              value={examType.name}
            >
              {examType.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <Separator className='w-full' />
        {data?.map((type) => (
          <TabsContent
            key={type.id}
            value={type.name}
            className='border-t pt-4'
          >
            <h1 className='text-lg'>{type.name} Exams</h1>
            <div className='flex flex-row gap-2'>
              {examListLoading ? (
                <div className='flex flex-row gap-2'>
                  <Skeleton className='h-20 w-20' />
                  <Skeleton className='h-20 w-20' />
                  <Skeleton className='h-20 w-20' />
                </div>
              ) : examList?.length === 0 ? (
                <p className='text-gray-500'>
                  No exams available for this Exam type
                </p>
              ) : (
                examList?.map((exam) => (
                  <div
                    key={exam.id}
                    onClick={() => {
                      getExamCategories(exam.id);
                      setSelectedExam(exam);
                    }}
                    className={cn(
                      'flex flex-col items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-800',
                      selectedExam?.id === exam.id
                        ? 'bg-gray-200 dark:bg-gray-700'
                        : ''
                    )}
                  >
                    <Image
                      src={typeof exam.image === 'string' ? exam.image : ''}
                      width={60}
                      height={60}
                      alt={exam.name}
                      className='object-contain rounded-md h-15 w-15 cursor-pointer'
                      priority
                    />
                    <p className='text-xs mt-1'>{exam.acronym}</p>
                  </div>
                ))
              )}
            </div>
            {selectedExam && (examList ?? []).length > 0 && (
              <div>
                <h1 className='text-lg my-3'>Exam Category</h1>
                <div className='flex flex-col gap-2'>
                  {examCategoryLoading ? (
                    <div className='flex flex-col gap-2'>
                      <Skeleton className='h-15 w-full' />
                      <Skeleton className='h-15 w-full' />
                    </div>
                  ) : (
                    examCategoryList?.map((category) => (
                      <SubjectCard
                        data={category}
                        key={category.id}
                        name={category.name}
                        subjects={category.subjects}
                        action={handleExamCategorySelection}
                        selected={selectedExamCategory?.id || ''}
                      />
                    ))
                  )}
                </div>
              </div>
            )}
            {(examCategoryList ?? []).length > 0 &&
              (examList ?? []).length > 0 &&
              selectedExamCategory && (
                <div>
                  <div>
                    <h1 className='text-lg mt-3 mb-1'>Subjects</h1>
                    <p className='text-gray-600 text-sm'>
                      Selected {selectedSubjects.length} of{' '}
                      {selectedExam?.maxNoOfSubjects} subjects (min of{' '}
                      {selectedExam?.minNoOfSubjects})
                    </p>
                  </div>
                  {subjectError && (
                    <div className='input-error'>{subjectError}</div>
                  )}
                  <div className='mt-3 flex flex-row gap-2'>
                    {selectedExamCategory.subjects.map((subject) => (
                      <Badge
                        key={subject.id}
                        className='cursor-pointer h-8'
                        onClick={() => {
                          if (selectedSubjects.includes(subject)) {
                            handleRemove(subject);
                          } else {
                            handleSelect(subject);
                          }
                        }}
                        variant={
                          selectedSubjects.includes(subject)
                            ? 'default'
                            : 'outline'
                        }
                        color={
                          selectedSubjects.includes(subject)
                            ? 'primary'
                            : 'secondary'
                        }
                      >
                        {subject.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            {(examCategoryList ?? []).length > 0 && selectedExamCategory && (
              <div className='flex justify-end mt-5'>
                <Button
                  onClick={handelShowExam}
                  disabled={
                    !selectedExamCategory ||
                    selectedSubjects.length <
                      (selectedExam?.minNoOfSubjects ?? 0)
                  }
                >
                  Save Exam
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};
