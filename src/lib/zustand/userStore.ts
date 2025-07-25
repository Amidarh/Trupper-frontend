import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  IUser,
  AltStore,
  IOrganization,
  examStateType,
  OnboardingPersonnelType,
  OnboardingOrganizationType,
} from '@/types';

export const useAltStore = create<AltStore>()(
  persist(
    (set) => ({
      user: null,
      organization: null,
      organizationId: null,
      examState: null,
      refreshToken: null,
      isExamOn: false,
      examDuration: 0,
      setIsExamOn: (isExamOn: boolean) => set({ isExamOn }),
      setUser: (user: IUser) => set({ user }),
      clearUser: () => set({ user: null }),
      setOrganization: (organization: IOrganization) => set({ organization }),
      setOrganizationId: (organizationId: string) => set({ organizationId }),
      setRefreshToken: (refreshToken: string) => set({ refreshToken }),
      logout: () => set({ user: null }),
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      setExamState: (examState: examStateType | null) => set({ examState }),
      currentQuestion: null,
      setCurrentQuestion: (currentQuestion: number | null) =>
        set({ currentQuestion }),
      nextQuestion: () =>
        set((state) => ({
          currentQuestion:
            state.currentQuestion !== null ? state.currentQuestion + 1 : 0,
        })),
      previousQuestion: () =>
        set((state) => ({
          currentQuestion:
            state.currentQuestion !== null ? state.currentQuestion - 1 : 0,
        })),
      setExamDuration: (examDuration: number) => set({ examDuration }),
      onBoardingEmail: false,
      setOnBoardingEmail: (onBoardingEmail: boolean) =>
        set({ onBoardingEmail }),
      onboardingPersonnel: null,
      setOnboardingPersonnel: (onboardingPersonnel: OnboardingPersonnelType) =>
        set({ onboardingPersonnel }),
      onboardingOrganization: null,
      setOnboardingOrganization: (
        onboardingOrganization: OnboardingOrganizationType
      ) => set({ onboardingOrganization }),
    }),
    {
      name: 'Alt-store',
    }
  )
);
