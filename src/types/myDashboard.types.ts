import { ResultType } from './result.types';

export interface MyDashboardStatsType {
  totalExams: number;
  totalQuestions: number;
  totalPassedQuestions: number;
  totalAttemptedQuestions: number;
  totalSkippedQuestions: number;
  totalFailedQuestions: number;
  averageScore: number;
}

export interface MyDashboardType {
  stats: MyDashboardStatsType;
  results: ResultType[];
}

export interface MyDashboardDataType {
  doc: MyDashboardType;
}
