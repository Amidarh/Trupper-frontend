import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { MyPerformance } from '@/modules/my-performnace/layouts/my-performance';

const MyPerformancePage = () => {
  return (
    <DashboardLayout
      pageTitle='My Performance'
      subHeading='Track your growth through your performance'
    >
      <MyPerformance />
    </DashboardLayout>
  );
};

export default MyPerformancePage;
