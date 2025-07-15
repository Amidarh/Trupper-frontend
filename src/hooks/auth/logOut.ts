/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/core/services/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAltStore } from '@/lib/zustand/userStore';
import { toast } from 'sonner';

export function useLogout() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const logoUser = useAltStore((state) => state.logout);
  const organization = useAltStore((state) => state.organization);
  const user = useAltStore((state) => state.user);

  const logout = async () => {
    setServerError('');
    setIsLoading(true);
    try {
      let res;
      console.log(user?.role);
      if (
        user?.role === 'ADMIN' ||
        user?.role === 'admin' ||
        user?.role === 'SUB_ADMIN'
      ) {
        res = await api.post('/auth/logout-admin');
      } else {
        res = await api.post('/auth/logout');
      }
      console.log({ res });
      if (res.status === 200) {
        logoUser();
        const orgName = (organization?.name || 'default').replace(/\s+/g, '_');
        const cookiesToClear = [
          `${orgName}-accessToken`,
          `${orgName}-refreshToken`,
          'role',
          'organizationId',
        ];

        // Clear each cookie by setting an expired date
        cookiesToClear.forEach((cookieName) => {
          document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; SameSite=Strict`;
        });
        toast.success(res.data.message);
        if (
          user?.role === 'ADMIN' ||
          user?.role === 'admin' ||
          user?.role === 'SUB_ADMIN'
        ) {
          // router.push('/admin-controller/login');
          router.push('/login');
        } else {
          router.push('/login');
        }
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      const errorMessage =
        error.response?.data?.message || error.message || 'Logout Failed';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };
  return {
    isLoading,
    logout,
    serverError,
  };
}
