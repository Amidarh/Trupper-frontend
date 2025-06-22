/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/core/services/api';
import { useState } from 'react';
import { toast } from 'sonner';
import { ExamCardFormData, examCardSchema } from '../schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function useMockExamsService() {
  const [serverError, setServerError] = useState('');

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
      console.log('Exam card created successfully:', response.data);
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

  return {
    createExamCard,
    serverError,
    setServerError,
    form,
  };
}
