export type LocaleContent = Record<'vi' | 'en', string>;

export type DefaultPagingParams = {
  offset: number;
  limit: number;
};

export interface Paging {
  total_count: number;
  limit: number;
  page: number;
}

export interface DefaultOpsTechResponse<T> {
  status: number;
  message: string;
  code: number;
  data: T;
  paging: Paging;
}

export type ApiError = {
  code: string;
  http_code: number;
  title: string;
  description: string;
  internal: string;
};
