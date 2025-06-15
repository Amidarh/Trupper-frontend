import api from '@/core/services/api';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  PasswordResetFormData,
  passwordResetSchema,
} from '../schema/passwordResetSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

export function usePasswordReset() {
  const [serverError, setServerError] = useState('');
  const searchParams = useSearchParams();
  const query = searchParams.get('token');
  const router = useRouter();

  const form = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
  });

  const passwordReset = async (data: PasswordResetFormData) => {
    setServerError('');
    try {
      const res = await api.post(`/auth/reset-password/${query}`, data);
      if (res.status === 200) {
        toast.success('Password Changed Successfully');
        router.push('/login');
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to sent password reset link';
      setServerError(errorMessage);
    }
  };
  return {
    form,
    passwordReset,
    serverError,
  };
}
