'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { Newsletter } from '@/modules/newletters/layouts/newletters';

const NewsletterPage = () => {
  return (
    <DashboardLayout
      pageTitle='Newsletters'
      subHeading='Manage newsletter sent to your users mails here'
    >
      <Newsletter />
    </DashboardLayout>
  );
};

export default NewsletterPage;
