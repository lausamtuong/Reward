import { useQuery, UseQueryOptions } from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import { MyReward } from './types';
import { GetRewardParams } from './useGetReward';
import type { DefaultOpsTechResponse } from '../types';

export type GetMyRewardParams = Pick<GetRewardParams, 'category_id' | 'type'> & { is_used?: boolean };

export const getMyRewardFn = async (params: GetMyRewardParams) => {
  const response = await httpClient.get<DefaultOpsTechResponse<MyReward[]>>(apiRoutes.rewards.myReward, {
    params,
  });
  return response.data.data;
};

export const useGetMyReward = (params: GetMyRewardParams, opts?: UseQueryOptions<MyReward[], DefaultQueryError>) =>
  useQuery<MyReward[], DefaultQueryError>([apiRoutes.rewards.myReward, params], () => getMyRewardFn(params), opts);
