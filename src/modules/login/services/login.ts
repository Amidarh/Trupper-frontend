// src/modules/login/services/useLogin.ts
import api from "@/core/services/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema, LoginFormData } from "../schema/loginSchema";

export function useLogin() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const login = async (data: LoginFormData) => {
    setServerError("");

    try {
      const res = await api.post("/auth/login", data);
      
      let accessToken;
      if(res.status === 203){
        router.push(`/2fa?token=${res.data.doc.token}`)
      }
      
      // localStorage.setItem("trupper-accessToken", accessToken);
      
      // Redirect on success
      router.push("/dashboard");
    } catch (err: any) {
      console.log(err)
            if(err.status === 406){
              router.push(`/verify-otp?token=${err.response.data.doc.token}`)
            }
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";
      setServerError(errorMessage);
    }
  };

  return {
    form,
    login,
    serverError,
  };
}
