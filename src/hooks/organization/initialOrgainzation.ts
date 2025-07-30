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
  const refreshToken = useAltStore((state) => state.refreshToken);
  const router = useRouter();
  // Helper to check if a cookie exists
  const cookieExists = (name: string) => {
    if (typeof document === 'undefined') return false;
    return document.cookie
      .split('; ')
      .some((row) => row.startsWith(`${name}=`));
  };

  // Set cookies if missing
  const ensureCookies = () => {
    if (typeof window === 'undefined' || !organization) return;

    const orgName = (organization?.name || 'default').replace(/\s+/g, '_');
    const orgId = organization?.id || 'default';

    // Check and set refreshToken cookie
    const refreshTokenCookie = `${orgName}-refreshToken`;
    if (!cookieExists(refreshTokenCookie) && refreshToken) {
      const isProduction = process.env.NODE_ENV === 'production';
      const secureFlag = isProduction ? '; secure' : '';
      document.cookie = `${refreshTokenCookie}=${refreshToken}; path=/${secureFlag}; SameSite=Strict`;
    }

    // Check and set role cookie
    if (user?.role) {
      const roleCookie = 'role';
      if (!cookieExists(roleCookie)) {
        const isProduction = process.env.NODE_ENV === 'production';
        const secureFlag = isProduction ? '; secure' : '';
        document.cookie = `role=${user.role.toUpperCase()}; path=/${secureFlag}; SameSite=Strict`;
      }
    }

    // Check and set organizationId cookie
    const orgIdCookie = 'organizationId';
    if (!cookieExists(orgIdCookie)) {
      const isProduction = process.env.NODE_ENV === 'production';
      const secureFlag = isProduction ? '; secure' : '';
      document.cookie = `organizationId=${orgId}; path=/${secureFlag}; SameSite=Strict`;
    }
  };

  // Always use the refreshToken from the store if it's valid (not null/undefined/empty), get a new accessToken and store it in cookies
  const getNewAccessTokenIfRefreshTokenExists = async () => {
    if (typeof window === 'undefined' || !organization) return;
    const orgName = (organization?.name || 'default').replace(/\s+/g, '_');
    const accessTokenKey = `${orgName}-accessToken`;

    // Use refreshToken from store if it's valid (not null/undefined/empty string)
    if (refreshToken) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/admin-token`,
          { refreshToken }
        );
        console.log('test refreshToken');
        console.log(res.data);
        const newAccessToken = res.data.doc.token;
        const isProduction = process.env.NODE_ENV === 'production';
        const secureFlag = isProduction ? '; secure' : '';
        document.cookie = `${accessTokenKey}=${newAccessToken}; path=/;${secureFlag} SameSite=Strict`;
      } catch (err) {
        console.log({ err });
        // Optionally handle error (e.g., clear cookies, redirect, etc.)
        // console.error('Failed to refresh access token:', err);
      }
    } else {
      router.push('/login');
    }
  };

  const fetchOrganizationData = async () => {
    if (!organization) {
      try {
        const domain =
          typeof window !== 'undefined'
            ? window.location.host
            : 'localhost:3000';
        const response = await api.get(`/organization/by_domain/${domain}`);
        setOrganization(response.data.doc);
      } catch (error) {
        console.error('Failed to fetch organization data:', error);
      }
    }
  };

  useEffect(() => {
    if (organization) {
      ensureCookies();
      getNewAccessTokenIfRefreshTokenExists();
      console.log('test organization');
    }
  }, [organization]);

  useEffect(() => {
    fetchOrganizationData();
  }, []);
};

export default useInitialDataFetch;
