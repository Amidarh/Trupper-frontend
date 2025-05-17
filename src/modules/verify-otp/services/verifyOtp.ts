import api from "@/core/services/api";
import { useSearchParams } from "next/navigation";
import {useForm} from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { VerifyOtpFormData, verifyOtpSchema } from "../schema/verifyOtpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAltStore } from "@/lib/zustand/userStore";

export function useVerifyOtp(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('token');
    const [ serverError, setServerError ] = useState("");
    const [ resendLoading, setResendLoading ] = useState<boolean>(false)
    const { organization, setUser } = useAltStore() 

    const form = useForm<VerifyOtpFormData>({
        resolver:zodResolver(verifyOtpSchema)
    });

    const verifyOtp = async (data: VerifyOtpFormData) => {
        setServerError("");
        try{
            const res = await api.post(`/auth/verify-email/${query}`, data);
            if(res.status === 200){
                const { user, token, refreshToken } = res.data.doc;
                const orgName = (organization?.name || "default").replace(/\s+/g, "_");
                document.cookie = `${orgName}-accessToken=${token}; path=/; secure; SameSite=Strict`;
                document.cookie = `${orgName}-refreshToken=${refreshToken}; path=/; secure; SameSite=Strict`;
                document.cookie = `role=${user.role}; path=/; secure; SameSite=Strict`;
                document.cookie = `organizationId=${organization?.id || "default"}; path=/; secure; SameSite=Strict`;
          
                // Update Zustand store
                setUser(user);
                router.push(`/my-dashboard`)
            }
        } catch(err: any){
            const errorMessage =
                err.response?.data?.message || err.message || "Otp verification failed";
            setServerError(errorMessage);
        }
    }

    const resendVerificationCode = async () => {
        setServerError("");
        setResendLoading(true)
        try{
            const res = await api.post(`/auth/resend-email-verification-code/${query}`);
            if(res.status === 200){
                setResendLoading(false)
                toast.success("Two factor authentication code sent successfully")
            }
        } catch(err: any){
            setResendLoading(false)
            const errorMessage =
                err.response?.data?.message || err.message || "Failed to send verification code";
            setServerError(errorMessage);
        }
    };

    return {
        form,
        verifyOtp,
        serverError,
        resendVerificationCode,
        resendLoading
    }
}