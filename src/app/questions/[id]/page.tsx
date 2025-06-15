import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { ViewQuestion } from '@/modules/questions/layouts/viewQuestion';

const ViewQuestionPage = () => {
  return (
    <DashboardLayout pageTitle='Question' subHeading='View and Edit Question'>
      <ViewQuestion />
    </DashboardLayout>
  );
};

export default ViewQuestionPage;
