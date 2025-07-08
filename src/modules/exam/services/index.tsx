/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/core/services/api';
import { useState } from 'react';
import { useAltStore } from '@/lib/zustand/userStore';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useExamService() {
  const examState = useAltStore((state) => state.examState);
  const examDuration = useAltStore((state) => state.examDuration);
  const setExamDuration = useAltStore((state) => state.setExamDuration);
  const setExamState = useAltStore((state) => state.setExamState);
  const setCurrentQuestion = useAltStore((state) => state.setCurrentQuestion);
  const [serverError, setServerError] = useState('');
  const [endExamLoading, setEndExamLoading] = useState(false);
  const router = useRouter();

  let examPercentage = 0;
  let totalQuestions: number = 0;
  let failedQuestions = 0;
  let passedQuestions = 0;
  let skippedQuestions = 0;
  let attemptedQuestion = 0;
  totalQuestions = examState?.questions.length ?? 0;
  const getPassedQuestions = examState?.questions.filter(
    (el) => el.userAnswer === el.answer
  );
  const getSkippedQuestions = examState?.questions.filter(
    (el) => el.userAnswer === ''
  );
  skippedQuestions = getSkippedQuestions?.length ?? 0;
  attemptedQuestion = (examState?.questions?.length ?? 0) - skippedQuestions;
  passedQuestions = getPassedQuestions?.length ?? 0;
  failedQuestions =
    (examState?.questions.length ?? 0) - (getPassedQuestions?.length ?? 0);
  examPercentage = Math.floor(
    ((getPassedQuestions?.length ?? 0) / (examState?.questions.length ?? 0)) *
      100
  );

  const endExam = async (type: 'submit' | 'exit') => {
    try {
      console.log('test');
      setEndExamLoading(true);
      const res = await api.post(`/exams/end-exam/${examState?.resultId}`, {
        score: examPercentage,
        failed: failedQuestions,
        passed: passedQuestions,
        skipped: skippedQuestions,
        attempted: attemptedQuestion,
        totalQuestions,
        timeLeft: examDuration,
      });
      if (res.status === 200) {
        toast.success(res?.data.message);
        if (type === 'submit') {
          router.push('/exam/result');
        } else {
          setExamDuration(0);
          setCurrentQuestion(null);
          setExamState(null);
          router.push('/');
        }
      }
      setEndExamLoading(false);
    } catch (err: any) {
      setEndExamLoading(false);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to sent password reset link';
      setServerError(errorMessage);
    }
  };

  const clearExamSettings = async () => {
    setExamDuration(0);
    setCurrentQuestion(null);
    setExamState(null);
    router.push('/');
  };

  return {
    totalQuestions,
    skippedQuestions,
    failedQuestions,
    passedQuestions,
    attemptedQuestion,
    examPercentage,
    serverError,
    endExam,
    endExamLoading,
    clearExamSettings,
  };
}
