'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { ExamTypes } from '@/modules/examTypes/layouts/examTypes';

const DashboardPage = () => {
  return (
    <DashboardLayout
      pageTitle='Exam Types'
      subHeading='Manage your exam types here'
    >
      <ExamTypes />
    </DashboardLayout>
  );
};

export default DashboardPage;
