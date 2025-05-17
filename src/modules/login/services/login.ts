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
  // const setOrganization = useAltStore(state => state.setOrganization);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const login = async (data: LoginFormData) => {
    setServerError("");

    try {
      const res = await api.post("/auth/login", data);
      
      if (res.status === 203) {
        router.push(`/2fa?token=${res.data.doc.token}`);
        return;
      }

      const { user, token, refreshToken } = res.data.doc;
      // console.log({ userData: user });

      // Set cookies client-side
      const orgName = (user.organization?.name || "default").replace(/\s+/g, "_");
      document.cookie = `${orgName}-accessToken=${token}; path=/; secure; SameSite=Strict`;
      document.cookie = `${orgName}-refreshToken=${refreshToken}; path=/; secure; SameSite=Strict`;
      document.cookie = `role=${user.role}; path=/; secure; SameSite=Strict`;
      document.cookie = `organizationId=${user.organization?.id || "default"}; path=/; secure; SameSite=Strict`;

      // Update Zustand store
      setUser(user);
      // setOrganization(user.organization || { id: "default", name: "default" });

      router.push("/my-dashboard");
      // if (user.role === "USER") {
      // } else if (user.role === "ADMIN" || user.role === "SUB_ADMIN") {
      //   router.push("/admin");
      // }
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 406) {
        router.push(`/verify-otp?token=${err.response.data.doc.token}`);
      } else {
        const errorMessage =
          err.response?.data?.message || err.message || "Login failed";
        setServerError(errorMessage);
      }
    }
  };

  return {
    form,
    login,
    serverError,
  };
}