'use client';

import { Skeleton, Swiper, SwiperProps } from 'antd-mobile';
import { useGetRewardBanner } from '@/api/rewards/useGetRewardBanner';
import { useProtocol } from '@/app/ProtocolProvider';

type Props = SwiperProps & {
  className?: string;
};

export default function HomeBanner({ className, ...props }: Props) {
  const { isAuthenticated } = useProtocol();
  const { data: banners, isLoading } = useGetRewardBanner(
    {
      offset: 0,
      limit: 10,
    },
    { enabled: isAuthenticated },
  );

  return (
    <>
      {banners && banners.length > 0 ? (
        <Swiper style={{ '--border-radius': '12px' }} className={className} {...props}>
          {banners.map((item) => (
            <Swiper.Item
              key={item.id}
              onClick={() => window.open(item.url)}
              // eslint-disable-next-line prettier/prettier
              style={{
                backgroundImage: `url(${
                  /^(https?:\/\/)/i.test(item.img_url) ? item.img_url : '/static/images/rewards.webp'
                })`,
              }}
              className="aspect-[21/9] bg-cover bg-left-top bg-no-repeat"
            />
          ))}
        </Swiper>
      ) : isLoading ? (
        <div className={className}>
          <Skeleton
            className="aspect-[21/9]"
            style={{ '--border-radius': '12px', '--width': '100%', '--height': 'auto' }}
            animated
          />
        </div>
      ) : (
        <div className={className}>
          <div
            className="aspect-[21/9] h-auto w-full rounded-xl bg-cover bg-left-top bg-no-repeat"
            style={{
              backgroundImage: `url(/static/images/rewards.webp)`,
            }}></div>
        </div>
      )}
    </>
  );
}
