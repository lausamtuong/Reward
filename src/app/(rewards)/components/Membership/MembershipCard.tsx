'use client';

import { cn, formatNumber } from '@ahm/common-helpers';
import { useIsMobile } from '@ahm/ui';
import { Ellipsis, Skeleton, Space } from 'antd-mobile';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';
import { useGetRankingConfig } from '@/api/rewards/useGetRankingConfig';
import { useGetRewardUserProfile } from '@/api/rewards/useGetRewardUserProfile';
import { useProtocol } from '@/app/ProtocolProvider';
import LocaleLink from '@/components/LocaleLink';
import RankingProgress from './RankingProgress';
import { MembershipLevel, membershipStyle, RankName } from './type';
import { RightArrowIcon } from '../icons';

type Props = {
  direction?: 'horizontal' | 'vertical';
  bordered?: boolean;
  children?: ReactNode;
  className?: string;
  isPageMembership?: boolean;
};

export default function MembershipCard({ className, isPageMembership = false }: Props) {
  const isMobile = useIsMobile();
  const { t } = useTranslation('membership');
  const { isAuthenticated } = useProtocol();
  const { data: userProfile, isLoading: isLoadingUserProfile } = useGetRewardUserProfile({ enabled: isAuthenticated });
  const { data: rankInfo } = useGetRankingConfig({ offset: 0 }, { enabled: isAuthenticated });

  if (userProfile && rankInfo) {
    const { point, use_point, reset_point, score } = userProfile;
    const maxValueConfig = rankInfo.find((item) => item.name === RankName.DIAMOND)?.max_value || 0;
    let rankUser = '';
    if (score > maxValueConfig) rankUser = RankName.DIAMOND;
    else rankUser = rankInfo.find((item) => item.min_value <= score && item.max_value >= score)?.name || '';

    const timeReset: Dayjs = dayjs(reset_point);
    const formattedDate = timeReset.format('DD/MM/YYYY');
    const remainPoint = point - use_point;
    const rankStyle = membershipStyle.find((item) => item.name === rankUser) || ({} as MembershipLevel);

    return (
      <div className={cn('hover:shadow-reward-card block h-full min-h-full rounded-lg', className)}>
        <div
          className={cn(
            `desktop:rounded-xl desktop:bg-repeat-x desktop:px-5 desktop:pt-5 desktop:pb-0 desktop:bg-top h-full w-full bg-cover bg-center bg-no-repeat px-4 pb-3`,
            rankStyle.bg,
            {
              'desktop:grid desktop:grid-cols-2 desktop:pb-7 desktop:gap-10 min-h-[205px] pt-16': isPageMembership,
              'pt-16': !isPageMembership,
            },
          )}>
          <div className={cn({ 'desktop:h-[60px] desktop:overflow-hidden': !isPageMembership })}>
            <div
              className={cn(
                `border-primary-30 text-neutral-00 shadow-3xl flex min-h-[160px] flex-col justify-between rounded-xl border p-4`,
                rankStyle.bgBlur,
              )}>
              <div className="flex w-full flex-row flex-nowrap items-start justify-between gap-x-2">
                <div className="max-w-[calc(100%_-_56px)] flex-auto">
                  {isPageMembership ? (
                    <p className="text-neutral-00 text-sm font-semibold uppercase">{t(rankStyle.title)}</p>
                  ) : (
                    <LocaleLink href="/membership?from=rewards" className="flex gap-1">
                      <span
                        className="text-neutral-00 truncate text-sm font-semibold uppercase"
                        title={t(rankStyle.title)}>
                        {t(rankStyle.title)}
                      </span>
                      <RightArrowIcon fill="#fff" />
                    </LocaleLink>
                  )}
                  <Space direction="horizontal" style={{ '--gap-horizontal': '4px' }}>
                    <Image alt="coin" src={`/static/images/rewards/ahaxu.png`} width={16} height={16} />
                    <span>{formatNumber(remainPoint)}</span>
                  </Space>
                </div>
                <div className="flex-none">
                  <Image
                    className={cn({ 'desktop:-mt-2 desktop:-mr-1': !isPageMembership })}
                    alt="coin"
                    src={rankStyle.icon}
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <RankingProgress
                className="mt-auto"
                rankName={rankUser}
                score={score}
                nextIcon={rankStyle.nextIcon}
                nextLevel={rankStyle.nextLevel}
              />
            </div>
          </div>

          {isMobile && !isPageMembership ? null : (
            <div
              title={`${formatNumber(remainPoint)} ${t('expired_point_message')} ${formattedDate}. ${t(
                'expired_point_sub_message',
              )}`}
              className="bg-new-member-20 desktop:mx-0 desktop:my-auto desktop:bg-transparent desktop:shadow-none m-3 space-y-1 rounded-xl p-3 text-white shadow-md backdrop-blur-sm">
              <Ellipsis
                className="text-sm font-bold"
                content={`${formatNumber(remainPoint)} ${t('expired_point_message')} ${formattedDate}`}
                rows={1}
              />
              <Ellipsis content={t('expired_point_sub_message')} rows={2} />
              {isPageMembership ? null : (
                <LocaleLink
                  href="/membership?from=rewards"
                  className="inline-flex py-3 text-lg font-semibold text-white hover:underline">
                  {t('view_more')}
                </LocaleLink>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('hover:shadow-reward-card block h-full min-h-full rounded-lg', className)}>
      <div
        className={cn(
          `desktop:rounded-xl desktop:bg-repeat-x desktop:px-5 desktop:pt-5 desktop:pb-0 desktop:bg-top h-full w-full bg-cover bg-center bg-no-repeat px-4 pb-3`,
          membershipStyle[0].bg,
          {
            'desktop:grid desktop:grid-cols-2 desktop:pb-7 desktop:gap-10 min-h-[205px] pt-16': isPageMembership,
            'pt-16': !isPageMembership,
          },
        )}>
        <div className={cn({ 'desktop:h-[60px] desktop:overflow-hidden': !isPageMembership })}>
          <div
            className={cn(
              `border-primary-30 text-neutral-00 shadow-3xl flex min-h-[160px] flex-col justify-between rounded-xl border`,
              membershipStyle[0].bgBlur,
              {
                'min-h-[160px]': isPageMembership,
              },
            )}>
            <Skeleton
              style={{ '--width': '100%', '--height': '160px', '--border-radius': '12px' }}
              animated={isLoadingUserProfile}
            />
          </div>
        </div>

        {isMobile && !isPageMembership ? null : (
          <div className="bg-new-member-20 desktop:mx-0 desktop:my-auto desktop:bg-transparent desktop:shadow-none m-3 space-y-3 rounded-xl p-3 text-white shadow-md backdrop-blur-sm">
            <Skeleton animated={isLoadingUserProfile} style={{ '--width': '95%', '--height': '16px' }} />
            <Skeleton animated={isLoadingUserProfile} style={{ '--width': '75%', '--height': '16px' }} />
          </div>
        )}
      </div>
    </div>
  );
}
