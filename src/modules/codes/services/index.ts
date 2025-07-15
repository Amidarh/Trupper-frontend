import api from '@/core/services/api';
import useSWR from 'swr';
import { useAltStore } from '@/lib/zustand/userStore';
import { fetcher } from '@/lib/fetcher';
import { useState } from 'react';
import { codeType, CodeDataTypes } from '../types';
import { codeSchema, CodeFormData } from '../schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { toQueryString } from '@/utils';

export const useCodeService = (queryParams: Record<string, any>) => {
  const organization = useAltStore((state) => state.organization);
  const [singleCode, setSingleCode] = useState<codeType | null>(null);
  const [bulkCode, setBulkCode] = useState<codeType[]>([]);
  const [singleCodeLoading, setSingleCodeLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState('');
  const [generateCodeLoading, setGenerateCodeLoading] =
    useState<boolean>(false);
  const [generatedCodeCount, setGeneratedCodeCount] = useState<number>(0);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const router = useRouter();
  const shouldFetch = !!organization?.id;

  // Build query string from queryParams object
  const queryString = toQueryString(queryParams);

  // SWR key: null disables fetch, else use full url
  const swrKey = shouldFetch
    ? `/code/organization/${organization.id}${
        queryString ? `?${queryString}` : ''
      }`
    : null;

  const { data, error, isLoading, mutate } = useSWR<CodeDataTypes | undefined>(
    swrKey,
    fetcher
  );

  // const { data, error, isLoading, mutate } = useSWR<CodeDataTypes>(
  //   `/code/organization/${organization?.id}${
  //     queryString ? `?${queryString}` : ''
  //   }`,
  //   fetcher
  // );

  const form = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
  });

  const generateCode = async (data: CodeFormData) => {
    setServerError('');
    setGenerateCodeLoading(true);
    try {
      const res = await api.post('/code/generate-bulk-code', data);
      if (res.status === 201) {
        setBulkCode(res.data.doc);
        mutate();
        if (Array.from(res.data.doc).length === 1) {
          setGeneratedCodeCount(res.data.doc.length);
          setGeneratedCode(res.data.doc[0].code);
        }
        setBulkCode(res.data.doc);
        router.push('/codes');
      }
      toast.success('Code(s) generated successfully');
      setGenerateCodeLoading(false);
    } catch (error: any) {
      setGenerateCodeLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not create Code';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const deleteCode = async (id: string | undefined | null) => {
    setSingleCodeLoading(true);
    try {
      const res = await api.delete(`/code/${id}`);
      mutate();
      if (res.status === 200) {
        setSingleCode(res.data.doc);
        mutate();
      }
      setSingleCodeLoading(false);
      toast.success('Code deleted successfully');
    } catch (error: any) {
      setSingleCodeLoading(false);
      const errorMessage =
        error.response?.data?.message || error.message || 'Could not Edit Code';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return {
    data: data?.doc,
    form,
    isLoading,
    mutate,
    error,
    generateCode,
    singleCode,
    serverError,
    singleCodeLoading,
    deleteCode,
    generateCodeLoading,
    generatedCodeCount,
    generatedCode,
    setGeneratedCodeCount,
    bulkCode,
  };
};
