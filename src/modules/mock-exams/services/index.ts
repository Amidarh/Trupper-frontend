/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/core/services/api';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { ExamDataType } from '@/types/exam.types';
import { useAltStore } from '@/lib/zustand/userStore';
import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';

export function useMockExamsService() {
  const organization = useAltStore((state) => state.organization);
  const [serverError, setServerError] = useState('');
  const [resendLoading, setResendLoading] = useState<boolean>(false);

  const { data, error, isLoading } = useSWR<ExamDataType | undefined>(
    `/examTypes/organization-user/${organization?.id}`,
    fetcher
  );

  const getMockExams = async (id: string) => {
    try {
      const res = await api.get(`/exams/organization-user/${id}`);
      if (res.status === 200) {
        return res.data.doc;
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Could not get Mock Exams';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return {
    data,
    error,
    isLoading,
  };
}
