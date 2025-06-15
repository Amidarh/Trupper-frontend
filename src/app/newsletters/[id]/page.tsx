import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { ViewNewsletter } from '@/modules/newletters/layouts/viewNewsletter';

const ViewNewsletterPage = () => {
  return (
    <DashboardLayout
      pageTitle='View NewsLetter'
      subHeading='Create newsletters for your users'
    >
      <ViewNewsletter />
    </DashboardLayout>
  );
};

export default ViewNewsletterPage;
