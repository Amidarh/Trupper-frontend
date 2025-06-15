import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { analyticsData } from '../types/dashboard.types';
import { useAltStore } from '@/lib/zustand/userStore';

export const useGetAnalytics = () => {
  const organization = useAltStore((state) => state.organization);
  const { data, error, isLoading } = useSWR<analyticsData>(
    `/analytics/organization/${organization?.id}`,
    fetcher
  );
  // console.log(data)
  return {
    data: data?.doc,
    error,
    isLoading,
  };
};
