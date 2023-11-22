import { OrderType } from '@/lib/constants';
import { LocaleContent } from '../types';

export enum RewardListingType {
  ALL = 1,
  VOUCHER_NOT_FLASHSALE = 2,
  FLASHSALE_ONLY = 3,
}

export enum FilterFlashsaleTime {
  ALL_FLASHSALE_TIME = 1,
  IN_FLASHSALE_TIME = 2,
}

export enum RewardListingPromoType {
  URBOX = 1,
  AHAMOVE = 2,
  MERCHANT = 3,
}

export enum RewardPolicyType {
  URBOX = 'URBOX',
  AHAMOVE = 'AHAMOVE',
  MERCHANT = 'VOUCHER',
}

export enum RewardListingSortBy {
  NEW = 1,
  // POPULAR = 2,
  POINT_DESC = 3,
  POINT_ASC = 4,
}

export enum RewardStatus {
  COMPLETED = 'COMPLETED',
  ENDED = 'ENDED',
}

export type Reward = {
  id: number;
  policy_id: string;
  title: LocaleContent;
  short_description?: LocaleContent;
  description: LocaleContent;
  type: string;
  image_url?: string;
  point: number;
  quantity: number;
  services?: string[];
  banner_image_url?: string;
  user_category_id: number;
  start_time: Date;
  end_time: Date;
  use_quantity: number;
  point_non_discount: number;
  is_flashsale: boolean;
  flashsale_start_time?: Date;
  flashsale_end_time?: Date;
  extra?: ExtraReward;
  order_type: OrderType;
  link_voucher?: string;
};

export type ExtraReward = {
  brand: string;
  brandImage: string;
  brand_id: string;
  brand_online: string;
  cat_id: string;
  code_display: string;
  code_display_type: number;
  content: string;
  expire_duration: string;
  gift_id: string;
  id: string;
  image: string;
  images: {
    '0': string;
    '80': string;
    '160': string;
    '320': string;
    '640': string;
    square: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images_rectangle: any[];
  justGetOrder: string;
  note: string;
  office: UrboxOffice[];
  parent_cat_id: string;
  point: string;
  price: string;
  quantity: string;
  title: string;
  type: string;
  usage_check: number;
  view: string;
  weight: string;
};

export type MyReward = {
  id: number;
  user_id: string;
  policy_id: string;
  promo_code: string;
  is_delete: boolean;
  transaction_id: null | string;
  created: Date;
  updated: Date;
  status?: RewardStatus;
  urbox_transaction?: UrboxTransaction;
  reward_policy?: Reward;
  remaining_use: number;
  valid_time: Date;
};

// export type RewardPolicy = {
//   id: number;
//   policy_id: string;
//   title: LocaleContent;
//   type: RewardPolicyType;
//   image_url?: string;
//   order_type?: OrderType;
//   extra?: ExtraReward;
// };

export type UrboxTransaction = {
  response: {
    cart: UrboxTransactionCart;
    linkCart: string;
    pay: number;
    transaction_id: string;
  };
  transaction_id: string;
};

export type UrboxTransactionCart = {
  cartNo: string;
  code_link_gift: CodeLinkGift[];
  id: string;
  link_gift: string[];
  money_total: string;
};

export type CodeLinkGift = {
  cart_detail_id: string;
  code: string;
  code_display: string;
  code_image: string;
  expired: string;
  link: string;
  priceId: string;
  token: string;
  pin?: string;
  serial?: string;
};

export type UrboxOffice = {
  address: string;
  address_en: string;
  city_id: string;
};

export type Stats = {
  active_count: number;
};
