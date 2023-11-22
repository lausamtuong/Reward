'use client';

import { cn } from '@ahm/common-helpers';
import 'keen-slider/keen-slider.min.css';
import { KeenSliderOptions, useKeenSlider } from 'keen-slider/react';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useMemo } from 'react';
import { RewardListingType } from '@/api/rewards/types';
import { useGetReward } from '@/api/rewards/useGetReward';
import { RewardSession } from '@/api/rewards/useGetRewardSession';
import { LocaleContent } from '@/api/types';
import { useProtocol } from '@/app/ProtocolProvider';
import SessionFeatureWrapper from './SessionFeatureWrapper';
import RewardCard from '../../components/RewardCard';
import RewardCardSkeleton from '../../components/RewardCardSkeleton';

type Props = {
  session: RewardSession;
};

export default function SessionFeatureItem({ session }: Props) {
  const { lang } = useTranslation('rewards');
  const { isAuthenticated } = useProtocol();
  const { data: rewards, isLoading } = useGetReward(
    {
      offset: 0,
      limit: 10,
      session_id: session.id,
      type: RewardListingType.VOUCHER_NOT_FLASHSALE,
    },
    { enabled: isAuthenticated && !!session.id },
  );

  const sliderOptions: KeenSliderOptions = useMemo(
    () => ({
      mode: 'free',
      slides: { origin: 'auto', perView: 'auto', spacing: 0 },
    }),
    [],
  );

  const [ref, slider] = useKeenSlider<HTMLDivElement>(sliderOptions);

  useEffect(() => {
    if (rewards && rewards.length > 0 && !isLoading) {
      slider.current?.update({
        ...sliderOptions,
      });
    }
  }, [slider, sliderOptions, rewards, isLoading]);

  if (!session) return <></>;

  return rewards && rewards.length > 0 ? (
    <SessionFeatureWrapper
      title={session.name[lang as keyof LocaleContent]}
      isLoading={isLoading}
      viewAllUrl={`/rewards/s/${session.id}`}>
      <div ref={ref} className="keen-slider -mx-4 -mb-4 mt-2 !w-[calc(100%+32px)]">
        {rewards.map((item, index) => {
          return (
            <div
              className={cn('keen-slider__slide w-full pb-4', {
                'min-w-[calc(277px+16px)] max-w-[calc(277px+16px)] pr-4': item.is_flashsale,
                'min-w-[calc(240px+16px)] max-w-[calc(240px+16px)] pr-4': !item.is_flashsale,
                'min-w-[calc(277px+16px+16px)] max-w-[calc(277px+16px+16px)] pl-4': item.is_flashsale && index === 0,
                'min-w-[calc(240px+16px+16px)] max-w-[calc(240px+16px+16px)] pl-4': !item.is_flashsale && index === 0,
              })}
              key={item.id}>
              <RewardCard modalOnly {...item} />
            </div>
          );
        })}
      </div>
    </SessionFeatureWrapper>
  ) : isLoading ? (
    <SessionFeatureWrapper
      title={session.name[lang as keyof LocaleContent]}
      isLoading={isLoading}
      viewAllUrl={`/rewards/s/${session.id}`}>
      <div ref={ref} className="keen-slider -mx-4 -mb-4 mt-2 !w-[calc(100%+32px)]">
        {Array.from(Array(3).keys()).map((item, index) => (
          <div
            className={cn('keen-slider__slide w-full pb-4', {
              'min-w-[calc(240px+16px)] max-w-[calc(240px+16px)] pr-4': true,
              'min-w-[calc(240px+16px+16px)] max-w-[calc(240px+16px+16px)] pl-4': index === 0,
            })}
            key={index}>
            <RewardCardSkeleton />
          </div>
        ))}
      </div>
    </SessionFeatureWrapper>
  ) : null;
}
