'use client';

import { useEffect } from 'react';
import api from '@/core/services/api';
import { useAltStore } from '@/lib/zustand/userStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const useInitialDataFetch = () => {
  const organization = useAltStore((state) => state.organization);
  const setOrganization = useAltStore((state) => state.setOrganization);
  const user = useAltStore((state) => state.user);
  const setUser = useAltStore((state) => state.setUser);
  const refreshToken = useAltStore((state) => state.refreshToken);
  const setIsAuthenticated = useAltStore((state) => state.setIsAuthenticated);
  const router = useRouter();

  const cookieExists = (name: string) => {
    if (typeof document === 'undefined') return false;
    return document.cookie.split('; ').some((row) => row.startsWith(`${name}=`));
  };

  const ensureCookies = () => {
    if (typeof window === 'undefined' || !organization) return;

    const orgName = (organization?.name || 'default').replace(/\s+/g, '_');
    const orgId = organization?.id || 'default';
    const isProduction = process.env.NODE_ENV === 'production';
    const secureFlag = isProduction ? '; secure' : '';

    if (refreshToken && !cookieExists(`${orgName}-refreshToken`)) {
      document.cookie = `${orgName}-refreshToken=${refreshToken}; path=/;${secureFlag} SameSite=Strict`;
    }

    if (user?.role && !cookieExists('role')) {
      document.cookie = `role=${user.role.toUpperCase()}; path=/;${secureFlag} SameSite=Strict`;
    }

    if (!cookieExists('organizationId')) {
      document.cookie = `organizationId=${orgId}; path=/;${secureFlag} SameSite=Strict`;
    }
  };

  const getNewAccessTokenIfRefreshTokenExists = async () => {
    if (typeof window === 'undefined' || !organization || !refreshToken) {
      router.push('/login');
      return;
    }

    const orgName = (organization.name || 'default').replace(/\s+/g, '_');
    const accessTokenKey = `${orgName}-accessToken`;
    const isProduction = process.env.NODE_ENV === 'production';
    const secureFlag = isProduction ? '; secure' : '';

    try {
      const apiRoute = user?.role === 'USER' ? 'auth/token' : 'auth/admin-token';

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/${apiRoute}`,
        { refreshToken }
      );

      if (res.status === 200) {
        const user = res.data.doc.user;
        const newAccessToken = res.data.doc.token;

        document.cookie = `${accessTokenKey}=${newAccessToken}; path=/;${secureFlag} SameSite=Strict`;
        document.cookie = `role=${user.role?.toUpperCase()}; path=/;${secureFlag} SameSite=Strict`;

        setUser(user);
        setIsAuthenticated(true);

        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Access token refresh failed:', err);
      setIsAuthenticated(false);
      router.push('/login');
    }
  };

  const fetchOrganizationData = async () => {
    if (!organization) {
      try {
        const domain =
          typeof window !== 'undefined' ? window.location.host : 'localhost:3000';

        const response = await api.get(`/organization/by_domain/${domain}`);
        setOrganization(response.data.doc);
      } catch (error) {
        console.error('Failed to fetch organization data:', error);
      }
    }
  };

  useEffect(() => {
    fetchOrganizationData();
  }, []);

  useEffect(() => {
    if (organization) {
      ensureCookies();
      getNewAccessTokenIfRefreshTokenExists();
    }
  }, [organization]);
};

export default useInitialDataFetch;
