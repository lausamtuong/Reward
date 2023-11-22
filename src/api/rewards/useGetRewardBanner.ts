import { useQuery, UseQueryOptions } from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import type { DefaultOpsTechResponse, DefaultPagingParams } from '../types';

export interface RewardBanner {
  id: number;
  img_url: string;
  url: string;
  index: number;
  title: string;
  is_active: boolean;
  is_delete: boolean;
  created: Date;
  updated: Date;
}

export const getRewardBannerFn = async (params: Partial<DefaultPagingParams>) => {
  const response = await httpClient.get<DefaultOpsTechResponse<RewardBanner[]>>(apiRoutes.rewards.banner, {
    params,
  });
  return (response.data && response.data.data && response.data.data.filter((item) => item.is_active)) || [];
};

export const useGetRewardBanner = (
  params: Partial<DefaultPagingParams>,
  opts?: UseQueryOptions<RewardBanner[], DefaultQueryError>,
) =>
  useQuery<RewardBanner[], DefaultQueryError>(
    [apiRoutes.rewards.banner, params],
    () => getRewardBannerFn(params),
    opts,
  );
