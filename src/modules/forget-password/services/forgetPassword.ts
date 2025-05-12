import api from "@/core/services/api";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { forgetPasswordSchema, ForgetPasswordFormData } from "../schemas/forgetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useForgetPassword (){
    const [ serverError, setServerError ] = useState("");
    const [ successMessage, setSuccessMessage ] = useState("");

    const form = useForm<ForgetPasswordFormData>({
        resolver: zodResolver(forgetPasswordSchema)
    });

    const forgetPassword = async (data: ForgetPasswordFormData) => {
        setServerError("");
        try{
            const res = await api.post("/auth/forgot-password", data)
            if(res.status === 200){
                setSuccessMessage("Reset link sent to email successfully")
            }
        } catch(err: any){
            const errorMessage =
                err.response?.data?.message || err.message || "Otp verification failed";
            setServerError(errorMessage);
        }
    }
    return {
        form,
        forgetPassword,
        serverError,
        successMessage
    }
}