'use client';

import { cn, formatNumber } from '@ahm/common-helpers';
import { ProgressBar, Skeleton } from 'antd-mobile';
import Image from 'next/image';
import useTranslations from 'next-translate/useTranslation';
import { useGetRankingConfig } from '@/api/rewards/useGetRankingConfig';
import { useProtocol } from '@/app/ProtocolProvider';
import { RankName } from './type';

type Props = {
  rankName: string;
  score: number;
  nextIcon: string;
  nextLevel: string;
  className?: string;
};

export default function RankingProgress({ rankName, score, nextIcon, nextLevel, className }: Props) {
  const { t } = useTranslations('membership');
  const { isAuthenticated } = useProtocol();
  const { data: rankConfigs, isLoading } = useGetRankingConfig({ offset: 0 }, { enabled: isAuthenticated });

  if (rankConfigs && rankConfigs.length > 0) {
    const maxValue = rankConfigs.find((item) => item.name === rankName)?.max_value || 0;
    const minValue = rankConfigs.find((item) => item.name === rankName)?.min_value || 0;
    return (
      rankName !== RankName.DIAMOND && (
        <div className={cn(className)}>
          <div className="flex w-full gap-x-0.5">
            <ProgressBar
              className="w-11/12 flex-1"
              percent={(score / (maxValue - minValue)) * 100}
              style={{
                '--track-width': '4px',
                '--fill-color': '#fff',
                '--track-color': 'rgba(221, 225, 230, 0.7)',
              }}
            />
            <Image className="flex-none" alt="gold" src={nextIcon} width={24} height={24} />
          </div>
          <p className="text-xs">
            {t('upgrade_level_message', { points: formatNumber(maxValue - score + 1) })} {t(nextLevel)}
          </p>
        </div>
      )
    );
  }
  if (isLoading) {
    return (
      <div className={cn('space-y-3', className)}>
        <Skeleton animated style={{ '--width': '95%', '--height': '16px', '--border-radius': '12px' }} />
        <Skeleton animated style={{ '--width': '75%', '--height': '16px', '--border-radius': '12px' }} />
      </div>
    );
  }
  return <></>;
}
