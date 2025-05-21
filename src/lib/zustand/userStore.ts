import { create } from "zustand"
import { persist } from "zustand/middleware"
import { IUser, AltStore, IOrganization } from "@/types/user.types";

export const useAltStore = create<AltStore>()(
    persist(
        (set) => ({
            user: null,
            organization: null,
            organizationId: null,
            setUser: (user: IUser) => set({ user }),
            clearUser: () => set({  user: null }),
            setOrganization: (organization: IOrganization) => set({organization}),
            setOrganizationId: (organizationId: string) => set({ organizationId }) ,
            logout: (() => set({ user: null })),
            isAuthenticated: false,
            setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated })
        }),{
            name: "Alt-store"
        }
    )
)