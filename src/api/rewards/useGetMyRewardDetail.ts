import { useQuery, UseQueryOptions } from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import { MyReward } from './types';
import { GetRewardParams } from './useGetReward';
import type { DefaultOpsTechResponse } from '../types';

export type GetMyRewardDetailParams = Pick<GetRewardParams, 'category_id' | 'type'> & { id: number };

export const getMyRewardDetailFn = async ({ id, ...params }: GetMyRewardDetailParams) => {
  const response = await httpClient.get<DefaultOpsTechResponse<MyReward>>(apiRoutes.rewards.myRewardDetail(id), {
    params,
  });
  return response.data.data;
};

export const useGetMyRewardDetail = (
  { id, ...params }: GetMyRewardDetailParams,
  opts?: UseQueryOptions<MyReward, DefaultQueryError>,
) =>
  useQuery<MyReward, DefaultQueryError>(
    [apiRoutes.rewards.myRewardDetail(id), params],
    () => getMyRewardDetailFn({ id, ...params }),
    opts,
  );
