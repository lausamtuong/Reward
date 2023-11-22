'use client';

import { cn } from '@ahm/common-helpers';
import { KeenSliderOptions } from 'keen-slider';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useMemo } from 'react';
import { FilterFlashsaleTime, RewardListingType } from '@/api/rewards/types';
import { useGetReward } from '@/api/rewards/useGetReward';
import { useProtocol } from '@/app/ProtocolProvider';
import SessionFeatureWrapper from './SessionFeatureWrapper';
import RewardCard from '../../components/RewardCard';
import RewardCardSkeleton from '../../components/RewardCardSkeleton';
import 'keen-slider/keen-slider.min.css';

export default function FlashSaleFeature() {
  const { isAuthenticated } = useProtocol();
  const { data: rewards, isLoading } = useGetReward(
    {
      offset: 0,
      limit: 10,
      type: RewardListingType.FLASHSALE_ONLY,
      in_stock: false,
      filter_flashsale_time: FilterFlashsaleTime.IN_FLASHSALE_TIME,
    },
    { enabled: isAuthenticated },
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

  return (
    <SessionFeatureWrapper title="FLASH SALE" isFlashSale isLoading={isLoading} viewAllUrl={`/rewards/flashsale`}>
      {rewards && rewards.length > 0 ? (
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
      ) : isLoading ? (
        <div ref={ref} className="keen-slider -mx-4 -mb-4 mt-2 !w-[calc(100%+32px)]">
          {Array.from(Array(3).keys()).map((item, index) => (
            <div
              className={cn('keen-slider__slide w-full pb-4', {
                'min-w-[calc(277px+16px)] max-w-[calc(277px+16px)] pr-4': true,
                'min-w-[calc(277px+16px+16px)] max-w-[calc(277px+16px+16px)] pl-4': index === 0,
              })}
              key={index}>
              <RewardCardSkeleton isFlashSale />
            </div>
          ))}
        </div>
      ) : null}
    </SessionFeatureWrapper>
  );
}
