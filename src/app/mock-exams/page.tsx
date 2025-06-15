import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { MockExams } from '@/modules/mock-exams/layouts/mock-exams';

const MockExamsPage = () => {
  return (
    <DashboardLayout
      pageTitle='Mock Exams'
      subHeading='Practice to score High in your exams'
    >
      <MockExams />
    </DashboardLayout>
  );
};

export default MockExamsPage;
