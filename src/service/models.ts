export interface Account {
  accountId: number;
  email: string;
  authToken: string;
  creationDate: string;
}

export interface Profile {
  profileId: number;
  country: string;
  marketplace: string;
  accountId: number;
}

export interface Campaign {
  campaignId: number;
  clicks: number;
  cost: number;
  date: string;
  profileId: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export interface Response<T> {
  data: T;
  pagination: PaginationProps;
}