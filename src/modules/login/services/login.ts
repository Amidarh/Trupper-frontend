// src/modules/login/services/useLogin.ts
import api from "@/core/services/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema, LoginFormData } from "../schema/loginSchema";
import { useAltStore } from "@/lib/zustand/userStore";

export function useLogin() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const setUser = useAltStore(state => state.setUser);
  const organization = useAltStore(state => state.organization);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const login = async (data: LoginFormData) => {
    setServerError("");

    try {
      const res = await api.post("/auth/login", data);
      
      if(res.status === 203){
        router.push(`/2fa?token=${res.data.doc.token}`)
      }
      let userData = res.data.doc.user;
      console.log({userData})
      let accessToken = res.data.doc.token;
      let refreshToken = res.data.doc.refreshToken      
      localStorage.setItem(`{(organization?.name || '').replace(/\s+/g, '_')}-accessToken`, accessToken);
      localStorage.setItem(`{(organization?.name || '').replace(/\s+/g, '_')}-refreshToken`, refreshToken);

      setUser(userData)
      if(userData.role === "user"){
        router.push("/my-dashboard");
      }
      // Redirect on success
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
