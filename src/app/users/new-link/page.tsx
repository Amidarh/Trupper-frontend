'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { CreateUserWithLinkLayout } from '@/modules/users/layouts/createUserWithLink';

export default function CreateUserWithLinkPage() {
  return (
    <DashboardLayout pageTitle='Create User With Link'>
      <CreateUserWithLinkLayout />
    </DashboardLayout>
  );
}
