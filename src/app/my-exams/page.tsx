import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { MyExams } from '@/modules/my-exams/layouts/myExams';

const MyExamsPage = () => {
  return (
    <DashboardLayout
      pageTitle='My Exams'
      subHeading="Explore the exams you've saved for yourself"
    >
      <MyExams />
    </DashboardLayout>
  );
};

export default MyExamsPage;
