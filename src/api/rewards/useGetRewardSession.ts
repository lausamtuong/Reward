import { useQuery, UseQueryOptions } from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import type { DefaultOpsTechResponse, DefaultPagingParams, LocaleContent } from '../types';

export interface RewardSession {
  id: number;
  status: number;
  created_time: Date;
  updated_time: Date;
  name: LocaleContent;
}

export const getRewardSessionFn = async (params: Partial<DefaultPagingParams>) => {
  const response = await httpClient.get<DefaultOpsTechResponse<RewardSession[]>>(apiRoutes.rewards.session, {
    params,
  });
  return response.data.data;
};

export const useGetRewardSession = (
  params: Partial<DefaultPagingParams>,
  opts?: UseQueryOptions<RewardSession[], DefaultQueryError>,
) => useQuery<RewardSession[], DefaultQueryError>([apiRoutes.rewards.session], () => getRewardSessionFn(params), opts);

export const getRewardSessionDetailFn = async (id: RewardSession['id']) => {
  const response = await httpClient.get<DefaultOpsTechResponse<RewardSession>>(apiRoutes.rewards.sessionDetail(id));
  return response.data.data;
};

export const useGetRewardSessionDetail = (
  id: RewardSession['id'],
  opts?: UseQueryOptions<RewardSession, DefaultQueryError>,
) =>
  useQuery<RewardSession, DefaultQueryError>(
    [apiRoutes.rewards.sessionDetail(id)],
    () => getRewardSessionDetailFn(id),
    opts,
  );
