/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/core/services/api';
import { useAltStore } from '@/lib/zustand/userStore';
import { useState } from 'react';
import {
  UserPreferenceFormData,
  userPreferenceSchema,
  UserSecurityFormData,
  userSecuritySchema,
} from '../schema/settings';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useSettingService = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const user = useAltStore((state) => state.user);
  const setUser = useAltStore((state) => state.setUser);

  const updateForm = useForm<UserPreferenceFormData>({
    resolver: zodResolver(userPreferenceSchema),
  });

  const securityForm = useForm<UserSecurityFormData>({
    resolver: zodResolver(userSecuritySchema),
  });

  const updatePreference = async (data: FormData) => {
    try {
      let res;
      if (user?.role === 'ADMIN' || user?.role === 'SUB_ADMIN') {
        res = await api.post('/users/update-admin-me', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (res.status === 200) {
          setUser(res.data.doc);
          toast.success(res.data.message);
        }
      } else {
        res = await api.post('/users/update-me', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (res.status === 200) {
          setUser(res.data.doc);
          toast.success(res.data.message);
        }
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not create exam';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const updateSecurity = async (data: UserSecurityFormData) => {
    try {
      let res;
      if (user?.role === 'ADMIN' || user?.role === 'SUB_ADMIN') {
        res = await api.post('/auth/update-admin-password', data);
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      } else {
        res = await api.post('/auth/update-password', data);
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not create exam';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return {
    updatePreference,
    serverError,
    updateSecurity,
    updateForm,
    securityForm,
  };
};
