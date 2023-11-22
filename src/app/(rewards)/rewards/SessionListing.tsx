'use client';

import { cn } from '@ahm/common-helpers';
import { useIsMobile } from '@ahm/ui';
import { ErrorBlock, PullToRefresh } from 'antd-mobile';
import { useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RewardListingType } from '@/api/rewards/types';
import { useGetInfiniteReward } from '@/api/rewards/useGetInfiniteReward';
import { GetRewardParams } from '@/api/rewards/useGetReward';
import { PAGE_SIZE } from '@/lib/constants';
import RewardCard from '../components/RewardCard';
import RewardCardSkeleton from '../components/RewardCardSkeleton';
import { sleep } from 'antd-mobile/es/utils/sleep';
import useTranslation from 'next-translate/useTranslation';

type Props = GetRewardParams & {
  isFlashSale?: boolean;
  sessionId?: number;
  className?: string;
};

export default function SessionListing({ isFlashSale = false, sessionId, className }: Props) {
  const { t } = useTranslation('rewards');
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category_id');
  const promoTypeId = searchParams.get('promo_type');
  const sortId = searchParams.get('sort');
  const typeId = searchParams.get('type');
  const isRedeemable = searchParams.get('is_redeemable');
  const isMobile = useIsMobile();

  const getRewardParams: GetRewardParams = useMemo(() => {
    const params: GetRewardParams = {};
    if (isFlashSale) {
      params.type = RewardListingType.FLASHSALE_ONLY;
      params.in_stock = false;
    }

    if (sessionId) {
      params.session_id = sessionId;
      params.type = RewardListingType.VOUCHER_NOT_FLASHSALE;
    }

    if (categoryId) {
      params.category_id = Number(categoryId);
    }

    if (promoTypeId) {
      params.promo_type = Number(promoTypeId);
    }

    if (sortId) {
      params.sort = Number(sortId);
    }

    if (typeId) {
      params.type = Number(typeId);
      if (typeId === RewardListingType.FLASHSALE_ONLY.toString()) params.in_stock = false;
    }

    if (isRedeemable === 'true') {
      params.is_redeemable = true;
    }
    return params;
  }, [isFlashSale, sessionId, categoryId, promoTypeId, sortId, typeId, isRedeemable]);

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useGetInfiniteReward(
    getRewardParams,
    {
      keepPreviousData: JSON.stringify(getRewardParams) === '{}',
      enabled: !(JSON.stringify(getRewardParams) === '{}'),
    },
  );

  const [columnCount, setColumnCount] = useState(isMobile ? 1 : isFlashSale ? 3 : 4);

  const expectColumnCount = useMemo(() => {
    if (isFlashSale) {
      return columnCount >= 3 ? 3 : columnCount;
    }
    return columnCount >= 4 ? 4 : columnCount;
  }, [columnCount, isFlashSale]);
  useEffect(() => {
    setColumnCount(Math.floor(window.innerWidth / 300));

    const handleResize = () => {
      setColumnCount(Math.floor(window.innerWidth / 300));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <PullToRefresh
      onRefresh={async () => {
        await sleep(1000);
        refetch();
      }}
      completeText={''}
      canReleaseText={t('release_to_reload')}>
      <InfiniteScroll
        className={cn(
          'desktop:gap-x-3 desktop:gap-y-6 desktop:p-6 desktop:-mb-6 desktop:-mx-6 grid space-y-[1px]',
          {
            'grid-cols-1': columnCount === 1,
            'grid-cols-2': columnCount === 2,
            'grid-cols-3': (columnCount >= 3 && isFlashSale) || (columnCount === 3 && !isFlashSale),
            'grid-cols-4': columnCount >= 4 && !isFlashSale,
          },
          className,
        )}
        next={() => fetchNextPage()}
        hasMore={hasNextPage ? hasNextPage : false}
        loader={
          <Fragment>
            {isFetchingNextPage &&
              Array.from(Array(isMobile ? 3 : expectColumnCount).keys()).map((item) => (
                <div key={item} className="col-span-1">
                  <RewardCardSkeleton direction={isMobile ? 'horizontal' : 'vertical'} />
                </div>
              ))}
          </Fragment>
        }
        dataLength={data?.pages ? data.pages.length : PAGE_SIZE}>
        {isFetching && !isFetchingNextPage ? (
          Array.from(Array(isMobile ? 3 : expectColumnCount).keys()).map((item) => (
            <div key={item} className="col-span-1">
              <RewardCardSkeleton direction={isMobile ? 'horizontal' : 'vertical'} />
            </div>
          ))
        ) : data && data.pages && data.pages.some((p) => p.length > 0) ? (
          data.pages.map((group, i) => (
            <Fragment key={i}>
              {group.map((item) => (
                <div key={item.id} className="col-span-1">
                  <RewardCard modalOnly direction={isMobile ? 'horizontal' : 'vertical'} {...item} />
                </div>
              ))}
            </Fragment>
          ))
        ) : isFetching ? (
          Array.from(Array(isMobile ? 3 : expectColumnCount).keys()).map((_, index) => (
            <div key={index} className="col-span-1 bg-white">
              <RewardCardSkeleton direction={isMobile ? 'horizontal' : 'vertical'} />
            </div>
          ))
        ) : (
          <div
            className={cn({
              'col-span-1': columnCount === 1,
              'col-span-2': columnCount === 2,
              'col-span-3': (columnCount >= 3 && isFlashSale) || (columnCount === 3 && !isFlashSale),
              'col-span-4': columnCount >= 4 && !isFlashSale,
            })}>
            <ErrorBlock
              className="mx-auto my-8"
              image="/static/images/not-found.webp"
              title=""
              description={t('empty_rewards')}
              style={{
                '--image-height': '122px',
              }}
            />
          </div>
        )}
      </InfiniteScroll>
    </PullToRefresh>
  );
}
