import api from "@/core/services/api";
import useSWR from "swr";
import { useAltStore } from "@/lib/zustand/userStore";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import { codeType, CodeDataTypes } from "../types";
import { codeSchema, CodeFormData } from "../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCodeService = () => {
    const organization = useAltStore(state => state.organization);
    const [ singleCode, setSingleCode ] = useState<codeType | null>(null);
    const [ singleCodeLoading, setSingleCodeLoading ] = useState<boolean>(false);
    const [serverError, setServerError] = useState("");
    const router = useRouter();

    const { data, error, isLoading, mutate } = useSWR<CodeDataTypes>(`/code/organization/${organization?.id}`, fetcher);

    const form = useForm<CodeFormData>({
        resolver: zodResolver(codeSchema)
    })

    const generateCode = async (data: CodeFormData) => {
        setServerError("")
        try{
            const res = await api.post('/code/generate-bulk-code', data)
            if(res.status === 201){
                mutate();
                router.push("/codes")
            }
        } catch(error : any ) {
            const errorMessage =
                error.response?.data?.message || error.message || "Could not create Code";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    };

    const deleteCode = async (id: string | undefined | null) => {
        setSingleCodeLoading(true)
        try{
            const res = await api.delete(`/code/${id}`);
            if(res.status === 200){
                setSingleCode(res.data.doc)
            }
            setSingleCodeLoading(false)
        } catch(error : any ) {
            setSingleCodeLoading(false)
            const errorMessage =
                error.response?.data?.message || error.message || "Could not Edit Code";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    }

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
        deleteCode
    }
}