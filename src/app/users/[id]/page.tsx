'use client';

import DashboardLayout from '@/core/commons/layout/dashboardLayout';
import { User } from '@/modules/users/layouts/user';
import { useUserService } from '@/modules/users/services/user';
import { useEffect } from 'react';

const UserDetailsPage = () => {
  const {
    singleUser,
    getASingleUser,
    singleUserLoading,
    blockUser,
    unBlockUser,
  } = useUserService({});
  useEffect(() => {
    getASingleUser();
  }, []);
  return (
    <DashboardLayout
      pageTitle={
        singleUser ? `${singleUser.firstName} ${singleUser.lastName}` : ''
      }
      subHeading='Manage your users here'
    >
      <User
        blockUser={blockUser}
        loading={singleUserLoading}
        unBlockUser={unBlockUser}
        userData={singleUser}
      />
    </DashboardLayout>
  );
};

export default UserDetailsPage;
