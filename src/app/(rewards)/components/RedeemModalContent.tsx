import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import { formatNumber } from '@ahm/common-helpers';
import { Button, Modal, Space } from 'antd-mobile';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { MyReward } from '@/api/rewards/types';
import { useRedeemReward } from '@/api/rewards/useRedeemReward';
import { DefaultOpsTechResponse } from '@/api/types';

type Props = {
  point: number;
  isOutOfStock?: boolean;
  idVoucher: number;
  onSuccess: (response: DefaultOpsTechResponse<MyReward>) => void;
  onError: (e: DefaultQueryError) => void;
};

export default function RedeemModalContent({ idVoucher, point, isOutOfStock, onSuccess, onError }: Props) {
  const { mutate: redeem, isLoading } = useRedeemReward();
  const { t } = useTranslation('rewards');

  const handleRedeem = () => {
    if (!idVoucher || isLoading) return;

    redeem(idVoucher, {
      onSuccess,
      onError,
    });
  };

  return (
    <>
      <div className="space-y-3">
        <h2 className="text-neutral-90 text-lg font-bold">{t('redeem.redeem')}</h2>
        <p className="text-neutral-60 text-sm font-medium">{t('redeem.messageConfirm')}</p>
        <Space className="!mt-1 w-full" style={{ '--gap': '2px' }}>
          <Image src={`/static/images/rewards/ahaxu.png`} width={16} height={16} alt="coin" />
          <p className="font-semibold">{formatNumber(point)} ?</p>
        </Space>
      </div>
      <div className="mt-4 flex flex-row flex-nowrap gap-3">
        <Button
          block
          disabled={isLoading}
          fill="solid"
          color="default"
          size="large"
          className="!text-secondary-70 !bg-neutral-15 hover:!bg-neutral-20 !font-semibold"
          onClick={() => Modal.clear()}>
          {t('redeem.notNow')}
        </Button>
        <Button
          className="!font-semibold"
          block
          disabled={isLoading}
          loading={isLoading}
          fill="solid"
          color="primary"
          size="large"
          onClick={handleRedeem}>
          {isOutOfStock ? t('flash_sale.outOfStock') : t('redeemNow')}
        </Button>
      </div>
    </>
  );
}
