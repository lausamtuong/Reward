import { useMutation, UseMutationOptions } from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import { MyReward } from './types';
import { DefaultOpsTechResponse } from '../types';

export const redeemRewardFn = async (id: number) => {
  const response = await httpClient.post<DefaultOpsTechResponse<MyReward>>(apiRoutes.rewards.rewardDetail(id));
  return response.data;
};

export const useRedeemReward = (
  opts?: UseMutationOptions<DefaultOpsTechResponse<MyReward>, DefaultQueryError, number>,
) => useMutation<DefaultOpsTechResponse<MyReward>, DefaultQueryError, number>(redeemRewardFn, opts);
