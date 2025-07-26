import api from '@/core/services/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  SubAdminKycSchemaFormData,
  subAdminKycSchema,
  signupConfirmationSchema,
  SignupConfirmationSchemaFormData,
} from '../schema';
import { useAltStore } from '@/lib/zustand/userStore';
import { useSearchParams } from 'next/navigation';
import { IAdmin, IUser } from '@/types';
import { toast } from 'sonner';

export function useKycComplete() {
  const router = useRouter();
  const [kycDetails, setKycDetails] = useState<IAdmin | null>(null);
  const [kycDetailsLoading, setKycDetailsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState('');
  const [userDetails, setUserDetails] = useState<IAdmin | null>(null);
  const setUser = useAltStore((state) => state.setUser);
  const setAuthenticated = useAltStore((state) => state.setIsAuthenticated);
  const organization = useAltStore((state) => state.organization);
  const searchParams = useSearchParams();
  const qrt = searchParams.get('qrt');
  const est = searchParams.get('est');

  const form = useForm<SubAdminKycSchemaFormData>({
    resolver: zodResolver(subAdminKycSchema),
  });
  const signupConfirmationForm = useForm<SignupConfirmationSchemaFormData>({
    resolver: zodResolver(signupConfirmationSchema),
  });

  const kycComplete = async (data: SubAdminKycSchemaFormData) => {
    setServerError('');
    try {
      console.log({ data });
      const res = await api.post(`/auth/complete-admin-creation/${qrt}`, data);

      if (res.status === 200) {
        const { admin, token, refreshToken } = res.data.doc;
        const isProduction = process.env.NODE_ENV === 'production';
        const secureFlag = isProduction ? '; secure' : '';
        const orgName = (admin.organization?.name || 'default').replace(
          /\s+/g,
          '_'
        );

        // Set cookies client-side
        document.cookie = `${orgName}-accessToken=${token}; path=/${secureFlag}; SameSite=Strict`;
        document.cookie = `${orgName}-refreshToken=${refreshToken}; path=/${secureFlag}; SameSite=Strict`;
        document.cookie = `role=${admin.role.toUpperCase()}; path=/${secureFlag}; SameSite=Strict`;
        document.cookie = `organizationId=${admin.organization?.id || 'default'}; path=/${secureFlag}; SameSite=Strict`;

        // Debug cookies
        console.log('Cookies after setting:', document.cookie);

        setUser(admin);
        setAuthenticated(true);
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || err.message || 'Login failed';
      setServerError(errorMessage);
    }
  };

  const signupConfirmation = async (data: SignupConfirmationSchemaFormData) => {
    try {
      const res = await api.post(`/auth/signup-user-link/${est}`, data);
      if (res.status === 200) {
        toast.success('User created successfully');
        signupConfirmationForm.reset();
        const { user, token, refreshToken } = res.data.doc;
        const isProduction = process.env.NODE_ENV === 'production';
        const secureFlag = isProduction ? '; secure' : '';

        // Set cookies client-side
        document.cookie = `${organization?.name}-accessToken=${token}; path=/${secureFlag}; SameSite=Strict`;
        document.cookie = `${organization?.name}-refreshToken=${refreshToken}; path=/${secureFlag}; SameSite=Strict`;
        document.cookie = `role=${user?.role.toUpperCase()}; path=/${secureFlag}; SameSite=Strict`;
        document.cookie = `organizationId=${user?.organization?.id || 'default'}; path=/${secureFlag}; SameSite=Strict`;

        setUser(user);
        setAuthenticated(true);
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || err.message || 'Signup failed';
      setServerError(errorMessage);
    }
  };

  const getKycDetails = async () => {
    try {
      setKycDetailsLoading(true);
      const res = await api.get(`/auth/get-created-admin-details/${qrt}`);
      if (res.status === 200) {
        setKycDetails(res.data.doc);
      }
      setKycDetailsLoading(false);
    } catch (err: any) {
      setKycDetailsLoading(false);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Could not get KYC details';
      setServerError(errorMessage);
    }
  };

  const getUserDetails = async () => {
    try {
      setKycDetailsLoading(true);
      const res = await api.get(`/auth/get-created-user-details/${est}`);
      if (res.status === 200) {
        setUserDetails(res.data.doc);
      }
      setKycDetailsLoading(false);
    } catch (err: any) {
      setKycDetailsLoading(false);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Could not get KYC details';
      setServerError(errorMessage);
    }
  };

  return {
    form,
    kycComplete,
    serverError,
    kycDetails,
    kycDetailsLoading,
    getKycDetails,
    userDetails,
    getUserDetails,
    signupConfirmationForm,
    signupConfirmation,
  };
}
