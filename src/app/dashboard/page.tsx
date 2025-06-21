'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { useAltStore } from '@/lib/zustand/userStore';
import { Dashboard } from '@/modules/dashboard/layouts/dashboard';
import { MyDashboard } from '@/modules/my-dashboard/layouts/dashboard';

const DashboardPage = () => {
  const user = useAltStore(state => state.user);
  const organization = useAltStore(state => state.organization);

  if(user?.role === "user" || user?.role === "USER") {
    return (
       <DashboardLayout
        pageTitle='Hello Wisdom'
        subHeading={`Welcome to your ${organization?.name} dashboard`}
      >
        <MyDashboard />
      </DashboardLayout>
    )
  }
  return (
    <DashboardLayout pageTitle='Dashboard' subHeading=''>
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardPage;
