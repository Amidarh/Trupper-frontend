// src/lib/api.ts
import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_BASE_API_URL : "",
  headers: {
    "Content-Type": "application/json",
  }
});

// Request interceptor: Attach token and add organization data to the body
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("trupper-accessToken");
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Corrected header setting
      }
    }

    if (config.data) {
      const organizationData = "6809685429ee99bca506a729"; // This is already a string, no need for JSON.parse()
      console.log("Adding organization data to request:", organizationData);

      if (organizationData) {
        // Add the organization data to the request body
        config.data = {
          ...config.data,
          organization: organizationData, // Adding the organization ID to the request body
        };
      }
    }
    console.log("Request body with organization data:", config.data);

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
          {}, // empty body (if refresh is cookie-based)
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        if (typeof window !== "undefined") {
          localStorage.setItem("trupper-accessToken", newAccessToken);
        }

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        if (typeof window !== "undefined") {
          localStorage.removeItem("trupper-accessToken");
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
