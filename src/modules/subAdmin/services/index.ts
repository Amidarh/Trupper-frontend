import api from '@/core/services/api';
import { useAltStore } from '@/lib/zustand/userStore';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { AdminData, IAdmin } from '@/types/admin.types';
import { subAdminSchema, SubAdminFormData } from '../schema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

export const useAdminService = () => {
  const [singleAdmin, setSingleAdmin] = useState<IAdmin | null>(null);
  const [singleAdminError, setSingleAdminError] = useState<string | null>(null);
  const [singleAdminLoading, setSingleAdminLoading] = useState<boolean>(false);
  const { id } = useParams();
  const router = useRouter();

  const organization = useAltStore((state) => state.organization);
  const { data, error, isLoading, mutate } = useSWR<AdminData | undefined>(
    `/admin/organization/${organization?.id}`,
    fetcher
  );

  const form = useForm<SubAdminFormData>({
    resolver: zodResolver(subAdminSchema),
  });

  const addAdmin = async (data: SubAdminFormData) => {
    setSingleAdminLoading(true);
    try {
      const res = await api.post('/auth/create-sub-admin', data);

      if (res.status === 200) {
        router.push('/sub-admins');
      }
      toast.success('Sub Admin Created Successfully');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Login failed';
      errorMessage;
      toast.error(errorMessage);
    }
  };

  const getASingleAdmin = async () => {
    setSingleAdminLoading(true);
    try {
      const res = await api.get(`/admin/${id}`);
      if (res.status === 200) {
        setSingleAdmin(res.data.doc);
      }
      setSingleAdminLoading(false);
    } catch (err: any) {
      setSingleAdminLoading(false);
      const errorMessage =
        err.response?.data?.message || err.message || 'Could not get User';
      toast.error(errorMessage);
    }
  };

  return {
    data: data?.doc,
    error,
    isLoading,
    mutate,
    singleAdmin,
    singleAdminError,
    singleAdminLoading,
    setSingleAdmin,
    setSingleAdminError,
    addAdmin,
    form,
    getASingleAdmin,
  };
};
