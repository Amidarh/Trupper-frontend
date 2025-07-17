import axios from 'axios';
import { useAltStore } from '@/lib/zustand/userStore';
// const { refreshToken, organization } = useAltStore.getState()

// Create Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

// if(refreshToken){
//   const isProduction = process.env.NODE_ENV === 'production';
//   const secureFlag = isProduction ? '; secure' : '';
//   document.cookie = `${organization?.name}-refreshToken=${refreshToken}; path=/${secureFlag}; SameSite=Strict`;
// }

// Request interceptor: Attach token and organization
api.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined') {
      const { organization } = useAltStore.getState();
      const orgKey = `${(organization?.name || '').replace(/\s+/g, '_')}-accessToken`;
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${orgKey}=`))
        ?.split('=')[1];

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      // Inject organization info
      if (organization?.id && config.data) {
        if (config.data instanceof FormData) {
          // Append to FormData safely
          config.data.append('organization', organization.id);
          // Let the browser set the correct Content-Type with boundary
        } else if (typeof config.data === 'object') {
          config.headers['Content-Type'] = 'application/json';
          config.data = {
            ...config.data,
            organization: organization.id,
          };
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle token refresh
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
          const orgKey = `${(organization?.name || '').replace(/\s+/g, '_')}`;
          const accessTokenKey = `${orgKey}-accessToken`;
          // const refreshTokenKey = `${orgKey}-refreshToken`;
          const { refreshToken } = useAltStore.getState();
          console.log({ refreshToken });

          // const refreshToken = document.cookie
          //   .split('; ')
          //   .find((row) => row.startsWith(`${refreshTokenKey}=`))
          //   ?.split('=')[1];

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/token`,
            { refreshToken },
            { withCredentials: true }
          );

          const newAccessToken = res.data.doc.token;
          document.cookie = `${accessTokenKey}=${newAccessToken}; path=/; secure; HttpOnly`;

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // For FormData: Do NOT override Content-Type
          if (originalRequest.data instanceof FormData) {
            delete originalRequest.headers['Content-Type'];
          } else {
            originalRequest.headers['Content-Type'] = 'application/json';
          }

          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        if (typeof window !== 'undefined') {
          const { organization } = useAltStore.getState();
          const orgKey = `${(organization?.name || '').replace(/\s+/g, '_')}`;
          document.cookie = `${orgKey}-accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
