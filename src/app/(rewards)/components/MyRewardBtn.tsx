import { color } from '@ahamove/design-tokens';
import { useIsMobile } from '@ahm/ui';
import { Button, Space } from 'antd-mobile';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { PresentIcon } from './icons';
import MyRewardModal from './MyRewardModal';

export default function MyRewardBtn() {
  const { t } = useTranslation('rewards');
  const isMobile = useIsMobile();
  const [openMyRewardsModal, setOpenMyRewardsModal] = useState(false);

  const handleShowMyReward = () => {
    setOpenMyRewardsModal(true);
  };

  return (
    <>
      <Button
        fill="solid"
        className="desktop:shadow-none desktop:hover:shadow-sm shadow-sm"
        onClick={handleShowMyReward}
        style={{
          '--text-color': isMobile ? color.neutral[70] : color.primary[50],
          backgroundColor: isMobile ? color.neutral['00'] : color.primary[10],
          '--border-color': isMobile ? color.neutral['00'] : color.primary[10],
          '--border-radius': '200px',
          height: '32px',
          padding: '8px 16px',
          fontSize: '10px',
          lineHeight: '16px',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}>
        <Space>
          <PresentIcon fill={isMobile ? color.neutral[70] : color.primary[50]} />
          <span>{t('myRewards')}</span>
        </Space>
      </Button>
      <MyRewardModal visible={openMyRewardsModal} setVisible={setOpenMyRewardsModal} />
    </>
  );
}
