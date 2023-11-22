import { cn } from '@ahm/common-helpers';
import { Card, Skeleton } from 'antd-mobile';
import React from 'react';

type Props = {
  direction?: 'horizontal' | 'vertical';
  className?: string;
  isFlashSale?: boolean;
};

export default function RewardCardSkeleton({ className, direction = 'vertical', isFlashSale = false }: Props) {
  return (
    <Card
      bodyStyle={{
        display: direction === 'horizontal' ? 'flex' : undefined,
      }}
      className={cn('w-full overflow-hidden rounded !p-0 text-left shadow-none', className, {
        relative: direction === 'horizontal',
        '!rounded-none !px-4 !py-3': direction === 'horizontal',
        'min-h-[303.8px]': isFlashSale,
        'min-h-[248]': !isFlashSale,
      })}>
      {direction === 'vertical' ? (
        <>
          <Skeleton style={{ '--width': '100%', '--height': '140px', '--border-radius': '0px' }} animated />
          <div className="px-2 pb-3 pt-4">
            <Skeleton
              style={{ '--width': '30%', '--height': '10px', '--border-radius': '0px' }}
              className="mb-1"
              animated
            />
            <Skeleton style={{ '--width': '80%', '--height': '40px', '--border-radius': '0px' }} animated />
          </div>
        </>
      ) : (
        <>
          <Skeleton style={{ '--width': '126px', '--height': '126px', '--border-radius': '12px' }} animated />
          <div className="pl-3 pt-1">
            <Skeleton
              style={{ '--width': '100px', '--height': '10px', '--border-radius': '0px' }}
              className="mb-1"
              animated
            />
            <Skeleton style={{ '--width': '200px', '--height': '40px', '--border-radius': '0px' }} animated />
          </div>
        </>
      )}
    </Card>
  );
}
