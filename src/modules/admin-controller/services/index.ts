import api from '@/core/services/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginSchema, LoginFormData } from '@/modules/login/schema/loginSchema';
import {
  PasswordResetFormData,
  passwordResetSchema,
} from '@/modules/password-reset/schema/passwordResetSchema';
import {
  TwoFactorFormData,
  twoFactorSchema,
} from '@/modules/2fa/schema/2faSchema';
import { useAltStore } from '@/lib/zustand/userStore';
import {
  ForgetPasswordFormData,
  forgetPasswordSchema,
} from '@/modules/forget-password/schemas/forgetPasswordSchema';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export function useAdminAuthService() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const setUser = useAltStore((state) => state.setUser);
  const organization = useAltStore((state) => state.organization);
  const searchParams = useSearchParams();
  const query = searchParams.get('token');

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const forgetPasswordForm = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const passwordResetForm = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
  });

  const TwoFactorform = useForm<TwoFactorFormData>({
    resolver: zodResolver(twoFactorSchema),
  });

  const login = async (data: LoginFormData) => {
    setServerError('');

    try {
      const res = await api.post('/auth/login-admin', data);

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

      // Update Zustand store
      setUser(user);

      if (user.role === 'USER' || user.role === 'user') {
        router.push('/my-dashboard');
      } else if (
        user.role === 'ADMIN' ||
        user.role === 'SUB_ADMIN' ||
        user.role === 'admin'
      ) {
        router.push('/dashboard');
      }
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

  const forgetPassword = async (data: ForgetPasswordFormData) => {
    setServerError('');
    try {
      const res = await api.post('/auth/forgot-password-admin', data);
      if (res.status === 200) {
        setSuccessMessage('Reset link sent to email successfully');
        toast.success('Reset link sent to email successfully');
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Otp verification failed';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const passwordReset = async (data: PasswordResetFormData) => {
    setServerError('');
    try {
      const res = await api.post(`/auth/admin-reset-password/${query}`, data);
      if (res.status === 200) {
        toast.success('Password Changed Successfully');
        router.push('/admin-controller/login');
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to sent password reset link';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const twoFactor = async (data: TwoFactorFormData) => {
    setServerError('');
    try {
      const res = await api.post(`/auth/login-2fa/${query}`, data);
      if (res.status === 200) {
        toast.success('Logged in Successfully');
        const { user, token, refreshToken } = res.data.doc;
        const isProduction = process.env.NODE_ENV === 'production';
        const secureFlag = isProduction ? '; secure' : '';
        const orgName = (organization?.name || 'default').replace(/\s+/g, '_');

        // Set cookies client-side
        document.cookie = `${orgName}-accessToken=${token}; path=/${secureFlag}; SameSite=Strict`;
        document.cookie = `${orgName}-refreshToken=${refreshToken}; path=/${secureFlag}; SameSite=Strict`;
        document.cookie = `role=${user.role}; path=/${secureFlag}; SameSite=Strict`;
        document.cookie = `organizationId=${organization?.id || 'default'}; path=/${secureFlag}; SameSite=Strict`;

        // Update Zustand store
        setUser(user);
        router.push('/my-dashboard');
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to complete login';
      setServerError(errorMessage);
    }
  };

  const resendTwoFactorCode = async () => {
    setServerError('');
    setResendLoading(true);
    try {
      const res = await api.post(`/auth/admin-resend-2fa-code/${query}`);
      if (res.status === 200) {
        setResendLoading(false);
        toast.success('Two factor authentication code sent successfully');
      }
    } catch (err: any) {
      setResendLoading(false);
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to send code';
      setServerError(errorMessage);
    }
  };

  return {
    loginForm,
    login,
    serverError,
    forgetPasswordForm,
    forgetPassword,
    successMessage,
    passwordResetForm,
    passwordReset,
    TwoFactorform,
    resendLoading,
    twoFactor,
    resendTwoFactorCode,
  };
}
