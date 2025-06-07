import api from "@/core/services/api";
import useSWR from "swr";
import { useAltStore } from "@/lib/zustand/userStore";
import { useState } from "react";
import { IOrganization } from "@/types/organization.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PreferenceFormData, preferenceSchema, SettingsFormData, settingsSchema } from "../schema";
import useInitialDataFetch from "@/hooks/organization/initialOrgainzation";

export const useCustomizationService = () => {
    const organization = useAltStore(state => state.organization);
    const setOrganization = useAltStore(state => state.setOrganization);
    const [ settings, setSettings ] = useState<IOrganization | null>(null);
    const [ preference, setPreference ] = useState<IOrganization | null>(null);
    const [ preferenceLoading, setPreferenceLoading ] = useState<boolean>(false)
    const [ serverError, setServerError ] = useState<string | null>(null)

    const preferenceForm = useForm<PreferenceFormData>({
        resolver: zodResolver(preferenceSchema)
    })

    const updatePreference = async (data: FormData) => {
        setServerError("");
        setPreferenceLoading(false);
        try{
            const res = await api.patch(`/organization/${organization?.id}`, data)
            if(res.status === 200){
                setOrganization(res.data.doc)
                toast.success(res.data.message)
            }
        } catch(error: any){
            const errorMessage = error.response?.data?.message || error.message || "Could not create exam";
            setServerError(errorMessage);
            toast.error(errorMessage);
        }
    }

    const settingsForm = useForm<SettingsFormData>({
        resolver: zodResolver(settingsSchema)
    });

    const updateSettings = async (data: SettingsFormData) => {
        setServerError("")
        try{
             const res = await api.patch(`/organization/${organization?.id}`, data)
            if(res.status === 200){
                setOrganization(res.data.doc)
                toast.success(res.data.message)
            }
        } catch(error: any){
            const errorMessage = error.response?.data?.message || error.message || "Could not create exam";
            setServerError(errorMessage);
            toast.error(errorMessage);
        }
    } 

    return {
        preference,
        preferenceLoading,
        preferenceForm,
        updatePreference,
        updateSettings,
        settingsForm
    }

}