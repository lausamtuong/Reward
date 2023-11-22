'use client';

import { useIsMobile } from '@ahm/ui';
import { Button, Ellipsis, Image } from 'antd-mobile';
import dayjs from 'dayjs';
import useTranslation from 'next-translate/useTranslation';
import { CSSProperties } from 'react';
import { MyReward, RewardPolicyType } from '@/api/rewards/types';
import { LocaleContent } from '@/api/types';
import { useProtocol } from '@/app/ProtocolProvider';
import { OrderType } from '@/lib/constants';
import { navigateBooking } from '@/lib/helper';
import { getBrandName } from '@/lib/helper';
import MyRewardDetailModal from './MyRewardDetailModal';
import { handleUseReward } from '@/lib/helper';

type Props = {
  isUsed?: boolean;
  rewardData: MyReward;
  style?: CSSProperties;
};

export function MyRewardCard({ isUsed, style, rewardData }: Props) {
  const { t, lang } = useTranslation('rewards');
  const isMobile = useIsMobile();
  const { isEmbed } = useProtocol();

  const navigateUseCard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    { promo_code: promoCode, reward_policy: reward }: Partial<MyReward>,
  ) => {
    e.stopPropagation();
    if (reward) {
      handleUseReward({ promoCode: promoCode || '', reward, isMobile, isEmbed });
    }
  };

  return (
    <>
      <div
        style={style}
        onClick={() => {
          MyRewardDetailModal({ isMobile, id: rewardData.id, isUsed });
        }}>
        <div className={`group flex h-[100px] cursor-pointer rounded bg-white p-2 ${isUsed ? 'grayscale' : ''}`}>
          <div className="border-r-neutral-30 relative border-r-[1px] border-dashed pr-2">
            <div className="bg-neutral-10 absolute right-[-6px] top-[-14px] h-3 w-3 rounded-full"></div>
            <div className="bg-neutral-10 absolute bottom-[-14px] right-[-6px] h-3 w-3 rounded-full"></div>
            <div className="!h-[84px] !w-[84px] overflow-hidden rounded">
              <Image
                src={
                  rewardData?.reward_policy?.image_url && /^(https?:\/\/)/i.test(rewardData?.reward_policy?.image_url)
                    ? rewardData?.reward_policy?.image_url
                    : `/static/images/rewards.webp`
                }
                alt="card"
                className={'!h-full !object-cover duration-200 ease-out group-hover:scale-105'}
                fit="cover"
              />
            </div>
          </div>
          <div className="flex flex-1">
            <div className="flex flex-1 flex-col justify-between pl-2">
              <div className="flex flex-col gap-1">
                <p className="text-neutral-40 text-left text-[12px] font-medium leading-3">
                  {getBrandName(rewardData.reward_policy)}
                </p>
                <div title={rewardData?.reward_policy?.title?.[lang as keyof LocaleContent] || ''}>
                  <Ellipsis
                    className="text-neutral-90 group-hover:text-primary-50 h-10 font-bold duration-200"
                    direction="end"
                    content={rewardData?.reward_policy?.title?.[lang as keyof LocaleContent] || ''}
                    rows={2}
                    style={{ whiteSpace: 'pre-wrap', textAlign: 'start' }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-neutral-40 text- text-[10px] leading-[14px]">
                  {!isUsed ? t('myReward.dueDate') : t('myReward.useOn') || t('myReward.expiredOn')}&nbsp;
                  {dayjs(rewardData?.valid_time).format('DD/MM/YYYY')}
                </div>
                {(rewardData?.reward_policy?.type === RewardPolicyType.AHAMOVE || isUsed) && (
                  <Button
                    size="small"
                    disabled={isUsed}
                    color="primary"
                    fill="none"
                    className="!px-2"
                    onClick={(e) => navigateUseCard(e, rewardData)}>
                    <span className="text-sm font-bold">
                      {isUsed ? t('myReward.buttonInvalid') : t('myReward.buttonActive')}
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
