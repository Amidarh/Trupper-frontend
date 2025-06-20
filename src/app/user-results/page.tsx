'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { ResultContent } from '@/modules/user-results/layouts/results';

export default function ResultPage (){
  return (
    <DashboardLayout
      pageTitle='Result Center'
      subHeading='Manage Results here'
    >
      <ResultContent/>
    </DashboardLayout>
  );
};