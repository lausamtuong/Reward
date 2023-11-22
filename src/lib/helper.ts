import { JSFunction } from '@ahm/common-helpers';
import { Reward, RewardPolicyType } from '@/api/rewards/types';
import { BookingLink, OrderType } from './constants';

export async function navigateBooking(promoCode: string, isMobile: boolean, isEmbed: boolean, orderType?: OrderType) {
  let mobileLink = `${BookingLink.BIKE.linkMobile}?promo_code=${promoCode}`;
  let desktopLink = `${BookingLink.BIKE.linkDesktop}?promo_code=${promoCode}`;

  switch (orderType) {
    case OrderType.TRUCK:
      mobileLink = `${BookingLink.TRUCK.linkMobile}&promo_code=${promoCode}`;
      desktopLink = `${BookingLink.TRUCK.linkDesktop}?promo_code=${promoCode}`;
      break;
    case OrderType.EV:
      mobileLink = `${BookingLink.EV.linkMobile}?promo_code=${promoCode}`;
      desktopLink = `${BookingLink.EV.linkDesktop}?promo_code=${promoCode}`;
      break;
  }

  if (isEmbed && isMobile) {
    JSFunction.openPage(mobileLink);
  } else {
    try {
      const postRobot = await import('post-robot');
      await postRobot.send(window.parent, 'OPEN_PAGE', { href: desktopLink });
    } catch (error) {
      window.location.href = desktopLink;
    }
  }
  return;
}

export function getBrandName(reward?: Reward): string {
  if (reward?.type === RewardPolicyType.URBOX) {
    return reward?.extra?.brand || 'Urbox';
  } else {
    return 'Ahamove';
  }
}

export function handleUseReward({
  promoCode,
  reward,
  isMobile,
  isEmbed,
}: {
  promoCode: string;
  reward: Reward;
  isMobile: boolean;
  isEmbed: boolean;
}) {
  if (reward) {
    if (reward.type === RewardPolicyType.AHAMOVE) {
      navigateBooking(promoCode || '', isMobile, isEmbed, reward.order_type || OrderType.BIKE);
    } else if (reward.type === RewardPolicyType.URBOX || reward.type === RewardPolicyType.MERCHANT) {
      window.location.href = reward.link_voucher || '';
    }
  }
}
