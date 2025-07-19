import { MyDashboardStatsType, IUser, ResultType } from '@/types';

export interface usersDataTypes {
  users: IUser[];
  totalPages: number;
  total: number;
  page: number;
  limit: number;
}

export interface userMainData {
  user: IUser;
  stats: MyDashboardStatsType;
  results: ResultType[];
}

export interface usersData {
  doc: usersDataTypes;
}
