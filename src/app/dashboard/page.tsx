'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { useAltStore } from '@/lib/zustand/userStore';
import { Dashboard } from '@/modules/dashboard/layouts/dashboard';
import { MyDashboard } from '@/modules/my-dashboard/layouts/dashboard';

const DashboardPage = () => {
  const user = useAltStore((state) => state.user);
  const organization = useAltStore((state) => state.organization);

  if (user?.role === 'user' || user?.role === 'USER') {
    return (
      <DashboardLayout
        pageTitle={`Hello ${user.firstName}`}
        subHeading={`Welcome to your ${organization?.name} dashboard`}
      >
        <MyDashboard />
      </DashboardLayout>
    );
  }
  if (user?.role === 'admin' || user?.role === 'ADMIN' || user?.role === 'SUB_ADMIN' || user?.role === 'SUPER_ADMIN') {
    return (
      <DashboardLayout pageTitle='Dashboard' subHeading=''>
        <Dashboard />
      </DashboardLayout>
    );
  }

  return (
    <main className='text-center flex justify-center items-center w-full'>
      <h1 className='text-3xl'>Loading up your data 🐥...</h1>
    </main>
  )
};

export default DashboardPage;
