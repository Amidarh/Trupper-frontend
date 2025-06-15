'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { CreateNewsletter } from '@/modules/newletters/layouts/createNewsletter';

const CreateNewsletterPage = () => {
  return (
    <DashboardLayout
      pageTitle='Create Newsletter'
      subHeading='Create and Send Newsletter'
    >
      <CreateNewsletter />
    </DashboardLayout>
  );
};

export default CreateNewsletterPage;
