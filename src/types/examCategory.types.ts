import { ExamType } from './exam.types';
import { SubjectType } from './subject.types';
import { ExamTypes } from './examTypes.types';

export interface ExamCategoryType {
  name: string;
  id: string;
  createAt: Date;
  exam: ExamType;
  subjects: SubjectType[];
  status: boolean;
  examType: ExamTypes;
}
