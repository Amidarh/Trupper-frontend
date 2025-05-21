import api from "@/core/services/api";
import useSWR from "swr";
import { useAltStore } from "@/lib/zustand/userStore";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import { SubCategoryTypes, SubCategoryDataTypes } from "@/types/categories.types";
import { SubCategoryFormData, subCategorySchema } from "../schema/categoriesSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSubCategoryService = () => {
    const organization = useAltStore(state => state.organization);
    const [ singleSubCategory, setSingleSubCategory ] = useState<SubCategoryTypes | null>(null);
    const [ singleSubCategoryLoading, setSingleSubCategoryLoading ] = useState<boolean>(false);
    const [serverError, setServerError] = useState("");
        const [ subCategory, setSubCategory ] = useState<SubCategoryTypes[] | null | undefined>(null);
        const [ subCategoryLoading, setSubCategoryLoading ] = useState<boolean>(false);
    const router = useRouter()

    const { data, error, isLoading, mutate } = useSWR<SubCategoryDataTypes>(`/category/category-two-by-organization/${organization?.id}`, fetcher);

    const form = useForm<SubCategoryFormData>({
        resolver: zodResolver(subCategorySchema)
    });

    const createSubCategory = async (data: SubCategoryFormData) => {
        setServerError("")
        try{
            const res = await api.post('/category/category-two', data)
            if(res.status === 201){
                router.push("/categories")
            }
        } catch(error : any ) {
            const errorMessage =
                error.response?.data?.message || error.message || "Could not create sub Category";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    }

    const editSubCategory = async ({id, data} : { id: string | undefined, data: SubCategoryFormData }) => {
        setServerError("")
        setSingleSubCategoryLoading(true)
        try{
            const res = await api.patch(`/category/category-two/${id}`, data);
            if(res.status === 200){
                setSingleSubCategory(res.data.doc)
            }
            setSingleSubCategoryLoading(false)
        } catch(error : any ) {
            setSingleSubCategoryLoading(false)
            const errorMessage =
                error.response?.data?.message || error.message || "Could not Edit Category";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    }

    const deleteSubCategory = async (id: string | undefined | null) => {
            try{
                const res = await api.delete(`/category/category-two/${id}`);
                if(res.status === 200){
                    mutate()
                    router.push("/categories")
                }
            } catch(error: any){
                const errorMessage =
                    error.response?.data?.message || error.message || "Could not delete Category";
                    setServerError(errorMessage);
                    toast.error(errorMessage)
            }
        }
    
        const getSingleSubCategory = async (id: string) => {
            try{
                setSingleSubCategoryLoading(true)
                const res = await api(`/category/category-two/${id}`);
                if(res.status === 200){
                    setSingleSubCategory(res.data.doc)
                    setSingleSubCategoryLoading(false)
                }
                setSingleSubCategoryLoading(false)
            } catch(error: any){
                setSingleSubCategoryLoading(false)
                const errorMessage =
                    error.response?.data?.message || error.message || "Could not get category";
                    setServerError(errorMessage);
                    toast.error(errorMessage)
            }
        }

        const getSubCategoryByCategory = async (id: string | undefined) => {
            setSubCategoryLoading(true);
            setServerError("");
            try {
                const res = await api.get(`/category/category-two-by-category-one/${id}`);
                if (res.status === 200) {
                    setSubCategory(res.data.doc);
                    setSubCategoryLoading(false);
                }
            } catch (error: any) {
                const errorMessage =
                    error.response?.data?.message || error.message || "Could not get Sub category";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        };

    return {
        error,
        data: data?.doc,
        isLoading,
        mutate,
        createSubCategory,
        serverError,
        form,
        deleteSubCategory,
        getSingleSubCategory,
        singleSubCategory,
        singleSubCategoryLoading,
        editSubCategory,
        getSubCategoryByCategory,
        subCategory,
        subCategoryLoading,
    }

}