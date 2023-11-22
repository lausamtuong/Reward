import { useIsMobile } from '@ahm/ui';
import { Button, Dialog, NavBar, PullToRefresh, Tabs } from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep';
import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { useGetMyReward } from '@/api/rewards/useGetMyReward';
import { useProtocol } from '@/app/ProtocolProvider';
import { CloseIcon } from './icons';
import MyRewardListing from '../my-rewards/MyRewardListing';

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

enum TabName {
  ACTIVE = 'ACTIVE',
  USED = 'USED',
}

export default function MyRewardModal({ visible, setVisible }: Props) {
  const { t } = useTranslation('rewards');
  const isMobile = useIsMobile();

  const {
    data: activeRewards,
    isLoading,
    refetch,
    isFetching,
  } = useGetMyReward({ is_used: false }, { enabled: false });

  const {
    data: usedRewards,
    isLoading: isLoadingUsed,
    refetch: refetchUsed,
    isFetching: isFetchingUsed,
  } = useGetMyReward({ is_used: true }, { enabled: false });

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
      await refetchUsed();
    };

    if (visible) {
      fetchData();
      return;
    }
  }, [visible]);

  return (
    visible && (
      <Dialog
        visible={visible}
        className="adm-dialog-my-reward"
        title={
          <>
            <NavBar
              style={{
                '--height': isMobile ? '44px' : '56px',
                '--border-bottom': isMobile ? '1px solid #e8edf1' : 'none',
              }}
              backArrow={isMobile ? <CloseIcon /> : false}
              onBack={() => (isMobile ? setVisible(false) : {})}
              back={isMobile ? undefined : <span className="text-neutral-90 text-lg font-bold">{t('myRewards')}</span>}
              right={
                isMobile ? undefined : (
                  <Button
                    style={{ '--border-radius': '24px' }}
                    className="!-mr-1 ml-auto !h-10 !w-10 border-none !p-2"
                    fill="none"
                    onClick={() => setVisible(false)}>
                    <CloseIcon />
                  </Button>
                )
              }>
              {isMobile ? <span className="text-neutral-90 text-lg font-bold">{t('myRewards')}</span> : undefined}
            </NavBar>
          </>
        }
        content={
          <Tabs
            defaultActiveKey={TabName.ACTIVE}
            className="adm-tabs-custom"
            style={{
              '--content-padding': '12px 0px',
            }}>
            <Tabs.Tab title={t('myReward.active')} key={TabName.ACTIVE}>
              <PullToRefresh
                onRefresh={async () => {
                  await sleep(1000);
                  refetch();
                }}
                completeText={''}
                canReleaseText={t('release_to_reload')}>
                <MyRewardListing
                  isUsed={false}
                  data={activeRewards || []}
                  isLoading={isLoading || isFetching}
                  onExploreRewards={() => {
                    setVisible(false);
                  }}
                />
              </PullToRefresh>
            </Tabs.Tab>
            <Tabs.Tab title={t('myReward.invalid')} key={TabName.USED}>
              <PullToRefresh
                onRefresh={async () => {
                  await sleep(1000);
                  refetchUsed();
                }}
                completeText={''}
                canReleaseText={t('release_to_reload')}>
                <MyRewardListing
                  isUsed={true}
                  data={usedRewards || []}
                  isLoading={isLoadingUsed || isFetchingUsed}
                  onExploreRewards={() => {
                    setVisible(false);
                  }}
                />
              </PullToRefresh>
            </Tabs.Tab>
          </Tabs>
        }
      />
    )
  );
}
