import { useQuery, UseQueryOptions } from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import { RewardListingPromoType, RewardListingType } from './types';
import type { DefaultOpsTechResponse, DefaultPagingParams, LocaleContent } from '../types';

export interface RewardCategory {
  id: number;
  name: LocaleContent;
  description?: LocaleContent;
  is_active?: boolean;
  is_delete?: boolean;
  index?: number;
  icon: string;
}

export type RewardCategoryWithLink = RewardCategory & { link: string };

export const top3Categories: RewardCategoryWithLink[] = [
  {
    id: -3,
    name: {
      vi: 'Tất cả ưu đãi',
      en: 'All rewards',
    },
    icon: `/static/images/rewards/all-category.png`,
    link: `/rewards/search?type=${RewardListingType.ALL}`,
  },
  {
    id: -2,
    name: {
      vi: 'Flashsale',
      en: 'Flash Sale',
    },
    icon: `/static/images/rewards/flash-sale-category.png`,
    link: `/rewards/search?type=${RewardListingType.FLASHSALE_ONLY}`,
  },
  {
    id: -1,
    name: {
      vi: 'Ưu đãi Ahamove',
      en: 'Ahamove Coupon',
    },
    icon: `/static/images/rewards/ahamove-category.png`,
    link: `/rewards/search?promo_type=${RewardListingPromoType.AHAMOVE}`,
  },
];
export const getRewardCategoriesFn = async (params: Partial<DefaultPagingParams>) => {
  const response = await httpClient.get<DefaultOpsTechResponse<RewardCategory[]>>(apiRoutes.rewards.category, {
    params,
  });
  const listCate: RewardCategoryWithLink[] = response.data
    ? response.data.data.map((item: RewardCategory) => ({
        ...item,
        link: `/rewards/search?category_id=${item.id}`,
      }))
    : ([] as RewardCategoryWithLink[]);
  return listCate.length > 0 ? top3Categories.concat(listCate) : top3Categories;
};

export const useGetRewardCategories = (
  params: Partial<DefaultPagingParams>,
  opts?: UseQueryOptions<RewardCategoryWithLink[], DefaultQueryError>,
) =>
  useQuery<RewardCategoryWithLink[], DefaultQueryError>(
    [apiRoutes.rewards.category, params],
    () => getRewardCategoriesFn(params),
    opts,
  );
