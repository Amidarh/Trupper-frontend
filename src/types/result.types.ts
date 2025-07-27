import { ExamType } from './exam.types';
import { ExamCardType } from './examCards.types';
import { examModeType } from './examMode.types';
import { IUser } from './user.types';

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
  user: IUser;
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

export interface SingleExamModeResultStatsType {
  totalStudents: number;
  averageSchool: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
}

export interface ExamModeResultMainDataType {
  doc: ExamModeResultType[];
}

export interface ExamModeResultType {
  id: string;
  _id: string;
  exam: ExamType;
  startedAt: Date;
  finishedAt: Date;
  resultList: ResultType[];
  stats: SingleExamModeResultStatsType;
}
