'use client';

import { NavBar, Space } from 'antd-mobile';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';
import { GetRewardParams } from '@/api/rewards/useGetReward';
import { useGetRewardSessionDetail } from '@/api/rewards/useGetRewardSession';
import { LocaleContent } from '@/api/types';
import { useProtocol } from '@/app/ProtocolProvider';
import LocaleLink from '@/components/LocaleLink';
import { BackIcon } from '../components/icons';

type Props = GetRewardParams & {
  isSearchPage?: boolean;
  isFlashSale?: boolean;
  children?: ReactNode;
  sessionId?: number;
};
export enum ModalType {
  DEFAULT = 1,
  CATEGORY = 2,
  FILTER = 3,
}
export default function SessionListingWrapper({
  isSearchPage = false,
  isFlashSale = false,
  sessionId,
  children,
}: Props) {
  const { t, lang } = useTranslation('rewards');
  const { isAuthenticated } = useProtocol();
  // const router = useRouter();

  const { data: session } = useGetRewardSessionDetail(Number(sessionId), {
    enabled: isAuthenticated && !!sessionId && !isNaN(Number(sessionId)),
  });

  return (
    <div className="desktop:p-6 desktop:bg-white relative min-h-[60vh] overflow-hidden rounded-xl pt-11">
      {isFlashSale ? (
        <Image
          className="absolute left-0 top-0"
          src="/static/icons/rewards/Frame.svg"
          alt="frame"
          height={100}
          width={100}
        />
      ) : null}
      <NavBar
        className="desktop:bg-transparent desktop:!p-0 desktop:!inline-flex desktop:w-auto desktop:relative desktop:shadow-none fixed top-0 z-[1] !flex w-full bg-white shadow-sm"
        // back={
        //   <Space direction="horizontal" align="center" style={{ '--gap-horizontal': '4px' }}>
        //     {isFlashSale ? (
        //       <Image src="/static/icons/rewards/Flash-icon.svg" alt="icon" height={24} width={24} />
        //     ) : null}
        //     <span className={cn('text-neutral-90 text-2xl font-bold', { uppercase: isFlashSale })}>
        //       {(isFlashSale ? t('flashSale') : session?.name) || t('rewards')}
        //     </span>
        //   </Space>
        // }
        style={{ '--height': '44px' }}
        // onBack={() => (isSearchPage ? router.replace('/rewards') : router.back())}
        backArrow={
          <LocaleLink href="/rewards">
            <BackIcon />
          </LocaleLink>
        }>
        {isFlashSale ? (
          <Space direction="horizontal" align="center" style={{ '--gap-horizontal': '4px' }}>
            {isFlashSale ? <Image src="/static/icons/rewards/FlashSale.svg" alt="icon" height={24} width={24} /> : null}
            <span className="text-neutral-90 desktop:text-2xl text-lg font-bold uppercase">{t('flashSale')}</span>
          </Space>
        ) : (
          <span className="text-neutral-90 desktop:text-2xl text-lg font-bold">
            {(session && session.name[lang as keyof LocaleContent]) || t('rewards')}
          </span>
        )}
      </NavBar>
      {children}
    </div>
  );
}
