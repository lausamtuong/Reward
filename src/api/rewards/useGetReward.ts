import { useQuery, UseQueryOptions } from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import { Reward, RewardListingPromoType, RewardListingSortBy, RewardListingType } from './types';
import type { DefaultOpsTechResponse, DefaultPagingParams } from '../types';

export type GetRewardParams = Partial<
  DefaultPagingParams & {
    category_id: number;
    type: RewardListingType;
    sort: RewardListingSortBy;
    session_id: number;
    is_redeemable: boolean;
    promo_type: RewardListingPromoType;
    in_stock: boolean;
    filter_flashsale_time: number;
  }
>;

export const getRewardFn = async (params: GetRewardParams) => {
  const response = await httpClient.get<DefaultOpsTechResponse<Reward[]>>(apiRoutes.rewards.reward, {
    params,
  });
  return response.data.data;
};

export const useGetReward = (params: GetRewardParams, opts?: UseQueryOptions<Reward[], DefaultQueryError>) =>
  useQuery<Reward[], DefaultQueryError>([apiRoutes.rewards.reward, params], () => getRewardFn(params), opts);
