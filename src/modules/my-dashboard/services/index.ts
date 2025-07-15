/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { MyDashboardDataType } from '@/types';

export const useMyDashboardService = () => {
  const { data, error, isLoading, mutate } = useSWR<MyDashboardDataType>(
    `/analytics/user`,
    fetcher
  );

  return {
    data: data?.doc,
    isLoading,
    mutate,
    error,
  };
};
