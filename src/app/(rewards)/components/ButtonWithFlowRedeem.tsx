'use client';

import { QueryClientProvider } from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import { formatNumber } from '@ahm/common-helpers';
import { useIsMobile } from '@ahm/ui';
import { Button, ButtonProps, Dialog, Modal, Space } from 'antd-mobile';
import dayjs from 'dayjs';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { MyReward } from '@/api/rewards/types';
import { useGetStartVoucherById } from '@/api/rewards/useGetStatsVoucherById';
import { DefaultOpsTechResponse } from '@/api/types';
import { RightArrowIcon } from './icons';
import MyRewardDetailModal from './MyRewardDetailModal';
import MyRewardModal from './MyRewardModal';
import RedeemModalContent from './RedeemModalContent';

type Props = ButtonProps & {
  idVoucher: number;
  point: number;
  className: string;
  isOutOfStock?: boolean;
  isDetail?: boolean;
};

export default function ButtonWithFlowRedeem({
  idVoucher,
  point,
  className,
  isOutOfStock,
  isDetail = false,
  ...props
}: Props) {
  const { t } = useTranslation('rewards');
  const isMobile = useIsMobile();
  const [openMyRewardsModal, setOpenMyRewardsModal] = useState(false);
  const { data: stats, refetch } = useGetStartVoucherById(idVoucher, { enabled: !!isDetail });

  const onRedeemSuccess = (response: DefaultOpsTechResponse<MyReward>) => {
    Modal.clear();
    Modal.show({
      className: 'adm-dialog-headless adm-modal-confirm',
      content: (
        <>
          <div className="space-y-3">
            <Image src="/static/images/rewards/redeem-success.png" alt="success" width={80} height={80} />
            <h2 className="text-neutral-90 text-lg font-bold">{t('redeem.redeemSuccess')}</h2>
            <p className="text-neutral-60 text-sm font-medium">
              {t('redeem.valid_until')} {dayjs(response.data.valid_time).format('hh:mm DD/MM/YYYY ')}
            </p>
          </div>
          <div className="mt-4 flex flex-row flex-nowrap gap-3">
            <Button
              block
              fill="solid"
              color="default"
              size="large"
              className="!text-secondary-70 !bg-neutral-15 hover:!bg-neutral-20 !font-semibold"
              onClick={() => handleRedeemSuccess(response.data.id)}>
              {t('redeem.viewReward')}
            </Button>
            <Button
              className="!font-semibold"
              block
              fill="solid"
              color="primary"
              size="large"
              onClick={() => handleRedeemSuccess()}>
              Ok
            </Button>
          </div>
        </>
      ),
    });
    refetch();
  };
  const onRedeemError = (e: DefaultQueryError) => {
    Modal.clear();
    const errorData = e && e.response && e.response.data;
    Modal.show({
      className: 'adm-modal-confirm',
      content: (
        <>
          <div className="space-y-3">
            <h2 className="text-neutral-90 text-lg font-bold">{t('redeem.redeemFail')}</h2>
            <p className="text-neutral-60 text-sm font-medium">{errorData?.message || t('redeem.redeemFail')}</p>
          </div>
          <div className="mt-4 flex flex-row flex-nowrap gap-3">
            <Button
              className="!font-semibold"
              block
              fill="solid"
              color="primary"
              size="large"
              onClick={() => handleRedeemSuccess()}>
              {t('redeem.close')}
            </Button>
          </div>
        </>
      ),
    });
  };

  const handleRedeemSuccess = (id?: number) => {
    Modal.clear();
    if (id) {
      Dialog.clear();
      MyRewardDetailModal({ id, isMobile });
    }
  };

  return (
    <>
      {stats && stats.active_count > 0 && isDetail ? (
        <Space
          direction="horizontal"
          align="center"
          justify="between"
          className="w-full"
          style={{ '--gap-horizontal': '4px' }}>
          <Space direction="horizontal" align="center" style={{ '--gap-horizontal': '4px' }}>
            <Image src="/static/icons/rewards/Voucher.svg" width={16} height={16} alt="Voucher" />
            <span className="text-neutral-90 text-xs font-semibold">
              {t('redeem.you_already_have_this_voucher', { voucher: formatNumber(stats?.active_count) })}
            </span>
          </Space>
          <Button
            onClick={() => setOpenMyRewardsModal(true)}
            fill="none"
            size="mini"
            color="primary"
            className="!pr-0 font-semibold">
            <Space direction="horizontal" align="center" style={{ '--gap': '2px' }}>
              <span>{t('redeem.seeNow')}</span>
              <RightArrowIcon />
            </Space>
          </Button>
        </Space>
      ) : null}
      <Button
        className={className}
        {...props}
        onClick={(e) => {
          e.stopPropagation();
          Modal.show({
            className: 'adm-modal-confirm',
            content: (
              <QueryClientProvider disableDevTools>
                <RedeemModalContent
                  idVoucher={idVoucher}
                  point={point}
                  isOutOfStock={isOutOfStock}
                  onSuccess={onRedeemSuccess}
                  onError={onRedeemError}
                />
              </QueryClientProvider>
            ),
          });
        }}>
        {stats && stats.active_count > 0 && isDetail && !isOutOfStock
          ? t('redeem.get_more_voucher')
          : isOutOfStock
          ? t('flash_sale.outOfStock')
          : t('redeemNow')}
      </Button>
      <MyRewardModal visible={openMyRewardsModal} setVisible={setOpenMyRewardsModal} />
    </>
  );
}
