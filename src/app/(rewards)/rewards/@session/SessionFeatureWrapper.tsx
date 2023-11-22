'use client';

import { cn } from '@ahm/common-helpers';
import { Ellipsis, Skeleton, Space } from 'antd-mobile';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';
import LocaleLink from '@/components/LocaleLink';
import { RightArrowIcon } from '../../components/icons';

type Props = {
  isFlashSale?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  title?: string;
  viewAllUrl?: string;
};

export default function SessionFeatureWrapper({ isFlashSale, isLoading, children, title, viewAllUrl }: Props) {
  const { t } = useTranslation('rewards');

  return (
    <div
      className={cn('desktop:rounded-lg relative flex flex-col overflow-hidden px-4 pb-4 pt-6', {
        'bg-primary-10': isFlashSale,
        'desktop:bg-white': !isFlashSale,
      })}>
      {isFlashSale ? (
        <Image
          className="absolute left-0 top-0"
          src="/static/icons/rewards/Frame.svg"
          alt="frame"
          height={100}
          width={100}
        />
      ) : null}
      <div className="relative z-[1] flex w-full items-center justify-between gap-2">
        {title ? (
          <h2 className="flex-1 text-lg font-bold leading-6">
            <div className="flex items-center gap-1">
              {isFlashSale ? (
                <Image src="/static/icons/rewards/FlashSale.svg" alt="icon" height={24} width={24} />
              ) : null}
              <Ellipsis direction="end" rows={2} content={title} />
            </div>
          </h2>
        ) : isLoading ? (
          <Skeleton style={{ '--width': '120px', '--height': '24px' }} animated />
        ) : null}
        {isLoading ? (
          <Skeleton style={{ '--width': '80px', '--height': '20px' }} animated />
        ) : viewAllUrl ? (
          <LocaleLink href={viewAllUrl} className="group flex-none text-sm font-bold">
            <Space
              direction="horizontal"
              align="center"
              className="group-hover:underline"
              style={{ '--gap-horizontal': '0px' }}>
              <span>{t('viewAll')}</span>
              <RightArrowIcon />
            </Space>
          </LocaleLink>
        ) : null}
      </div>
      {children}
    </div>
  );
}
