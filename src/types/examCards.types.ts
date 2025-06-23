import { ExamType } from './exam.types';
import { SubjectType } from './subject.types';
import { CategoryTypes } from './categories.types';
import { IUser } from './user.types';

export interface ExamCardType {
  id: string;
  exam: ExamType;
  subjects: SubjectType[];
  category: CategoryTypes;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  status: 'active' | 'inactive';
}

export interface ExamCardDataType {
  doc: ExamCardType[];
}
