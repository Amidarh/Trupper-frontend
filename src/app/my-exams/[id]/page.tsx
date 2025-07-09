'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { SingleExamCardLayout } from '@/modules/my-exams/layouts/singleExam';
import { Suspense } from 'react';

export default function SingleExamCard() {
  return (
    <DashboardLayout pageTitle='Test' subHeading='This is a test'>
      <Suspense fallback={<div>Loading...</div>}>
        <SingleExamCardLayout />
      </Suspense>
    </DashboardLayout>
  );
}
