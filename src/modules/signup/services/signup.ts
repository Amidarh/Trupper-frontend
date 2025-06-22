/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/core/services/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SignupFormData, signupSchema } from '../schema/signupSchema';

export function useSignup() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const signup = async (data: SignupFormData) => {
    setServerError('');
    try {
      const res = await api.post('/auth/signup', data);
      if (res.status === 201) {
        router.push(`/verify-otp?token=${res.data.doc}`);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Signup failed';
      setServerError(errorMessage);
    }
  };
  return {
    form,
    signup,
    serverError,
  };
}
