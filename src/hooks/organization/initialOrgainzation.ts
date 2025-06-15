'use client';

import { useEffect } from 'react';
import api from '@/core/services/api';
import { useAltStore } from '@/lib/zustand/userStore';

const useInitialDataFetch = () => {
  const organization = useAltStore((state) => state.organization);
  const setOrganization = useAltStore((state) => state.setOrganization);

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
  }, [organization, setOrganization]);
};

export default useInitialDataFetch;
