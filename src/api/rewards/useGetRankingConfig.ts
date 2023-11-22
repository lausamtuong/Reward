import { useQuery, UseQueryOptions } from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import type { DefaultOpsTechResponse, DefaultPagingParams } from '../types';

export type RankingConfig = {
  id: number;
  status: number;
  created_time: null;
  updated_time: null;
  name: string;
  description: null;
  value: number;
  min_value: number;
  max_value: number;
  icon: null;
};

export type GetRankingConfigParams = Partial<DefaultPagingParams>;

export const getRankingConfigFn = async (params: GetRankingConfigParams) => {
  const response = await httpClient.get<DefaultOpsTechResponse<RankingConfig[]>>(apiRoutes.rewards.rankingConfig, {
    params,
  });
  return response.data.data;
};

export const useGetRankingConfig = (
  params: GetRankingConfigParams,
  opts?: UseQueryOptions<RankingConfig[], DefaultQueryError>,
) =>
  useQuery<RankingConfig[], DefaultQueryError>(
    [apiRoutes.rewards.rankingConfig, params],
    () => getRankingConfigFn(params),
    opts,
  );
