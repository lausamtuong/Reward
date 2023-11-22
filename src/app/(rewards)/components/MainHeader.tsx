'use client';

import { color } from '@ahamove/design-tokens';
import { cn, JSFunction } from '@ahm/common-helpers';
import { useIsMobile } from '@ahm/ui';
import { NavBar } from 'antd-mobile';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useMemo, useState } from 'react';
import { useGetRewardUserProfile } from '@/api/rewards/useGetRewardUserProfile';
import { useProtocol } from '@/app/ProtocolProvider';
import LocaleLink from '@/components/LocaleLink';
import { BackIcon } from './icons';
import { membershipStyle } from './Membership/type';
import MyRewardBtn from './MyRewardBtn';

type Props = {
  root?: boolean;
  pathTitle?: string;
  className?: string;
};

export default function MainHeader({ root, pathTitle = 'rewards', className }: Props) {
  const { t, lang } = useTranslation('rewards');
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const { isEmbed, isAuthenticated } = useProtocol();
  const { data: userProfile } = useGetRewardUserProfile({ enabled: isAuthenticated });

  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const headerColorByRank = useMemo(() => {
    const targetRank = membershipStyle.find((item) => item.rank === userProfile?.rank);
    return targetRank ? targetRank.color : membershipStyle[0].color;
  }, [userProfile]);

  const formattedPathName = useMemo(() => {
    const localePath = `/${lang}`;
    if (pathname.includes(localePath)) {
      return pathname.slice(localePath.length);
    }

    return pathname;
  }, [pathname, lang]);

  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 28) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const HeaderTitle = () => (
    <LocaleLink href={`/${pathTitle}`} className="block">
      <h1
        style={{
          color: isMobile ? color.neutral['00'] : color.neutral[90],
        }}
        className={cn('desktop:text-2xl text-xl font-bold leading-6', {
          'drop-shadow-xl': scrolled || !isMobile,
        })}>
        {t(pathTitle)}
      </h1>
    </LocaleLink>
  );

  const HeaderAction = () => {
    if (!isMobile) return false;

    // if (root && isEmbed) {
    //   return <CloseIcon className="mr-3" fill={isMobile ? color.neutral['00'] : color.neutral[90]} />;
    // }

    return <BackIcon className="mr-3" fill={isMobile ? color.neutral['00'] : color.neutral[90]} />;
  };

  const handleBack = async () => {
    const isExistHistoryState = from && ['rewards', 'membership'].includes(from);
    if (isMobile) {
      if (isEmbed) {
        if (isExistHistoryState) {
          router.back();
          return;
        }

        JSFunction.closeWebview();
      } else {
        if (isExistHistoryState) {
          router.back();
          return;
        }

        const postRobot = await import('post-robot');
        await postRobot.send(window.parent, 'CLOSE_GADGET');
      }
    }
  };

  return (
    <NavBar
      back={isMobile && !root ? undefined : <HeaderTitle />}
      backArrow={<HeaderAction />}
      onBack={handleBack}
      style={{
        '--height': isMobile ? '44px' : '64px',
        backgroundColor: isMobile ? (scrolled ? headerColorByRank : 'transparent') : color.neutral['00'],
      }}
      className={cn(
        'desktop:!px-6 desktop:sticky text-neutral-90 desktop:text-white fixed top-0 z-20 w-full !px-4 transition-all',
        className,
        {
          'shadow-md': scrolled || !isMobile,
          '!text-white': !scrolled && isMobile,
        },
      )}
      right={!['/rewards/my-rewards', '/membership'].includes(formattedPathName) ? <MyRewardBtn /> : null}>
      {isMobile && !root ? <HeaderTitle /> : undefined}
    </NavBar>
  );
}
