"use client"

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@radix-ui/react-separator';
import { SubjectCard } from '../components/cards/subjectCards';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useExamTypeService } from '@/modules/examTypes/services';
import { useExamService } from '@/modules/exam/services';
import Image from 'next/image';
import { useState } from 'react';
import { ExamCategoryType } from '@/types/examCategory.types';
import { ExamType } from '@/types/exam.types';

export const MockExams = () => {
  const { data } = useExamTypeService();
  const [ selectedExam, setSelectedExam ] = useState<ExamType | null>(null);
  const [ selectedExamCategory, setSelectedExamCategory ] = useState<ExamCategoryType | null>(null);
  const { getExamByExamTypes, examList, examListLoading, getExamCategories, examCategoryLoading, examCategoryList } = useExamService()

  const handleExamCategorySelection = (data: ExamCategoryType) => {
    setSelectedExamCategory(data);
  };
  return (
    <Card className='p-2 md:p-4'>
      <Tabs defaultValue='o level'>
        <TabsList className='overflow-x-scroll gap-1 overflow-auto'>
          {data?.map(examType => (
            <TabsTrigger onClick={() => getExamByExamTypes(examType.id)} key={examType.id} value={examType.name}>{examType.name}</TabsTrigger>
          ))}
        </TabsList>
        <Separator className='w-full' />
        {data?.map(type => (
            <TabsContent key={type.id} value={type.name} className='border-t pt-4'>
            <h1 className='text-lg'>{type.name} Exams</h1>
            <div className='flex flex-row gap-2'>
              {examListLoading ?
                <p className='text-gray-500'>Loading exams...</p>:
              examList?.length === 0 ? (
                <p className='text-gray-500'>No exams available for this type</p>
              ) :
               examList?.map(exam => (
                <div key={exam.id}
                  onClick={() => {
                    getExamCategories(exam.id)
                    setSelectedExam(exam)
                  }}
                >
                  <Image
                    src={typeof exam.image === 'string' ? exam.image : ''}
                    width={80}
                    height={80}
                    alt={exam.name}
                    className='object-contain rounded-md h-20 w-20 cursor-pointer'
                    priority
                  />
                  <p className='text-sm mt-1'>{exam.acronym}</p>
                </div>
              ))}
            </div>
            {selectedExam && <div>
              <h1 className='text-lg my-3'>Exam Category</h1>
              <div className='flex flex-col gap-2'>
                {examCategoryLoading ? <p>Getting Categories...</p> : examCategoryList?.map(category => (
                  <SubjectCard
                    data={category}
                    key={category.id}
                    name={category.name}
                    subjects={category.subjects}
                    action={handleExamCategorySelection}
                    selected={selectedExamCategory?.id || ''}
                  />
                ))}
              </div>
            </div>}
            {selectedExamCategory && <div>
              <div>
                <h1 className='text-lg mt-3 mb-1'>Subjects</h1>
                <p className='text-gray-600 text-sm'>
                  Selected 0 of {selectedExam?.maxNoOfSubjects} subjects (min of {selectedExam?.minNoOfSubjects})
                </p>
              </div>
              <div className='mt-3 flex flex-row gap-2'>
                {selectedExamCategory.subjects.map(subject => (
                  <Badge key={subject.id} className='cursor-pointer h-8'>{subject.name}</Badge>
                ))}
              </div>
            </div>}
            {/* <div className='flex justify-end mt-5'>
              <Button>Create Card</Button>
            </div> */}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};
