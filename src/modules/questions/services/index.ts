import api from '@/core/services/api';
import useSWR from 'swr';
import { useAltStore } from '@/lib/zustand/userStore';
import { fetcher } from '@/lib/fetcher';
import { useState } from 'react';
import { questionSchema, QuestionFormData } from '../schemas';
import { QuestionType, QuestionDataType } from '@/types/question.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { toQueryString } from '@/utils';

export const useQuestionService = (queryParams: Record<string, any>) => {
  const organization = useAltStore((state) => state.organization);
  const [singleQuestion, setSingleQuestion] = useState<QuestionType | null>(
    null
  );
  const [singleQuestionLoading, setSingleQuestionLoading] =
    useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const shouldFetch = !!organization?.id;

  // Build query string from queryParams object
  const queryString = toQueryString(queryParams);

  // SWR key: null disables fetch, else use full url
  const swrKey = shouldFetch
    ? `/questions/organization/${organization.id}${
        queryString ? `?${queryString}` : ''
      }`
    : null;

  const { data, error, mutate, isLoading } = useSWR<QuestionDataType>(
    swrKey,
    fetcher
  );

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
  });

  const createQuestion = async (data: FormData) => {
    try {
      console.log(data);
      const res = await api.post('/questions', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status === 201) {
        mutate();
        toast.success('Question added successfully!');
        router.push('/questions');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not create question';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const getQuestion = async (id: string | undefined) => {
    try {
      setSingleQuestionLoading(true);
      const res = await api.get(`/questions/${id}`);
      if (res.status === 200) {
        setSingleQuestion(res.data.doc);
      }
      setSingleQuestionLoading(false);
    } catch (error: any) {
      setSingleQuestionLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not create question';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const deleteQuestion = async (id: string | undefined) => {
    try {
      const res = await api.delete(`/questions/${id}`);
      if (res.status === 200) {
        mutate();
        toast.success(res.data.message);
        router.back();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not delete this question';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const editQuestion = async (
    id: string | undefined,
    data: QuestionFormData
  ) => {
    setServerError(null);
    setSingleQuestionLoading(true);
    try {
      const res = await api.patch(`/questions/${id}`, data);
      if (res.status === 200) {
        setSingleQuestion(res.data.doc);
        getQuestion(id);
        toast.success(res.data.message);
      }
      setSingleQuestionLoading(false);
    } catch (error: any) {
      setSingleQuestionLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not update this question';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return {
    createQuestion,
    data: data?.doc,
    mutate,
    error,
    singleQuestion,
    singleQuestionLoading,
    editQuestion,
    deleteQuestion,
    getQuestion,
    serverError,
    isLoading,
    form,
  };
};
