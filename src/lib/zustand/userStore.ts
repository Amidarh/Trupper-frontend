import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  IUser,
  AltStore,
  IOrganization,
  examStateType,
} from '@/types/user.types';

export const useAltStore = create<AltStore>()(
  persist(
    (set) => ({
      user: null,
      organization: null,
      organizationId: null,
      examState: null,
      examDuration: 0,
      setUser: (user: IUser) => set({ user }),
      clearUser: () => set({ user: null }),
      setOrganization: (organization: IOrganization) => set({ organization }),
      setOrganizationId: (organizationId: string) => set({ organizationId }),
      logout: () => set({ user: null }),
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      setExamState: (examState: examStateType) => set({ examState }),
      currentQuestion: null,
      setCurrentQuestion: (currentQuestion: number) => set({ currentQuestion }),
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
    }),
    {
      name: 'Alt-store',
    }
  )
);
