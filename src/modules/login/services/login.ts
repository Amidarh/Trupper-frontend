/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/core/services/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginSchema, LoginFormData } from '../schema/loginSchema';
import { useAltStore } from '@/lib/zustand/userStore';

export function useLogin() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const setUser = useAltStore((state) => state.setUser);
  const organization = useAltStore((state) => state.organization);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const login = async (data: LoginFormData) => {
    setServerError('');

    try {
      const res = await api.post('/auth/login', data);

      if (res.status === 203) {
        router.push(`/2fa?token=${res.data.doc.token}`);
        return;
      }

      const { user, token, refreshToken } = res.data.doc;
      const isProduction = process.env.NODE_ENV === 'production';
      const secureFlag = isProduction ? '; secure' : '';
      const orgName = (organization?.name || 'default').replace(/\s+/g, '_');

      // Set cookies client-side
      document.cookie = `${orgName}-accessToken=${token}; path=/${secureFlag}; SameSite=Strict`;
      document.cookie = `${orgName}-refreshToken=${refreshToken}; path=/${secureFlag}; SameSite=Strict`;
      document.cookie = `role=${user.role.toUpperCase()}; path=/${secureFlag}; SameSite=Strict`;
      document.cookie = `organizationId=${organization?.id || 'default'}; path=/${secureFlag}; SameSite=Strict`;

      // Debug cookies
      console.log('Cookies after setting:', document.cookie);

      // Update Zustand store
      setUser(user);

      // if (user.role === 'USER' || user.role === 'user') {
      //   router.push('/my-dashboard');
      // } else if (
      //   user.role === 'ADMIN' ||
      //   user.role === 'SUB_ADMIN' ||
      //   user.role === 'admin'
      // ) {
      // }
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 406) {
        router.push(`/verify-otp?token=${err.response.data.doc.token}`);
      } else {
        const errorMessage =
          err.response?.data?.message || err.message || 'Login failed';
        setServerError(errorMessage);
      }
    }
  };

  return {
    form,
    login,
    serverError,
  };
}
