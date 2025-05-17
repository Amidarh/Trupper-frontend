// src/lib/api.ts
import axios from "axios";
import { useAltStore } from "@/lib/zustand/userStore";

// Create Axios instance
const api = axios.create({
  baseURL: process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASE_API_URL
    : "",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Attach token and add organization data to the body
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const organization = useAltStore.getState().organization;
      const key = `${(organization?.name || "").replace(/\s+/g, "_")}-accessToken`;
      const token = localStorage.getItem(key);

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    if (config.data) {
      const organization = useAltStore.getState().organization;
      const organizationData = organization?.id;
      config.data = {
        ...config.data,
        organization: organizationData,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Token refresh logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        if (typeof window !== "undefined") {
          const organization = useAltStore.getState().organization;
          const key = `${(organization?.name || "").replace(/\s+/g, "_")}-accessToken`;

          localStorage.setItem(key, newAccessToken);

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        if (typeof window !== "undefined") {
          const organization = useAltStore.getState().organization;
          const key = `${(organization?.name || "").replace(/\s+/g, "_")}-accessToken`;
          localStorage.removeItem(key);
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
