/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/core/services/api';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { useState } from 'react';
import { ResultType, ResultDataTypes } from '@/types/result.types';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

export const useResultService = () => {
  const [singleResult, setSingleResult] = useState<ResultType | null>(null);
  const [singleResultLoading, setSingleResultLoading] =
    useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading, mutate } = useSWR<ResultDataTypes>(
    `/results`,
    fetcher
  );

  const getResult = async () => {
    try {
      const res = await api(`/results/${id}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        setSingleResult(res.data.doc);
      }
      setSingleResultLoading(false);
    } catch (error: any) {
      setSingleResultLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not get this exam categories';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return {
    data: data?.doc,
    isLoading,
    mutate,
    error,
    singleResult,
    serverError,
    singleResultLoading,
    getResult,
  };
};
