import api from "@/core/services/api";
import useSWR from "swr";
import { useAltStore } from "@/lib/zustand/userStore";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import { examTypeSchema, ExamTypeFormData } from "../../exam/schema";
import { ExamTypes, ExamDataTypes } from "@/types/examTypes.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useExamTypeService = () => {
    const organization = useAltStore(state => state.organization);
    const [ singleExamType, setSingleExamType ] = useState< ExamTypes | null>(null);
    const [ singleExamTypeLoading, setSingleExamTypeLoading ] = useState<boolean>(false);
    const [ serverError, setServerError ] = useState<string | null>(null)
    const router = useRouter()

    const { data, error, isLoading, mutate } = useSWR<ExamDataTypes>(`/exam-type/organization/${organization?.id}`, fetcher);

    const form = useForm<ExamTypeFormData>({
        resolver: zodResolver(examTypeSchema)
    });


    const createExamType = async (data: ExamTypeFormData) => {
        try{
            const res = await api.post('/exam-type', data);
            if(res.status === 201){
                mutate()
                router.push("/exam-types")
            }
        } catch(error: any){
            const errorMessage =
                error.response?.data?.message || error.message || "Could not create Category";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    }

    const getSingleExamType = async (id: string | undefined) => {
        try{
            setSingleExamTypeLoading(true)
            const res = await api(`/exam-type/${id}`);
            if(res.status === 200){
                setSingleExamType(res.data.doc)
            }
            setSingleExamTypeLoading(false)
        } catch(error: any){
            setSingleExamTypeLoading(false)
            const errorMessage =
                error.response?.data?.message || error.message || "Could not get exam type";
                setServerError(errorMessage);
                toast.error(errorMessage)
        }
    }


      const editExamType = async ({id, data} : { id: string | undefined, data: ExamTypeFormData }) => {
            setServerError("")
            setSingleExamTypeLoading(true)
            try{
                const res = await api.patch(`/exam-type/${id}`, data);
                if(res.status === 200){
                    setSingleExamType(res.data.doc)
                    getSingleExamType(id)
                    toast.success(res.data.message)
                }
                setSingleExamTypeLoading(false)
            } catch(error : any ) {
                setSingleExamTypeLoading(false)
                const errorMessage =
                    error.response?.data?.message || error.message || "Could not Edit exam type";
                    setServerError(errorMessage);
                toast.error(errorMessage)
            }
        }
    
        const deleteExamType = async (id: string | undefined | null) => {
            try{
                const res = await api.delete(`/exam-type/${id}`);
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

    return {
        data : data?.doc,
        error,
        isLoading,
        mutate,
        form,
        createExamType,
        singleExamType,
        singleExamTypeLoading,
        editExamType,
        deleteExamType,
        getSingleExamType,
        serverError
    }
    
}