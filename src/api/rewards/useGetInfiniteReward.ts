import { useInfiniteQuery, UseInfiniteQueryOptions } from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import apiRoutes from '@/lib/apiRoutes';
import { PAGE_INDEX, PAGE_SIZE } from '@/lib/constants';
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
  }
>;
export const getRewardFn = async ({
  pageParam: offset = PAGE_INDEX,
  limit = PAGE_SIZE,
  type = RewardListingType.ALL,
  ...params
}: GetRewardParams & { pageParam?: number }) => {
  const response = await httpClient.get<DefaultOpsTechResponse<Reward[]>>(apiRoutes.rewards.reward, {
    params: {
      ...params,
      offset,
      limit,
      type,
    },
  });
  return response.data.data;
};

export const useGetInfiniteReward = (
  params: GetRewardParams,
  opts?: UseInfiniteQueryOptions<Reward[], DefaultQueryError>,
) =>
  useInfiniteQuery<Reward[], DefaultQueryError>(
    [apiRoutes.rewards.reward, params],
    ({ pageParam = PAGE_INDEX }) => getRewardFn({ ...params, pageParam }),
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
