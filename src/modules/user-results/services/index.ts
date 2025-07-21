import api from "@/core/services/api";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { ExamModeResultMainDataType , ExamModeResultType} from "@/types";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useAltStore } from "@/lib/zustand/userStore";

export const useExamModeResultService = () => {
    const organization = useAltStore((state) => state.organization);
    const [examModeResult, setExamModeResult] = useState<ExamModeResultType | null>(null);
    const [ singleExamModeResultLoading, setSingleExamModeResultLoading ] = useState<boolean>(false);
    const [ serverError, setServerError ] = useState<string>("");

    const { id } = useParams() as { id?: string };

  const { data, error, isLoading, mutate } = useSWR<ExamModeResultMainDataType | undefined>(
    `/exam-mode-result/${organization?.id}`,
    fetcher
  );

  const getSingleExamModeResult = async () => {
    try {
      setSingleExamModeResultLoading(true);
      const response = await api(`/exam-mode-result/single/${id}`);
      setExamModeResult(response.data);
      console.log("response", response.data);
    } catch (error) {
      setServerError(error as string);
    } finally {
      setSingleExamModeResultLoading(false);
    }
  }

  return {
    examModeResult,
    singleExamModeResultLoading,
    serverError,
    data: data?.doc,
    error,
    isLoading,
    mutate,
    getSingleExamModeResult,
  }
};