/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/core/services/api";
import useSWR from "swr";
import { useAltStore } from "@/lib/zustand/userStore";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import { ExamType, ExamDataType } from "@/types/exam.types";
import { examSchema, ExamFormData } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EditExamCategoryFormData, editExamCategorySchema, ExamCategoryFormData, examCategorySchema } from "../schema/examCategory";
import { ExamCategoryType } from "@/types/examCategory.types";
import { useParams } from "next/navigation";

export const useExamService = () => {
    const organization = useAltStore(state => state.organization);
    const [ singleExam, setSingleExam ] = useState<ExamType | null>(null);
    const [ singleExamLoading, setSingleExamLoading ] = useState<boolean>(false);
    const [ serverError, setServerError ] = useState<string | null>(null)
    const [ examCategoryList, setExamCategoryList ] = useState<ExamCategoryType[] | null>(null);
    const [ examCategoryLoading, setExamCategoryLoading ] = useState<boolean>(false)
    const { id } = useParams<{ id: string | undefined }>()
    const [ examCategory, setExamCategory ] = useState<ExamCategoryType | null>(null)
    // const [ exam ]
    const router = useRouter()

    const { data, error, isLoading, mutate } = useSWR<ExamDataType>(`/exams/organization/${organization?.id}`, fetcher);

    const form = useForm<ExamFormData>({
        resolver: zodResolver(examSchema)
    });

    const examCategoryForm = useForm<ExamCategoryFormData>({
        resolver: zodResolver(examCategorySchema)
    });

    const editExamCategoryForm = useForm<EditExamCategoryFormData>({
        resolver: zodResolver(editExamCategorySchema)
    });

    const createExam = async (data: FormData) => {
        try {
            const res = await api.post("/exams", data, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            });
            if (res.status === 201) {
                mutate();
                router.push("/exams");
                toast.success("Exam created successfully");
            }
        } catch (error: any) { 
          const errorMessage =
            error.response?.data?.message || error.message || "Could not create exam";
          setServerError(errorMessage);
          toast.error(errorMessage);
        }
      };


    const getSingleExam = async (id: string | undefined) => {
        try{
            setSingleExamLoading(true)
            const res = await api(`/exams/${id}`);
            if(res.status === 200){
                setSingleExam(res.data.doc)
            }
            setSingleExamLoading(false)
        } catch(error: any){
            setSingleExamLoading(false)
            const errorMessage =
                error.response?.data?.message || error.message || "Could not get exam type";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    };


    const editExam = async ({id, data} : { id: string | undefined, data: ExamFormData }) => {
        setServerError("")
        setSingleExamLoading(true)
        try{
            const res = await api.patch(`/exams/${id}`, data);
            if(res.status === 200){
                setSingleExam(res.data.doc)
                getSingleExam(id)
                toast.success(res.data.message)
            }
            setSingleExamLoading(false)
        } catch(error : any ) {
            setSingleExamLoading(false)
            const errorMessage =
                error.response?.data?.message || error.message || "Could not Edit exam type";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    }

    const deleteExam = async (id: string | undefined | null) => {
        try{
            const res = await api.delete(`/exams/${id}`);
            if(res.status === 200){
                mutate()
                toast.success(res.data.message)
                router.back()
            }
        } catch(error: any){
            const errorMessage =
                error.response?.data?.message || error.message || "Could not delete this exam type";
                setServerError(errorMessage);
                toast.error(errorMessage)
        }
    }

    const createExamCategory = async (data: ExamCategoryFormData) => {
        try{
            const res = await api.post("/exam-category", data);
            if(res.status === 201){
                toast.success(res.data.message)
                getExamCategories(id)
                setExamCategoryList(res.data.doc)
            }
        } catch(error: any){
            const errorMessage =
            error.response?.data?.message || error.message || "Could not create exam category";
            setServerError(errorMessage);
            toast.error(errorMessage)
        }
    };

    const getExamCategories = async (id: string | undefined) => {
        try{
            setExamCategoryLoading(true)
            const res = await api(`/exam-category/exam/${id}`);
            if(res.status === 200){
                toast.success(res.data.message)
                setExamCategoryList(res.data.doc)
            }
            setExamCategoryLoading(false)
        } catch(error: any){
            setExamCategoryLoading(false)
            const errorMessage = error.response?.data?.message || error.message || "Could not get this exam categories";
            setServerError(errorMessage);
            toast.error(errorMessage)
        }
    }

    const getAnExamCategory = async (id: string) => {
        try{
            setExamCategoryLoading(true)
            const res = await api(`/exam-category/${id}`);
            if(res.status === 200){
                // toast.success(res.data.message)
                setExamCategory(res.data.doc)
            }
            setExamCategoryLoading(false)
        } catch(error: any){
            setExamCategoryLoading(false)
            const errorMessage = error.response?.data?.message || error.message || "Could not get this exam categories";
            setServerError(errorMessage);
            toast.error(errorMessage)
        }
    };

    const editExamCategory = async (id: string, data: EditExamCategoryFormData) => {
        try{
            setExamCategoryLoading(true)
            const res = await api.patch(`/exam-category/${id}`, data);
            if(res.status === 200){
                toast.success(res.data.message)
                setExamCategory(res.data.doc)
            }
            setExamCategoryLoading(false)
        } catch(error : any){
            setExamCategoryLoading(false)
            const errorMessage = error.response?.data?.message || error.message || "Could not update this exam categories";
            setServerError(errorMessage);
            toast.error(errorMessage)
        }
    };

    const removeExamCategory = async (id:string) => {
        try{
            setExamCategoryLoading(true)
            const res = await api.post(`/exam-category/remove/${id}`, data);
            if(res.status === 200){
                toast.success(res.data.message)
                setExamCategory(res.data.doc)
            }
            setExamCategoryLoading(false)
        } catch(error : any){
            setExamCategoryLoading(false)
            const errorMessage = error.response?.data?.message || error.message || "Could not remove this exam categories";
            setServerError(errorMessage);
            toast.error(errorMessage)
        }
    }

    return {
        data: data?.doc,
        isLoading,
        mutate,
        singleExam,
        form,
        error,
        serverError,
        createExam,
        singleExamLoading,
        getSingleExam,
        deleteExam,
        editExam,
        examCategoryForm,
        createExamCategory,
        examCategoryList,
        getExamCategories,
        examCategoryLoading,
        getAnExamCategory,
        examCategory,
        editExamCategoryForm,
        editExamCategory,
        removeExamCategory
    }
}