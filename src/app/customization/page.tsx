'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { Customization } from '@/modules/customization/layouts/customization';

const CustomizationPage = () => {
  return (
    <DashboardLayout
      pageTitle='Customization Center'
      subHeading='Manage customization here'
    >
      <Customization />
    </DashboardLayout>
  );
};

export default CustomizationPage;
