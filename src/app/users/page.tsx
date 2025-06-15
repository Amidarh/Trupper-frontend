'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { UserTable } from '@/modules/users/components/tables/userMainTable';

const DashboardPage = () => {
  return (
    <DashboardLayout pageTitle='My Users' subHeading='Manage your users here'>
      <UserTable />
    </DashboardLayout>
  );
};

export default DashboardPage;
