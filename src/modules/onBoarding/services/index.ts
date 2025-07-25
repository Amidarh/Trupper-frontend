import api from '@/core/services/api';
import { useAltStore } from '@/lib/zustand/userStore';
import { useState } from 'react';
import {
  OrganizationSetupFormData,
  organizationSetupSchema,
  accountFormData,
  accountSchema,
  OrganizationDetailsSchema,
  OrganizationDetailsFormData,
} from '../schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { OnboardingPersonnelType } from '@/types';

export const useOnboardingService = () => {
  const organization = useAltStore((state) => state.organization);
  const setOnBoardingEmail = useAltStore((state) => state.setOnBoardingEmail);
  const setOnboardingPersonnel = useAltStore(
    (state) => state.setOnboardingPersonnel
  );
  const setOnboardingOrganization = useAltStore(
    (state) => state.setOnboardingOrganization
  );
  const setOrganization = useAltStore((state) => state.setOrganization);
  const setUser = useAltStore((state) => state.setUser);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const organizationForm = useForm<OrganizationSetupFormData>({
    resolver: zodResolver(organizationSetupSchema),
  });

  const accountSetupForm = useForm<accountFormData>({
    resolver: zodResolver(accountSchema),
  });

  const organizationDetailsForm = useForm<OrganizationDetailsFormData>({
    resolver: zodResolver(OrganizationDetailsSchema),
  });

  const setupOrganization = async (data: FormData) => {
    try {
      const res = await api.patch(`/organization/${organization?.id}`, data);
      if (res.status === 200) {
        const updatedOrganization = res.data.doc;
        console.log({ updatedOrganization });
        setOrganization(updatedOrganization);
        toast.success(res.data.message);
        router.push(`/dashboard`);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not complete organization setup';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const setupAccount = async (data: accountFormData) => {
    try {
      const res = await api.post('/auth/create-admin', data);
      if (res.status === 201) {
        const { user, token, refreshToken } = res.data.doc;
        const isProduction = process.env.NODE_ENV === 'production';
        const secureFlag = isProduction ? '; secure' : '';
        const orgName = (organization?.name || 'default').replace(/\s+/g, '_');
        setOnBoardingEmail(false);
        setOnboardingPersonnel({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        });

        // Set cookies client-side
        document.cookie = `${orgName}-accessToken=${token}; path=/${secureFlag}; SameSite=Strict`;
        document.cookie = `${orgName}-refreshToken=${refreshToken}; path=/${secureFlag}; SameSite=Strict`;
        document.cookie = `role=${user.role.toUpperCase()}; path=/${secureFlag}; SameSite=Strict`;
        document.cookie = `organizationId=${organization?.id || 'default'}; path=/${secureFlag}; SameSite=Strict`;

        // Debug cookies
        console.log('Cookies after setting:', document.cookie);

        // Update Zustand store
        setUser(user);

        router.push(`/onboarding/details`);
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        setOnBoardingEmail(true);
      }
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Account setup failed try again';
      setServerError(errorMessage);
    }
  };

  const organizationDetails = async (data: OrganizationDetailsFormData) => {
    try {
      const res = await api.patch(`/organization/${organization?.id}`, data);
      if (res.status === 200) {
        const updatedOrganization = res.data.doc;
        console.log({ updatedOrganization });
        setOrganization(updatedOrganization);
        toast.success(res.data.message);
        setOnboardingOrganization({
          description: data.description,
          userRange: data.usersRange,
          staffsRange: data.staffRange,
          mobile: data.phone,
          country: data.country,
        });
        router.push('/onboarding/org');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Could not complete organization setup';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return {
    setupOrganization,
    organizationForm,
    serverError,
    accountSetupForm,
    setupAccount,
    organizationDetails,
    organizationDetailsForm,
  };
};
