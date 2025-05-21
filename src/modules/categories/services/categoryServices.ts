import api from "@/core/services/api";
import useSWR from "swr";
import { useAltStore } from "@/lib/zustand/userStore";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import { CategoryDataTypes, CategoryTypes } from "@/types/categories.types";
import { categorySchema, CategoryFormData } from "../schema/categoriesSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent } from "@/components/ui/alert-dialog";

export const useCategoryService = () => {
    const organization = useAltStore(state => state.organization)
    const [ singleCategory, setSingleCategory ] = useState<CategoryTypes | null>(null);
    const [ singleCategoryLoading, setSingleCategoryLoading ] = useState<boolean>(false);
    const [serverError, setServerError] = useState("");
    const router = useRouter()

    const { data, error, isLoading, mutate } = useSWR<CategoryDataTypes>(`/category/category-one-by-organization/${organization?.id}`, fetcher);

    const form = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema)
    })

    const createCategory = async (data: CategoryFormData) => {
        setServerError("")
        try{
            const res = await api.post('/category/category-one', data)
            if(res.status === 201){
                router.push("/categories")
            }
        } catch(error : any ) {
            const errorMessage =
                error.response?.data?.message || error.message || "Could not create Category";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    }

    const editCategory = async ({id, data} : { id: string | undefined, data: CategoryFormData }) => {
        setServerError("")
        setSingleCategoryLoading(true)
        try{
            const res = await api.patch(`/category/category-one/${id}`, data);
            if(res.status === 200){
                setSingleCategory(res.data.doc)
            }
            setSingleCategoryLoading(false)
        } catch(error : any ) {
            setSingleCategoryLoading(false)
            const errorMessage =
                error.response?.data?.message || error.message || "Could not Edit Category";
                setServerError(errorMessage);
            toast.error(errorMessage)
        }
    }

    const deleteCategory = async (id: string | undefined | null) => {
        try{
            const res = await api.delete(`/category/category-one/${id}`);
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

    const getSingleCategory = async (id: string) => {
        try{
            setSingleCategoryLoading(true)
            const res = await api(`/category/category-one/${id}`);
            if(res.status === 200){
                setSingleCategory(res.data.doc)
            }
            setSingleCategoryLoading(false)
        } catch(error: any){
            setSingleCategoryLoading(false)
            const errorMessage =
                error.response?.data?.message || error.message || "Could not get category";
                setServerError(errorMessage);
                toast.error(errorMessage)
        }
    } 

    return {
        error,
        data: data?.doc,
        isLoading,
        mutate,
        createCategory,
        serverError,
        form,
        deleteCategory,
        getSingleCategory,
        singleCategory,
        singleCategoryLoading,
        editCategory
    }

}