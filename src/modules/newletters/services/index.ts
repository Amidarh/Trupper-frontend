import api from "@/core/services/api";
import useSWR from "swr";
import { useAltStore } from "@/lib/zustand/userStore";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import { NewsletterFormData, newsletterSchema } from "../schema";
import { NewsletterType, NewsletterDataType } from "@/types/newsletter.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useNewsletterService = () => {
    const organization = useAltStore(state => state.organization);
    const [ singleNewsletter, setSingleNewsletter ] = useState<NewsletterType | null>(null);
    const [ singleNewsletterLoading, setSingleNewsletterLoading ] = useState<boolean>(false);
    const [ serverError, setServerError ] = useState<string | null>(null);
    const router = useRouter();

    const { data, error, isLoading, mutate } = useSWR<NewsletterDataType>(`/newsletter/organization/${organization?.id}`, fetcher);

    const form = useForm<NewsletterFormData>({
        resolver: zodResolver(newsletterSchema)
    });



    const createAndDraftNewsletter = async (data: NewsletterFormData ) => {
        setServerError("")
        try{
            const res = await api.post('/newsletter/draft', data)
            if(res.status === 201){
                mutate()
                router.push("/newsletters")
            }
        } catch(error : any ) {
            const errorMessage =
                error.response?.data?.message || error.message || "Could not create as save newsletter";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    };

    const createAndSend = async (data: NewsletterFormData) => {
        setServerError("");
        try{
            const res = await api.post('/newsletter/send', data)
            if(res.status === 201){
                mutate()
                router.push("/newsletters")
            }
        } catch(error: any){
            const errorMessage =
                error.response?.data?.message || error.message || "Could not create and send newsletter";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    }

    const sendDraft = async (id : string) => {
        setServerError("");
        try{
            const res = await api.post(`/newsletter/send_draft/${id}`)
            if(res.status === 200){
                router.push("/newsletters")
                toast.success("Newsletter Sent")
                mutate()
            }
        } catch(error: any){
            const errorMessage =
                error.response?.data?.message || error.message || "Could not send newsletter";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    }
    const editNewsletter = async (id : string, data: NewsletterFormData) => {
        setServerError("");
        try{
            const res = await api.patch(`/newsletter/${id}`, data)
            if(res.status === 200){
                setSingleNewsletter(res.data.doc);
                toast.success("Newsletter Updated successfully");
            }
        } catch(error: any){
            const errorMessage =
                error.response?.data?.message || error.message || "Could not send newsletter";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    }

    const getSingleNewsletter = async(id: string | undefined) => {
        try{
            setSingleNewsletterLoading(false);
            const res = await api(`/newsletter/${id}`);
            if(res.status === 200){
                setSingleNewsletter(res.data.doc)
            }
            setSingleNewsletterLoading(false)
        } catch(error: any){
            const errorMessage =
                error.response?.data?.message || error.message || "Could not get newsletter";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    };

    const deleteNewsletter = async (id: string) => {
        try{
            setSingleNewsletterLoading(false);
            const res = await api.delete(`/newsletter/${id}`);
            if(res.status === 200){
                setSingleNewsletter(res.data.doc)
                toast.success("Newsletter deleted successfully")
            }
            setSingleNewsletterLoading(false)
        } catch(error: any){
            const errorMessage =
                error.response?.data?.message || error.message || "Could not delete Newsletter";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    }

    return {
        data: data?.doc,
        error,
        isLoading,
        mutate,
        singleNewsletter,
        singleNewsletterLoading,
        createAndDraftNewsletter,
        createAndSend,
        getSingleNewsletter,
        serverError,
        form,
        deleteNewsletter,
        sendDraft,
        editNewsletter
    }

}