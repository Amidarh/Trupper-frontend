import api from "@/core/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAltStore } from "@/lib/zustand/userStore";

export function useLogout (){
    const router = useRouter();
    const [ serverError, setServerError ] = useState<string>("");
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const logoUser = useAltStore(state => state.logout);

    const logout = async () => {
        setServerError("")
        setIsLoading(true)
        try{
            const res = await api.post("/auth/logout");
            if(res.status === 200){
                logoUser()
                router.push('/login');
            }
            setIsLoading(false)
        } catch(error: any){
            setIsLoading(false)
            const errorMessage = error.response?.data?.message || error.message || "Logout Failed";
            setServerError(errorMessage);
        }
    };
    return {
        isLoading,
        logout,
        serverError
    }
}