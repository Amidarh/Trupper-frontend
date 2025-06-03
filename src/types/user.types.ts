import { UserRole } from "../core/constants/sidebar";
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
  role: 'user' | 'admin' | 'sub-admin' | UserRole | null |  undefined;
  twoFactor?: boolean;
  twoFactorVerificationCode?: number;
  queryId?: string;
  massLogin?: boolean;
  noOfLoggedInDevices?: number;
  isVerified?: boolean;
  settings?: Object;
  category?: string;
  subCategory?: string;
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

export interface IOrganization {
  id: string;
  name: string;
  email: string;
  codeSignUp: boolean;
  enableSignup: boolean
}

export interface AltStore {
  user: IUser | null | undefined;
  organization: IOrganization | null;
  organizationId: string | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
  setOrganization: (organization: IOrganization) => void;
  setOrganizationId: (id: string) => void;
  isAuthenticated: boolean,
  logout: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}