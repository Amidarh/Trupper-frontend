'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { Questions } from '@/modules/questions/layouts/questions';

const QuestionsPage = () => {
  return (
    <DashboardLayout
      pageTitle='Question Bank'
      subHeading='Manage question here'
    >
      <Questions />
    </DashboardLayout>
  );
};

export default QuestionsPage;
