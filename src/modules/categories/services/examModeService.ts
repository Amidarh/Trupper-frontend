/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/core/services/api';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { useState } from 'react';
import { examModeType, examModeDataType } from '@/types/examMode.types';
import { ExamModeFormData, examModeSchema, UpdateExamModeFormData, updateExamModeSchema } from '../schema/categoriesSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';

export const useExamModeService = () => {
    const { id } = useParams<{ id: string | undefined}>();
    const [ singleExamMode, setSingleExamMode ] = useState<examModeType | null>(null)
    const [ singleExamModeLoading, setSingleExamModeLoading ] = useState<boolean>(false);
    const [serverError, setServerError] = useState('');

    const { data, error, isLoading, mutate } = useSWR<examModeDataType>(
        `/exam-mode/sub-category/${id}`,
        fetcher
    );

    const form = useForm<ExamModeFormData>({
        resolver: zodResolver(examModeSchema),
    });

    const updateForm = useForm<UpdateExamModeFormData>({
        resolver: zodResolver(updateExamModeSchema),
    })

    const createExamMode = async (data: ExamModeFormData) => {
        try{
            const res = await api.post('/exam-mode', data);
            if (res.status === 201) {
                mutate()
                toast.success(res.data.message)
            }
        } catch(error: any){
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                'Could not create exam mode';
            setServerError(errorMessage);
            toast.error(errorMessage);
        }
    };

    const getSingleExamMode = async (id: string) => {
        setSingleExamModeLoading(true)
        try{
            const res = await api(`/exam-mode/${id}`);
            if (res.status === 200) {
                setSingleExamMode(res.data.doc)
                toast.success(res.data.message)
            }
            setSingleExamModeLoading(false)
        } catch(error: any){
            setSingleExamModeLoading(false)
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                'Could not get this exam mode';
            setServerError(errorMessage);
            toast.error(errorMessage);
        }
    };

    const updateSingleExamMode = async (id: string, data: ExamModeFormData) => {
        setSingleExamModeLoading(true)
        try{
        const res = await api.patch(`/exam-mode/${id}`, data);
            if (res.status === 201) {
                mutate()
                setSingleExamMode(res.data.doc);
                toast.success(res.data.message)
            }
            setSingleExamModeLoading(false)
        } catch(error: any){
            setSingleExamModeLoading(false)
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                'Could not create exam mode';
            setServerError(errorMessage);
            toast.error(errorMessage);
        }
    }

    const enableExamMode = async (id: string, data: UpdateExamModeFormData) => {
        setSingleExamModeLoading(true)
        try{
        const res = await api.patch(`/exam-mode/${id}`, data);
            if (res.status === 201) {
                mutate()
                setSingleExamMode(res.data.doc);
                toast.success(res.data.message)
            };
            mutate()
            setSingleExamModeLoading(false)
        } catch(error: any){
            setSingleExamModeLoading(false)
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                'Could not create exam mode';
            setServerError(errorMessage);
            toast.error(errorMessage);
        }
    }

    const deleteSingleExamMode = async (id: string | undefined) => {
        setSingleExamModeLoading(true)
        try{
            const res = await api.delete(`/exam-mode/${id}`);
            if (res.status === 200) {
                mutate()
                toast.success(res.data.message)
            }
            setSingleExamModeLoading(false)
        } catch(error: any){
            setSingleExamModeLoading(false)
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                'Could not Edit Category';
            setServerError(errorMessage);
            toast.error(errorMessage);
        }
    }

    return {
        form,
        data: data?.doc,
        error,
        isLoading,
        mutate,
        createExamMode,
        serverError,
        singleExamMode,
        singleExamModeLoading,
        getSingleExamMode,
        deleteSingleExamMode,
        updateSingleExamMode,
        updateForm,
        enableExamMode
    }
}