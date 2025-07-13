import { ExamType } from './exam.types';
import { ExamCardType } from './examCards.types';
import { examModeType } from './examMode.types';

export interface ResultType {
  id: string;
  _id: string;
  exam: ExamType;
  createdAt: Date;
  score: number;
  subject: string;
  subscription: ExamCardType;
  passed: number;
  failed: number;
  skipped: number;
  attempted: number;
  totalQuestions: number;
  finished: boolean;
  examMode: examModeType;
}

export interface ResultMainDataType {
  data: ResultType[];
  totalExams: number;
  totalQuestions: number;
  totalPassed: number;
  totalFailed: number;
  totalSkipped: number;
  averageScore: number;
  totalAttempted: number;
}

export interface ResultDataTypes {
  doc: ResultMainDataType;
}
