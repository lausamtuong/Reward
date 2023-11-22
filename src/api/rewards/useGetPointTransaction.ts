import { useInfiniteQuery, UseInfiniteQueryOptions, useQuery, UseQueryOptions } from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import type { DefaultOpsTechResponse, DefaultPagingParams, LocaleContent } from '../types';
import { PAGE_INDEX } from '@/lib/constants';

export type PointTransaction = {
  id: number;
  create_time: Date;
  policy_id: string;
  title: LocaleContent;
  user_id: string;
  point: number;
};

const PAGE_SIZE = 10;
export type GetPointTransactionParams = Partial<DefaultPagingParams>;

export const getPointTransactionFn = async ({
  pageParam: offset = PAGE_INDEX,
  limit = PAGE_SIZE,
}: GetPointTransactionParams & { pageParam?: number }) => {
  const response = await httpClient.get<DefaultOpsTechResponse<PointTransaction[]>>(
    apiRoutes.rewards.pointTransaction,
    {
      params: { offset, limit },
    },
  );
  return response.data.data;
};
export const useGetPointTransaction = (
  params: GetPointTransactionParams,
  opts?: UseInfiniteQueryOptions<PointTransaction[], DefaultQueryError>,
) =>
  useInfiniteQuery<PointTransaction[], DefaultQueryError>(
    [apiRoutes.rewards.pointTransaction, params],
    ({ pageParam = PAGE_INDEX }) => getPointTransactionFn({ ...params, pageParam }),
    {
      ...opts,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < (params.limit || PAGE_SIZE)) {
          return undefined;
        }
        return allPages.length;
      },
    },
  );
