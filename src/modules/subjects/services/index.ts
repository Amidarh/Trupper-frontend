/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/core/services/api';
import { useState } from 'react';
import { subjectSchema, SubjectFormData } from '../schemas';
import { SubjectType } from '@/types/subject.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useSubjectService = () => {
  const [singleSubject, setSingleSubject] = useState<SubjectType | null>(null);
  const [singleSubjectLoading, setSingleSubjectLoading] =
    useState<boolean>(false);
  const [subjectList, setSubjectList] = useState<SubjectType[] | null>(null);
  const [subjectListLoading, setSubjectListLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
  });

  const getSubjectByExam = async (id: string | undefined) => {
    try {
      setSubjectListLoading(true);
      const res = await api.get(`/subjects/exam/${id}`);
      if (res.status === 200) {
        setSubjectList(res.data.doc);
      }
      setSubjectListLoading(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not create subjects';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const editSubject = async ({
    id,
    data,
  }: {
    id: string | undefined;
    data: SubjectFormData;
  }) => {
    setServerError('');
    setSingleSubjectLoading(true);
    try {
      const res = await api.patch(`/subjects/${id}`, data);
      if (res.status === 200) {
        setSingleSubject(res.data.doc);
        getSingleSubject(id);
        toast.success(res.data.message);
      }
      setSingleSubjectLoading(false);
    } catch (error: any) {
      setSingleSubjectLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not updated subject';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const createSubject = async (data: SubjectFormData) => {
    try {
      const res = await api.post('/subjects', data);
      if (res.status === 201) {
        toast.success('Subject Added Successfully');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not add subject';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const deleteSubject = async (id: string | undefined) => {
    try {
      const res = await api.delete(`/subjects/${id}`);
      if (res.status === 200) {
        toast.success('Subject deleted successfully');
        router.back();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not delete subject';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const getSingleSubject = async (subjectId: string | undefined) => {
    try {
      setSingleSubjectLoading(true);
      const res = await api.get(`/subjects/${subjectId}`);
      console.log(res);
      if (res.status === 200) {
        setSingleSubject(res.data.doc);
      }
      setSingleSubjectLoading(false);
    } catch (error: any) {
      setSingleSubjectLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not get subject';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return {
    form,
    createSubject,
    singleSubject,
    singleSubjectLoading,
    getSingleSubject,
    getSubjectByExam,
    subjectListLoading,
    subjectList,
    serverError,
    editSubject,
    deleteSubject,
  };
};
