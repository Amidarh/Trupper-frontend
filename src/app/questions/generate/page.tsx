import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { GenerateQuestionLayout } from '@/modules/questions/layouts/generateQuestion';

export default function GenerateQuestion() {
  return (
    <DashboardLayout
      pageTitle='AI Question Generator'
      subHeading='Upload files/images and select your preferences to generate questions.'
    >
      <GenerateQuestionLayout />
    </DashboardLayout>
  );
}
