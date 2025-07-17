import { SubjectType } from './subject.types';
import { ExamType } from './exam.types';

export interface Option {
  a: string;
  b: string;
  c: string;
  d: string;
  e?: string;
}

export interface QuestionType {
  question: string;
  options: Option;
  subject: SubjectType; // ObjectId as string
  section: string;
  image: string;
  answer: string;
  userAnswer?: string;
  examtype: string; // ObjectId as string
  solution: string;
  examyear: number;
  questionNub: number;
  hasPassage: boolean;
  category: string;
  organization: string; // ObjectId as string
  reason: string;
  questionCategory: 'main' | 'public';
  questionType: 'Objective' | 'Theory' | 'Sub-objective';
  queryId: string;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  exam: ExamType;
  id: string;
}

export interface GenerateQuestionType {
  examtype: string;
  subject: string;
  questionType: string;
  noOfQuestions: number;
  type: 'ai' | 'manual';
  file: File;
}

export interface QuestionMainDataTypes {
  questions: QuestionType[];
  page: number;
  limit: number;
  totalPages: number;
  totalOfOrganization: number;
  totalAIOrganization: number;
}

export interface QuestionDataType {
  doc: QuestionMainDataTypes;
}
