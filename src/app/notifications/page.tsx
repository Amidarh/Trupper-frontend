'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { Notifications } from '@/modules/notifications/layouts/notifications';

const NotificationsPage = () => {
  return (
    <DashboardLayout
      pageTitle='Notifications Center'
      subHeading='Manage notification here'
    >
      <Notifications />
    </DashboardLayout>
  );
};

export default NotificationsPage;
