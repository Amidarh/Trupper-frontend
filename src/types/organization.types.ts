export interface IOrganization {
  id:string;
  name: string;
  email: string;
  logo?: string;
  subscription?: 'free' | string;
  subscriptionId?: string // references Pricing
  status?: 'active' | 'blocked' | 'suspended';
  enableSignup?: boolean;
  codeSignUp?: boolean;
  defaultCategory?: string;
  defaultSubCategory?: string;
  domain?: string;
  admin?: string;
  defaultPassword?: string;
  createdAt?: Date;
  updatedAt?: Date;
};