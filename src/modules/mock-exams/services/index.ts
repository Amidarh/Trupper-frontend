/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/core/services/api';
import { useState } from 'react';
import { toast } from 'sonner';
import { ExamCardFormData, examCardSchema, StartExamFormData } from '../schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExamCardDataType } from '@/types/examCards.types';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { useRouter } from 'next/navigation';
import { useAltStore } from '@/lib/zustand/userStore';
import { SubjectType } from '@/types/subject.types';

export function useMockExamsService() {
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const setExamState = useAltStore((state) => state.setExamState);
  const setUser = useAltStore((state) => state.setUser);
  const setCurrentQuestion = useAltStore((state) => state.setCurrentQuestion);
  const setIsExamOn = useAltStore((state) => state.setIsExamOn);
  const [ categorySubjectList, setCategorySubjectList ] = useState<SubjectType[] | null>(null)
  const router = useRouter();

  const { data, error, isLoading, mutate } = useSWR<ExamCardDataType>(
    `/exam-card`,
    fetcher
  );

  const form = useForm<ExamCardFormData>({
    resolver: zodResolver(examCardSchema),
  });

  const createExamCard = async (data: ExamCardFormData) => {
    try {
      setServerError('');
      const response = await api.post('/exam-card', data);
      if (response.status !== 201) {
        throw new Error('Failed to create exam card');
      }
      examCardSchema.parse(data);
      mutate();
      router.push('/my-exams');
      toast.success(response.data.message || 'Exam card created successfully');
      form.reset();
      return response.data;
    } catch (error: any) {
      setServerError(
        error?.message || 'An error occurred while creating the exam card'
      );
      toast.error(
        error?.message || 'An error occurred while creating the exam card'
      );
    }
  };

  const getExamCardSubject = async (id: string) => {
    try{
      setLoading(true);
      setServerError('');
      const res = await api.get(`/exam-card/exam/${id}`);
      if (res.status === 200) {
        setCategorySubjectList(res.data.doc);
      }
      setLoading(false);
    } catch(error: any){
      setLoading(false);
      setServerError(
        error?.message || 'An error occurred while getting this card details'
      );
      toast.error(
        error?.message || 'An error occurred while getting this card details'
      );
    }
  }

  const deleteExamCard = async (id: string | undefined) => {
    try {
      setLoading(true);
      setServerError('');
      const response = await api.delete(`/exam-card/${id}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete exam card');
      }
      mutate();
      toast.success(response.data.message || 'Exam card deleted successfully');
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setServerError(
        error?.message || 'An error occurred while deleting the exam card'
      );
      toast.error(
        error?.message || 'An error occurred while deleting the exam card'
      );
    }
  };

  const startExam = async (id: string | undefined, data: StartExamFormData) => {
    try {
      setLoading(true);
      setServerError('');
      const response = await api.post(`/exams/start-exam/${id}`, data);
      if (response.status === 201) {
        router.push('/exam');
        toast.success(response.data.message);
        const { questions, duration, subject, resultId, user } =
          response.data.doc;
        const examState = { questions, duration, subject, resultId };
        setExamState(examState);
        setUser(user);
        setLoading(false);
        setCurrentQuestion(1);
        setIsExamOn(true)
      }
      console.log(response.data);
    } catch (error: any) {
      setLoading(false);
      setServerError(
        error?.message || 'An error occurred while deleting the exam card'
      );
      toast.error(
        error?.message || 'An error occurred while deleting the exam card'
      );
    }
  };

  return {
    createExamCard,
    serverError,
    setServerError,
    form,
    data: data?.doc,
    error,
    isLoading,
    mutate,
    deleteExamCard,
    loading,
    startExam,
    categorySubjectList,
    getExamCardSubject
  };
}
