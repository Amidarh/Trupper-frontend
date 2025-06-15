import { ExamType } from './exam.types';

export interface SubjectType {
  name: string;
  exam: ExamType;
  id: string;
  status?: boolean;
  createdAt: Date;
}

export interface SubjectDataType {
  doc: SubjectType[];
}
