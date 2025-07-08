'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { SingleExamCardLayout } from '@/modules/my-exams/layouts/singleExam';

export default function SingleExamCard() {
  return (
    <DashboardLayout pageTitle='Test' subHeading='This is a test'>
      <SingleExamCardLayout />
    </DashboardLayout>
  );
}
