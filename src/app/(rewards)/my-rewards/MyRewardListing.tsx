'use client';

import { useIsMobile } from '@ahm/ui';
import { Button, ErrorBlock, Image } from 'antd-mobile';
import useTranslation from 'next-translate/useTranslation';
import { CSSProperties } from 'react';
import { AutoSizer, List as VirtualizedList, WindowScroller } from 'react-virtualized';
import { MyReward } from '@/api/rewards/types';
import { MyRewardCard } from '@/app/(rewards)/components/MyRewardCard';
import MyRewardCardSkeleton from '@/app/(rewards)/components/MyRewardCardSkeleton';

interface Props {
  isUsed?: boolean;
  isLoading?: boolean;
  data: MyReward[];
  onExploreRewards: () => void;
}
export default function MyRewardListing({ data, isUsed, isLoading, onExploreRewards }: Props) {
  const isMobile = useIsMobile();
  const { t } = useTranslation('rewards');

  function rowRenderer({ index, key, style }: { index: number; key: string; style: CSSProperties }) {
    const item = data[index];
    return <MyRewardCard key={key} style={style} rewardData={item} isUsed={isUsed} />;
  }

  return (
    <div className="flex-1 pb-3">
      {data.length > 0 ? (
        <WindowScroller>
          {({ height }) => (
            <AutoSizer ignoreHeight>
              {({ width }) => (
                <VirtualizedList
                  rowCount={data.length}
                  rowRenderer={rowRenderer}
                  width={width}
                  height={isMobile ? height - 44 - 42 : 620 - 56 - 42}
                  rowHeight={112}
                  overscanRowCount={10}
                  style={{
                    overflowX: 'hidden',
                    padding: '1rem',
                    marginTop: '-1rem',
                  }}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      ) : isLoading ? (
        <div className="bg-neutral-10 flex flex-col gap-3 px-4">
          {Array.from(Array(1 * 9).keys()).map((_, index) => (
            <div key={index} className="col-span-1 bg-white">
              <MyRewardCardSkeleton direction={'horizontal'} className="h-[100px]" />
            </div>
          ))}
        </div>
      ) : (
        <ErrorBlock
          className="px-6 py-8"
          image={<Image src={`/static/icons/rewards/EmptyReward.svg`} alt="empty" height={'100%'} />}
          style={{
            '--image-height': '150px',
          }}
          title={
            <div className="text-base font-bold text-black">
              {isUsed ? t('myReward.emptyUsedTitle') : t('myReward.emptyTitle')}
            </div>
          }
          description={
            <p style={{ whiteSpace: 'pre-wrap' }} className=" break-words text-[14px]">
              {isUsed ? t('myReward.emptyUsedContent') : t('myReward.emptyContent')}
            </p>
          }>
          <Button color="primary" className="font-bold" onClick={onExploreRewards}>
            {t('myReward.emptyNavigate')}
          </Button>
        </ErrorBlock>
      )}
    </div>
  );
}
