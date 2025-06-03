import axios from 'axios';
import { useAltStore } from '@/lib/zustand/userStore';

// Create Axios instance
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BASE_API_URL2 || process.env.NEXT_PUBLIC_BASE_API_URL
    : '',
});

// Request interceptor: Attach token, organization data, and handle form data safely
api.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined') {
      const { organization } = useAltStore.getState();
      const key = `${(organization?.name || '').replace(/\s+/g, '_')}-accessToken`;
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${key}=`))
        ?.split('=')[1];

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      // Handle FormData
      if (config.data instanceof FormData) {
        const formCopy = new FormData();
        for (const [k, v] of config.data.entries()) {
          formCopy.append(k, v);
        }

        if (organization?.id) {
          formCopy.append('organization', organization.id);
        }

        config.data = formCopy;

        // Let browser handle Content-Type with proper boundary
        delete config.headers['Content-Type'];
      } else if (config.data && organization?.id) {
        // JSON payload
        config.headers['Content-Type'] = 'application/json';
        config.data = {
          ...config.data,
          organization: organization.id,
        };
      }
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
        if (typeof window !== 'undefined') {
          const { organization } = useAltStore.getState();
          const key = `${(organization?.name || '').replace(/\s+/g, '_')}-accessToken`;
          const refreshKey = `${(organization?.name || '').replace(/\s+/g, '_')}-refreshToken`;
          const refreshToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${refreshKey}=`))
            ?.split('=')[1];

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/token`,
            { refreshToken },
            { withCredentials: true }
          );

          const newAccessToken = res.data.doc.token;
          document.cookie = `${key}=${newAccessToken}; path=/; secure; HttpOnly`;

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // Let the browser handle multipart Content-Type on retry
          if (originalRequest.data instanceof FormData) {
            delete originalRequest.headers['Content-Type'];
          } else {
            originalRequest.headers['Content-Type'] = 'application/json';
          }

          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        if (typeof window !== 'undefined') {
          const { organization } = useAltStore.getState();
          const key = `${(organization?.name || '').replace(/\s+/g, '_')}-accessToken`;
          document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
