import { IUser } from '@/types/user.types';

export interface usersDataTypes {
  users: IUser[];
  totalPages: number;
  total: number;
  page: number;
  limit: number;
}

export interface usersData {
  doc: usersDataTypes;
}
