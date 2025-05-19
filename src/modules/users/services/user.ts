import api from "@/core/services/api";
import { IUser } from "@/types/user.types";
import { useAltStore } from "@/lib/zustand/userStore";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { usersData } from "../types/users.types";
import { useState } from "react";
import { useParams } from "next/navigation";

export const useUserService = () => {
    const [ singleUser, setSingleUser ] = useState<IUser | null>(null);
    const [ singleUserLoading, setSingleUserLoading ] = useState<boolean>(false);
    const [ singleUserError, setSingleUserError ] = useState<string>("")
    const { id } = useParams();

    const organization = useAltStore(state => state.organization)
    const { data, error, isLoading } = useSWR< usersData | undefined>(`/users/get_users_by_organization/${organization?.id}`, fetcher);

    const getASingleUser = async () => {
        setSingleUserLoading(true)
        try{
            const res = await api.get(`/users/${id}`);
            if(res.status === 200){
                setSingleUser(res.data.doc)
            }
            setSingleUserLoading(false)
        } catch(err: any){
            setSingleUserLoading(false)
            const errorMessage =
                err.response?.data?.message || err.message || "Could not get User";
            setSingleUserError(errorMessage)
        }
    };

    const blockUser = async () => {
        setSingleUserLoading(true);
        try{
            const res = await api.patch(`/users/block/${id}`);
            if(res.status === 200){
                setSingleUser(res.data.doc)
                getASingleUser()
            }
            setSingleUserLoading(false)
        } catch(err : any){
            setSingleUserLoading(false)
            const errorMessage =
                err.response?.data?.message || err.message || "Could not get User";
            setSingleUserError(errorMessage)
        }
    };

    const unBlockUser = async () => {
        setSingleUserLoading(true);
        try{
            const res = await api.patch(`/users/unblocked/${id}`);
            if(res.status === 200){
                setSingleUser(res.data.doc)
                getASingleUser()
            }
            setSingleUserLoading(false)
        } catch(err : any){
            setSingleUserLoading(false)
            const errorMessage =
                err.response?.data?.message || err.message || "Could not get User";
            setSingleUserError(errorMessage)
        }
    };
    
    return {
        data: data?.doc,
        error,
        isLoading,
        singleUserError,
        singleUserLoading,
        singleUser,
        getASingleUser,
        blockUser,
        unBlockUser
    }
};