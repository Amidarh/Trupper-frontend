'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { AdminDetail } from '@/modules/subAdmin/layout/viewSubAdmin';
import { useAdminService } from '@/modules/subAdmin/services';
import { useEffect } from 'react';

const AdminDetailPage = () => {
  const { getASingleAdmin, singleAdmin, singleAdminLoading } =
    useAdminService();
  useEffect(() => {
    getASingleAdmin();
  }, []);
  return (
    <DashboardLayout
      pageTitle={
        singleAdminLoading
          ? 'Getting Data'
          : `${singleAdmin?.firstName} ${singleAdmin?.lastName}`
      }
      subHeading='Manage your admin here'
    >
      <AdminDetail adminData={singleAdmin} />
    </DashboardLayout>
  );
};

export default AdminDetailPage;
