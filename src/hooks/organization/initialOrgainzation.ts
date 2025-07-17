'use client';

import { useEffect } from 'react';
import api from '@/core/services/api';
import { useAltStore } from '@/lib/zustand/userStore';

const useInitialDataFetch = () => {
  const organization = useAltStore((state) => state.organization);
  const setOrganization = useAltStore((state) => state.setOrganization);
  const user = useAltStore((state) => state.user);
  const refreshToken = useAltStore((state) => state.refreshToken);

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
    fetchOrganizationData();
    // After organization is set, ensure cookies
    if (organization) {
      ensureCookies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization, setOrganization, user, refreshToken]);
};

export default useInitialDataFetch;
