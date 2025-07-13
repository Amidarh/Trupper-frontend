'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { PerformanceResultLayout } from '@/modules/my-performance/layouts/result';
import { useResultService } from '@/modules/my-performance/services';
import { useEffect } from 'react';

export default function PerformanceResultPage() {
  const { getResult, singleResult, singleResultLoading } = useResultService();

  useEffect(() => {
    getResult();
  }, []);

  return (
    <DashboardLayout
      pageTitle={
        singleResultLoading
          ? 'fetching result '
          : (singleResult?.exam.name ?? '')
      }
      subHeading={
        !singleResultLoading
          ? `${singleResult?.exam.acronym} result details`
          : undefined
      }
    >
      <PerformanceResultLayout
        loading={singleResultLoading}
        data={singleResult}
      />
    </DashboardLayout>
  );
}
