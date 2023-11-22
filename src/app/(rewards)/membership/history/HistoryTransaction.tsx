'use client';

import { ErrorBlock, Image, List, NavBar, Skeleton } from 'antd-mobile';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useGetPointTransaction } from '@/api/rewards/useGetPointTransaction';
import { LocaleContent } from '@/api/types';
import { useProtocol } from '@/app/ProtocolProvider';
import { BackIcon } from '../../components/icons';
import { useIsMobile } from '@ahm/ui';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Fragment } from 'react';
import { PAGE_SIZE } from '@/lib/constants';

export default function HistoryTransaction() {
  const router = useRouter();
  const { t, lang } = useTranslation('membership');
  const { isAuthenticated } = useProtocol();
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPointTransaction(
    {},
    {
      enabled: isAuthenticated,
    },
  );
  function TransactionSkeleton() {
    return (
      <div className="border-neutral-10 flex justify-between border-b py-3 last-of-type:border-none">
        <div className="flex flex-col gap-1">
          <Skeleton
            animated
            style={{
              '--height': '18px',
              '--width': '200px',
            }}
          />
          <Skeleton
            animated
            style={{
              '--height': '13px',
              '--width': '100px',
            }}
          />
        </div>
        <Skeleton
          animated
          style={{
            '--height': '18px',
            '--width': '80px',
            '--border-radius': '8px',
          }}
        />
      </div>
    );
  }
  return (
    <>
      <NavBar
        className="desktop:bg-transparent desktop:!p-0 desktop:!inline-flex desktop:w-auto desktop:relative shadow-reward-card desktop:shadow-none fixed top-0 z-[1] !flex w-full bg-white"
        style={{ '--height': '44px' }}
        onBack={() => router.back()}
        backArrow={<BackIcon />}>
        <span className="text-neutral-90 desktop:text-2xl text-lg font-bold">{t('history.title')}</span>
      </NavBar>
      <InfiniteScroll
        className="infinite"
        next={() => fetchNextPage()}
        hasMore={hasNextPage ? hasNextPage : false}
        loader={
          <Fragment>
            {isFetchingNextPage && (
              <div className="flex flex-col">
                {Array.from(Array(10).keys()).map((item) => (
                  <TransactionSkeleton key={item} />
                ))}
              </div>
            )}
          </Fragment>
        }
        dataLength={data?.pages ? data.pages.length : PAGE_SIZE}>
        {isFetching && !isFetchingNextPage ? (
          <div className="flex flex-col">
            {Array.from(Array(10).keys()).map((item) => (
              <TransactionSkeleton key={item} />
            ))}
          </div>
        ) : data && data.pages && data.pages.some((p) => p.length > 0) ? (
          <List>
            {data.pages.map((group, i) => (
              <Fragment key={i}>
                {group.map((item) => (
                  <div key={item.id} className="col-span-1">
                    <List.Item
                      description={
                        <p className="text-[12px] font-medium leading-4 text-neutral-50">
                          {dayjs(item?.create_time).format('HH:mm DD/MM/YYYY')}
                        </p>
                      }
                      arrow={false}
                      extra={
                        <div className="flex items-start gap-1">
                          <p className="text-green-40 text-[14px] font-semibold leading-5">{item?.point}</p>
                          <Image
                            className="self-baseline"
                            src={`/static/images/rewards/ahaxu.png`}
                            width={16}
                            height={16}
                            alt="coin"
                          />
                        </div>
                      }>
                      <p className="text-[14px] font-bold leading-5">{item?.title[lang as keyof LocaleContent]}</p>
                    </List.Item>
                  </div>
                ))}
              </Fragment>
            ))}
          </List>
        ) : isFetching ? (
          <div className="flex flex-col">
            {Array.from(Array(3).keys()).map((item) => (
              <TransactionSkeleton key={item} />
            ))}
          </div>
        ) : (
          <ErrorBlock
            className="px-6 py-8"
            image={<Image src={`/static/icons/rewards/EmptyReward.svg`} alt="empty" height={'100%'} />}
            style={{
              '--image-height': '150px',
            }}
            title={''}
            description={''}
          />
        )}
      </InfiniteScroll>
    </>
  );
}
