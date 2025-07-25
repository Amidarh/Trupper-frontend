import api from '@/core/services/api';
// import { IUser } from '@/types';
import { userMainData } from '../types/users.types';
import { useAltStore } from '@/lib/zustand/userStore';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { usersData } from '../types/users.types';
import { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { toQueryString } from '@/utils';
import { toast } from 'sonner';

export const useUserService = (queryParams: Record<string, any>) => {
  const [singleUser, setSingleUser] = useState<userMainData | null>(null);
  const [singleUserLoading, setSingleUserLoading] = useState<boolean>(false);
  const [singleUserError, setSingleUserError] = useState<string>('');
  const { id } = useParams() as { id?: string };

  const organization = useAltStore((state) => state.organization);

  // Only fetch if organization is available
  const shouldFetch = !!organization?.id;

  // Build query string from queryParams object
  const queryString = toQueryString(queryParams);

  // SWR key: null disables fetch, else use full url
  const swrKey = shouldFetch
    ? `/users/get_users_by_organization/${organization.id}${
        queryString ? `?${queryString}` : ''
      }`
    : null;

  const { data, error, isLoading, mutate } = useSWR<usersData | undefined>(
    swrKey,
    fetcher
  );

  // Fetch a single user by id
  const getASingleUser = useCallback(async () => {
    if (!id) {
      setSingleUserError('User ID is missing');
      return;
    }
    setSingleUserLoading(true);
    setSingleUserError('');
    try {
      console.log(id);
      const res = await api.get(`/users/${id}`);
      if (res.status === 200 && res.data?.doc) {
        setSingleUser(res.data.doc);
      } else {
        setSingleUserError('User not found');
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || err?.message || 'Could not get User';
      setSingleUserError(errorMessage);
    } finally {
      setSingleUserLoading(false);
    }
  }, [id]);

  // Block user by id
  const blockUser = useCallback(async () => {
    if (!id) {
      setSingleUserError('User ID is missing');
      return;
    }
    setSingleUserLoading(true);
    setSingleUserError('');
    try {
      const res = await api.patch(`/users/block/${id}`);
      if (res.status === 200 && res.data?.doc) {
        setSingleUser(res.data.doc);
        await getASingleUser();
        mutate(); // refresh user list
      } else {
        setSingleUserError('Could not block user');
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || err?.message || 'Could not block User';
      setSingleUserError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSingleUserLoading(false);
    }
  }, [id, getASingleUser, mutate]);

  // Unblock user by id
  const unBlockUser = useCallback(async () => {
    if (!id) {
      setSingleUserError('User ID is missing');
      return;
    }
    setSingleUserLoading(true);
    setSingleUserError('');
    try {
      const res = await api.patch(`/users/unblocked/${id}`);
      if (res.status === 200 && res.data?.doc) {
        setSingleUser(res.data.doc);
        await getASingleUser();
        mutate(); // refresh user list
      } else {
        setSingleUserError('Could not unblock user');
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Could not unblock User';
      setSingleUserError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSingleUserLoading(false);
    }
  }, [id, getASingleUser, mutate]);

  return {
    data: data?.doc,
    error,
    isLoading,
    singleUserError,
    singleUserLoading,
    singleUser,
    getASingleUser,
    blockUser,
    unBlockUser,
    mutate,
  };
};
