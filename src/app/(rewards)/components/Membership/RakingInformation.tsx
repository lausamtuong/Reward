'use client';
import { useIsMobile } from '@ahm/ui';
import { Dialog, List, NavBar, Skeleton, Tabs } from 'antd-mobile';
import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';
import { useGetRankingConfig } from '@/api/rewards/useGetRankingConfig';
import type { RankingConfig } from '@/api/rewards/useGetRankingConfig';
import { useGetRewardUserProfile } from '@/api/rewards/useGetRewardUserProfile';
import { LocaleContent } from '@/api/types';
import { useProtocol } from '@/app/ProtocolProvider';
import { membershipStyle, RankName } from './type';
import { CloseIcon } from '../icons';

export default function RakingInformation() {
  const isMobile = useIsMobile();
  const { t, lang } = useTranslation('membership');
  const { isAuthenticated } = useProtocol();
  const { data: rankInfo, isLoading: isLoadingRankInfo } = useGetRankingConfig(
    { offset: 0 },
    { enabled: isAuthenticated },
  );
  const { data: userProfile } = useGetRewardUserProfile({ enabled: isAuthenticated });

  const handleOpenBlogGetPoints = () => {
    if (isMobile) {
      Dialog.show({
        className: 'adm-dialog-custom',
        title: (
          <NavBar
            backArrow={<CloseIcon />}
            onBack={() => {
              Dialog.clear();
            }}>
            {t('get_more_points')}
          </NavBar>
        ),
        content: (
          <iframe
            src="https://www.ahamove.com/ahaloyalty-blog"
            height="100%"
            width="100%"
            className="-mx-3 -mb-5 h-[calc(100%+20px)] w-[calc(100%+24px)]"></iframe>
        ),
      });
    } else {
      window.open('https://www.ahamove.com/ahaloyalty-blog', '_ blank');
    }
  };

  const membershipInfo = useMemo(() => {
    if (rankInfo) {
      return membershipStyle.map((item) => {
        const info = rankInfo.find((ele) => ele.value === item.rank) || ({} as RankingConfig);
        return { ...item, description: info.description || ({} as LocaleContent), maxValue: info.max_value || 0 };
      });
    }
    return null;
  }, [rankInfo]);

  const rankName = useMemo(() => {
    if (userProfile && rankInfo) {
      const { score } = userProfile;
      const maxValueConfig = rankInfo.find((item) => item.name === RankName.DIAMOND)?.max_value || 0;
      if (score > maxValueConfig) return RankName.DIAMOND;
      return rankInfo?.find((item) => item.min_value <= score && item.max_value >= score)?.name || '';
    }
    return RankName.MEMBER;
  }, [userProfile, rankInfo]);

  return (
    <div className="desktop:grid desktop:grid-cols-2 desktop:rounded-lg bg-white">
      {membershipInfo ? (
        <div>
          <div className="p-3 text-xl font-bold">{t('rank_and_benefit')}</div>
          <Tabs className="adm-tabs-custom" defaultActiveKey={rankName}>
            {membershipInfo.map((item) => {
              return (
                <Tabs.Tab
                  key={item.name}
                  title={
                    <Image className="mx-auto max-w-max" alt={item.title} src={item.icon} width={36} height={36} />
                  }>
                  <div
                    className="prose prose-sm prose-p:my-2"
                    dangerouslySetInnerHTML={{ __html: item.description[lang as keyof LocaleContent] || '' }}></div>
                </Tabs.Tab>
              );
            })}
          </Tabs>
        </div>
      ) : isLoadingRankInfo ? (
        <div>
          <div className="space-y-6 p-3.5">
            <Skeleton animated style={{ '--width': '220px', '--height': '20px' }} />
            <div className="flex justify-around pt-4">
              <Skeleton animated style={{ '--width': '36px', '--height': '36px' }} />
              <Skeleton animated style={{ '--width': '36px', '--height': '36px' }} />
              <Skeleton animated style={{ '--width': '36px', '--height': '36px' }} />
              <Skeleton animated style={{ '--width': '36px', '--height': '36px' }} />
            </div>
          </div>
          <div className="border-neutral-15 border-t px-4 py-3">
            <Skeleton animated style={{ '--width': '100%', '--height': '121px' }} />
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="border-neutral-20 desktop:border-t-0 border-l border-t">
        <List mode="card" className="!m-0">
          <Link href="/rewards?from=membership" passHref className="text-neutral-90">
            <List.Item arrow className="font-bold">
              {t('rewards')}
            </List.Item>
          </Link>
          <Link href="/membership/history" passHref className="text-neutral-90">
            <List.Item arrow className="font-bold">
              {t('rewards_history')}
            </List.Item>
          </Link>
          <List.Item arrow className="font-bold" onClick={handleOpenBlogGetPoints}>
            {t('get_more_points')}
          </List.Item>
        </List>
      </div>
    </div>
  );
}
