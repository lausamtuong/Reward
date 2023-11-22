'use client';

import { cn, formatNumber } from '@ahm/common-helpers';
import { useIsMobile } from '@ahm/ui';
import { Card, CardProps, Ellipsis, Space } from 'antd-mobile';
import dayjs from 'dayjs';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';
import { Reward } from '@/api/rewards/types';
import { LocaleContent } from '@/api/types';
import { getBrandName } from '@/lib/helper';
import ButtonWithFlowRedeem from './ButtonWithFlowRedeem';
import FlashsaleBar from './FlashsaleBar';
import TimeBadge from './TimeBadge';

type Props = CardProps & {
  data: Reward;
};

export default function RewardDetail({ data: reward, className, ...cardProps }: Props) {
  const { t, lang } = useTranslation('rewards');
  const isMobile = useIsMobile();

  const isExpired = useMemo(() => {
    return Boolean(reward.flashsale_end_time && new Date(reward.flashsale_end_time) < new Date());
  }, [reward.flashsale_end_time]);

  const isNotStart = useMemo(() => {
    return Boolean(reward.flashsale_start_time && new Date(reward.flashsale_start_time) > new Date());
  }, [reward.flashsale_start_time]);

  const isOutOfStock = useMemo(() => {
    return Boolean(reward.use_quantity >= reward.quantity);
  }, [reward.use_quantity, reward.quantity]);

  if (!reward) return <></>;

  return (
    <Card className={cn('!bg-neutral-10 !rounded-none !p-0 !pb-28', className)} {...cardProps}>
      <Image
        src={
          reward?.image_url && /^(https?:\/\/)/i.test(reward?.image_url)
            ? reward?.image_url
            : '/static/images/rewards.webp'
        }
        alt="image"
        width={440}
        height={248}
        className="bg-gold-10 !h-[248px] w-full object-cover"
      />

      <div className="space-y-1 bg-white px-4 py-3">
        <p className="text-xxs font-medium capitalize text-neutral-50">{getBrandName(reward)}</p>
        <Ellipsis
          className="text-neutral-90 text-lg font-semibold leading-6"
          direction="end"
          content={(reward?.title && reward?.title[lang as keyof LocaleContent]) || ''}
          rows={4}
        />
        <Space className="w-full text-sm text-neutral-50" style={{ '--gap': '2px' }}>
          <Image src={`/static/images/rewards/ahaxu.png`} width={16} height={16} alt="coin" />
          <span className="font-semibold">{formatNumber(reward?.point)}</span>
          {reward?.point_non_discount && reward?.point_non_discount > 0 ? (
            <span className="ml-1 line-through">{formatNumber(reward?.point_non_discount)}</span>
          ) : null}
        </Space>
        <Space className="w-full text-xs font-medium text-neutral-50">
          <Image src={`/static/images/rewards/clock.png`} width={13} height={13} alt="coin" />
          <span>
            {t('expiredAt')} {dayjs(reward?.end_time).format('hh:mm DD/MM/YYYY ')}
          </span>
        </Space>
      </div>
      {reward?.is_flashsale && (
        <div className="bg-primary-10 relative h-20">
          <Image
            className="absolute left-0 top-0"
            src="/static/icons/rewards/Frame.svg"
            alt="frame"
            height={100}
            width={100}
          />
          <div className="relative z-10 flex flex-col gap-2 px-4 py-2">
            <Space>
              <Image alt="icon" width={24} height={24} src={`/static/images/rewards/flash.png`} />
              <div className="text-lg font-semibold">FLASH SALE</div>
            </Space>
            <FlashsaleBar
              usedNumber={reward.use_quantity}
              totalNumber={reward.quantity}
              isExpired={isExpired}
              isNotStart={isNotStart}
              isOutOfStock={isOutOfStock}
            />
            <TimeBadge
              timeEnd={reward.flashsale_end_time || new Date()}
              timeStart={reward.flashsale_start_time || new Date()}
              className="absolute -top-3 right-4"
            />
          </div>
        </div>
      )}

      {reward?.description ? (
        <div className="mb-8 mt-2 bg-white px-4 py-3">
          <h3 className="mb-3 text-lg font-semibold">{t('aboutThisVoucher')}</h3>
          <div
            className="prose prose-sm prose-p:my-2"
            dangerouslySetInnerHTML={{
              __html: reward?.description && reward?.description[lang as keyof LocaleContent],
            }}></div>
        </div>
      ) : null}
      <div
        className={cn('shadow-button-dock inset-x-0 bottom-0 z-20 space-y-3 bg-white px-4 pb-4 pt-3', {
          fixed: isMobile,
          'absolute rounded-b-lg': !isMobile,
        })}>
        <ButtonWithFlowRedeem
          isDetail
          idVoucher={reward.id}
          point={reward.point}
          isOutOfStock={isOutOfStock}
          disabled={(reward.is_flashsale && isExpired) || isNotStart || isOutOfStock}
          fill="solid"
          color="primary"
          size="large"
          block
          className="!font-semibold"
        />
      </div>
    </Card>
  );
}
