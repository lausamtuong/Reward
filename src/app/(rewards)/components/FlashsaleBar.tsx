'use client';

import { cn } from '@ahm/common-helpers';
import { ProgressBar } from 'antd-mobile';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

type Props = {
  usedNumber: number;
  totalNumber: number;
  className?: string;
  isExpired: boolean;
  isNotStart: boolean;
  isOutOfStock: boolean;
};

export default function FlashsaleBar({
  usedNumber,
  totalNumber,
  className,
  isExpired,
  isNotStart,
  isOutOfStock,
}: Props) {
  const { t } = useTranslation('rewards');
  return (
    <ProgressBar
      percent={isExpired || isOutOfStock ? 100 : isNotStart ? 5 : (usedNumber / totalNumber) * 100}
      className={cn('relative', className)}
      style={{
        '--track-width': '1rem',
        '--track-color': '#FFD5BC',
        '--fill-color': isExpired || isOutOfStock ? '#C1C7CD' : 'linear-gradient(#FE5F00, #E81717);',
        '--text-width': '0',
      }}
      text={() => (
        // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
        <div className="absolute -top-[3px] left-2 flex items-center justify-start">
          <Image src="/static/images/rewards/flame.png" alt="flashsale" width={7} height={8} />
          <div className="text-xxs text-neutral-00 ml-2 mt-1 font-semibold uppercase">
            {isExpired
              ? t('flash_sale.expired')
              : isNotStart
              ? t('flash_sale.comingSoon')
              : `${usedNumber}/${totalNumber} ${t('flash_sale.reward')}`}
          </div>
        </div>
      )}
    />
  );
}
