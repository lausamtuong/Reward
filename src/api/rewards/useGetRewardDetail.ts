import { useQuery, UseQueryOptions } from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import { Reward } from './types';
import type { DefaultOpsTechResponse } from '../types';

export const getRewardDetailFn = async (id: number) => {
  const response = await httpClient.get<DefaultOpsTechResponse<Reward>>(apiRoutes.rewards.rewardDetail(id));
  return response.data.data;
};

export const useGetRewardDetail = (id: number, opts?: UseQueryOptions<Reward, DefaultQueryError>) =>
  useQuery<Reward, DefaultQueryError>([apiRoutes.rewards.rewardDetail(id)], () => getRewardDetailFn(id), opts);
