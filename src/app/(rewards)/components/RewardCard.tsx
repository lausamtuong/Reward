'use client';

import { cn, formatNumber } from '@ahm/common-helpers';
import { useIsMobile } from '@ahm/ui';
import { Card, Ellipsis } from 'antd-mobile';
import dayjs from 'dayjs';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { ReactNode, useMemo } from 'react';
import { Reward } from '@/api/rewards/types';
import { LocaleContent } from '@/api/types';
import LocaleLink from '@/components/LocaleLink';
import { getBrandName } from '@/lib/helper';
import ButtonWithFlowRedeem from './ButtonWithFlowRedeem';
import FlashsaleBar from './FlashsaleBar';
import RewardDetailModal from './RewardDetailModal';
import TimeBadge from './TimeBadge';

interface Props extends Reward {
  direction?: 'horizontal' | 'vertical';
  className?: string;
  modalOnly?: boolean;
}
export default function RewardCard({ className, direction = 'vertical', modalOnly = false, ...props }: Props) {
  const isMobile = useIsMobile();
  const { lang } = useTranslation('membership');

  const isExpired = useMemo(() => {
    return Boolean(props.flashsale_end_time && new Date(props.flashsale_end_time) < new Date());
  }, [props.flashsale_end_time]);

  const isNotStart = useMemo(() => {
    return Boolean(props.flashsale_start_time && new Date(props.flashsale_start_time) > new Date());
  }, [props.flashsale_start_time]);

  const isOutOfStock = useMemo(() => {
    return Boolean(props.use_quantity >= props.quantity);
  }, [props.use_quantity, props.quantity]);

  const Wrapper = ({ children }: { children: ReactNode }) => {
    if (modalOnly) return <div className={direction === 'horizontal' ? 'flex' : ''}>{children}</div>;

    return (
      <LocaleLink className={direction === 'horizontal' ? 'flex' : ''} href={`/rewards/${props.id}`}>
        {children}
      </LocaleLink>
    );
  };

  return (
    <>
      <Card
        // eslint-disable-next-line prettier/prettier
        onBodyClick={() => (modalOnly ? RewardDetailModal({ data: props, isMobile }) : {})}
        bodyStyle={{
          // display: direction === 'horizontal' ? 'flex' : undefined,
          cursor: modalOnly ? 'pointer' : 'default',
        }}
        className={cn('group h-full w-full overflow-hidden rounded !p-0 text-left', className, {
          'shadow-reward-card hover:shadow-lg': direction === 'vertical',
          'relative shadow-none': direction === 'horizontal',
          '!rounded-none !px-4 !py-3': direction === 'horizontal',
          // 'min-w-[277px] max-w-[277px]': props.is_flashsale,
          // 'min-w-[240px] max-w-[240px]': !props.is_flashsale,
        })}>
        <Wrapper>
          <div className="desktop:!m-0 desktop:!p-0 -mx-4 -my-3 flex-none px-4 py-3">
            <div className="overflow-hidden">
              <Image
                alt="demo"
                src={
                  props.image_url && /^(https?:\/\/)/i.test(props.image_url)
                    ? props.image_url
                    : '/static/images/rewards.webp'
                }
                className={cn('bg-gold-10 object-cover duration-200 ease-out group-hover:scale-105', {
                  '!h-[140px] w-full rounded-t-md': direction === 'vertical',
                  '!h-[126px] !w-[126px] rounded': direction === 'horizontal',
                })}
                height={direction === 'vertical' ? 122 : 126}
                width={direction === 'vertical' ? 240 : 126}
              />
            </div>

            {props.is_flashsale && (
              <div className="relative">
                <TimeBadge
                  timeEnd={dayjs(props.flashsale_end_time).toDate()}
                  timeStart={dayjs(props.flashsale_start_time).toDate()}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />
              </div>
            )}
          </div>

          <div
            className={cn({
              'px-2 pb-3 pt-4': direction === 'vertical',
              'ml-4 flex-1 pt-2': direction === 'horizontal',
            })}>
            <p className="text-xxs font-medium capitalize text-neutral-50">{getBrandName(props)}</p>
            <div title={props.title?.[lang as keyof LocaleContent] || ''}>
              <Ellipsis
                className="text-neutral-90 group-hover:text-primary-50 h-10 font-bold duration-200"
                direction="end"
                content={props.title?.[lang as keyof LocaleContent] || ''}
                rows={2}
              />
            </div>
            {props.is_flashsale && (
              <FlashsaleBar
                usedNumber={props.use_quantity}
                totalNumber={props.quantity}
                isExpired={isExpired}
                isNotStart={isNotStart}
                isOutOfStock={isOutOfStock}
              />
            )}
            <div className="mt-1 flex items-center gap-1">
              <Image
                className="self-baseline"
                src="/static/images/rewards/ahaxu.png"
                width={16}
                height={16}
                alt="coin"
              />
              <p className="text-sm font-semibold text-neutral-50">{formatNumber(props.point)}</p>
              {props.point_non_discount ? (
                <p className="text-sm text-neutral-50 line-through">{formatNumber(props.point_non_discount)}</p>
              ) : null}
            </div>
            {props.is_flashsale && (
              <ButtonWithFlowRedeem
                isOutOfStock={isOutOfStock}
                point={props.point}
                idVoucher={props.id}
                disabled={props.is_flashsale && (isExpired || isNotStart || isOutOfStock)}
                className={cn('!font-semibold', {
                  '!-mb-3 !-ml-3 !pb-3': direction === 'vertical',
                  '!-mb-3 !pb-3 !pl-0 !pt-1': direction === 'horizontal',
                })}
                color="primary"
                fill="none"
              />
            )}
          </div>
        </Wrapper>
      </Card>
    </>
  );
}
