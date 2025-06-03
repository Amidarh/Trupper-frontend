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

export const useExamService = () => {
    const organization = useAltStore(state => state.organization);
    const [ singleExam, setSingleExam ] = useState<ExamType | null>(null);
    const [ singleExamLoading, setSingleExamLoading ] = useState<boolean>(false);
    const [ serverError, setServerError ] = useState<string | null>(null)
    const router = useRouter()

    const { data, error, isLoading, mutate } = useSWR<ExamDataType>(`/exams/organization/${organization?.id}`, fetcher);

    const form = useForm<ExamFormData>({
        resolver: zodResolver(examSchema)
    });

    const start = Date.now();
    const createExam = async (data: FormData) => {
        try {
            console.log("exam Data", data)
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
          // ... your code ...
        console.log("Took", Date.now() - start, "ms");
        } catch (error: any) {
            // ... your code ...
        console.log("Took", Date.now() - start, "ms");  
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
        editExam
    }
}