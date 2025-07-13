/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRole } from '../core/constants/sidebar';
import { CategoryTypes } from './categories.types';
import { SubCategoryTypes } from './categories.types';
import { QuestionType } from './question.types';
import { IOrganization } from './organization.types';

export interface IUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  subscription?: 'free' | 'subscribed' | 'un-subscribed';
  subscriptionDuration?: number;
  subscriptionExpires?: Date;
  subscriptionId?: string;
  organization?: string;
  mobile?: string;
  school?: string;
  isBlocked?: boolean;
  role: 'user' | 'admin' | 'sub-admin' | UserRole | null | undefined;
  twoFactor?: boolean;
  twoFactorVerificationCode?: number;
  queryId?: string;
  massLogin?: boolean;
  noOfLoggedInDevices?: number;
  isVerified?: boolean;
  category?: CategoryTypes;
  subCategory?: SubCategoryTypes;
  verificationCode?: number;
  lastLogin?: Date;
  photo?: string;
  passwordResetTokenExpires?: Date;
  passwordResetToken?: string;
  verificationToken?: string;
  cbtTrials?: number;
  theme?: 'light' | 'dark' | 'system';
  signUpMode?: 'normal' | 'google';
  loginTokens?: string[];
  loginDetails?: any[];
  cbt?: string;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface examStateType {
  duration: number;
  questions: QuestionType[];
  subject: string;
  resultId: string;
}

export interface AltStore {
  user: IUser | null | undefined;
  organization: IOrganization | null;
  organizationId: string | null;
  isExamOn: boolean;
  setIsExamOn: (data: boolean) => void;
  setUser: (user: IUser) => void;
  clearUser: () => void;
  setOrganization: (organization: IOrganization) => void;
  setOrganizationId: (id: string) => void;
  isAuthenticated: boolean;
  logout: () => void;
  examDuration: number;
  setExamDuration: (examDuration: number) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  examState: examStateType | null;
  setExamState: (data: examStateType | null) => void;
  currentQuestion: number | null;
  setCurrentQuestion: (currentQuestion: number | null) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
}
