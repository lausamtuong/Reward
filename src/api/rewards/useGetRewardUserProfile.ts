import { useQuery, UseQueryOptions } from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import type { DefaultOpsTechResponse } from '../types';

export type RewardUserProfile = {
  id: number;
  user_id: string;
  score: number;
  rank: number;
  caption: string;
  updated: Date;
  previous_rank: number;
  use_point: number;
  previous_use_point: null;
  previous_score: null;
  point: number;
  reset_point: Date;
  backup_score: null;
  available_point: null;
};

export const getRewardUserProfileFn = async () => {
  const response = await httpClient.get<DefaultOpsTechResponse<RewardUserProfile>>(apiRoutes.rewards.userProfile);
  return response.data.data;
};

export const useGetRewardUserProfile = (opts?: UseQueryOptions<RewardUserProfile, DefaultQueryError>) =>
  useQuery<RewardUserProfile, DefaultQueryError>([apiRoutes.rewards.userProfile], () => getRewardUserProfileFn(), opts);
