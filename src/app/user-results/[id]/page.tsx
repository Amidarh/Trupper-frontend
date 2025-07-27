'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { ViewResultContent } from '@/modules/user-results/layouts/viewResults';
import { useExamModeResultService } from '@/modules/user-results/services';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ViewResult() {
  const {
    getSingleExamModeResult,
    examModeResult,
    singleExamModeResultLoading,
  } = useExamModeResultService();

  useEffect(() => {
    getSingleExamModeResult();
  }, []);

  return (
    <DashboardLayout
      pageTitle={
        singleExamModeResultLoading
          ? 'Getting Results...'
          : `Exam results for ${examModeResult?.exam?.name}`
      }
      subHeading={
        examModeResult?.stats
          ? `Here is the result of ${examModeResult.stats.totalStudents} students that took this exam`
          : ''
      }
    >
      {singleExamModeResultLoading ? (
        <Skeleton className='h-full w-full' />
      ) : (
        <ViewResultContent examModeResult={examModeResult} />
      )}
    </DashboardLayout>
  );
}
