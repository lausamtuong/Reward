import { cn } from '@ahm/common-helpers';
import { Card, Skeleton } from 'antd-mobile';
import React from 'react';

type Props = {
  direction?: 'horizontal' | 'vertical';
  className?: string;
  isFlashSale?: boolean;
};

export default function MyRewardCardSkeleton({ className, direction = 'vertical' }: Props) {
  return (
    <Card
      bodyStyle={{
        display: direction === 'horizontal' ? 'flex' : undefined,
      }}
      className={cn(
        'w-full overflow-hidden rounded !p-0 text-left shadow-none',
        {
          relative: direction === 'horizontal',
          '!rounded-none !px-4 !py-3': direction === 'horizontal',
        },
        className,
      )}>
      <>
        <Skeleton style={{ '--width': '80px', '--height': '80px', '--border-radius': '12px' }} animated />
        <div className="pl-3 pt-1">
          <Skeleton
            style={{ '--width': '100px', '--height': '10px', '--border-radius': '0px' }}
            className="mb-1"
            animated
          />
          <Skeleton style={{ '--width': '200px', '--height': '40px', '--border-radius': '0px' }} animated />
        </div>
      </>
    </Card>
  );
}
