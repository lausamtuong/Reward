'use client';

import { cn } from '@ahm/common-helpers';
import { useIsMobile } from '@ahm/ui';
import { Button, Card, CardProps, Collapse, Ellipsis, Space } from 'antd-mobile';
import { Image as AntImage } from 'antd-mobile';
import { SpinLoading } from 'antd-mobile';
import dayjs from 'dayjs';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { RewardPolicyType } from '@/api/rewards/types';
import { useGetMyRewardDetail } from '@/api/rewards/useGetMyRewardDetail';
import { LocaleContent } from '@/api/types';
import { useProtocol } from '@/app/ProtocolProvider';
import { OrderType } from '@/lib/constants';
import { getBrandName, navigateBooking } from '@/lib/helper';
import TextCoppier from './TextCopier';
import { handleUseReward } from '@/lib/helper';

type Props = CardProps & {
  id: number;
  isUsed?: boolean;
};

const UrboxQrCard: React.FC<{ imgUrl: string }> = ({ imgUrl }) => {
  const { t } = useTranslation('rewards');
  return (
    <div className="mt-1 bg-white p-4">
      <div className="flex flex-col">
        <div className="text-base font-bold ">{t('myReward.code')}</div>
        <div className="desktop:hidden text-sm font-medium">{t('myReward.code_instruction')}</div>
        <div className="mt-3 flex flex-col items-center gap-3">
          <AntImage alt="demo" src={`${imgUrl}`} />
        </div>
      </div>
    </div>
  );
};

const PageDivider: React.FC = () => {
  return <div className={'h-1 w-full'} style={{ background: '#F2F4F8' }}></div>;
};

export default function MyRewardDetail({ id, className, isUsed, ...cardProps }: Props) {
  const { data: myReward, isLoading } = useGetMyRewardDetail({ id: id }, { enabled: !!id });
  const { t, lang } = useTranslation('rewards');
  const isMobile = useIsMobile();
  const { isEmbed } = useProtocol();
  const visible =
    myReward &&
    myReward.reward_policy &&
    (myReward.reward_policy.type === RewardPolicyType.AHAMOVE ||
      ((myReward.reward_policy.type === RewardPolicyType.URBOX ||
        myReward.reward_policy.type === RewardPolicyType.MERCHANT) &&
        myReward.reward_policy.link_voucher));

  return (
    <>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <SpinLoading />
        </div>
      ) : (
        <Card
          className={cn(
            '!bg-neutral-10 m-auto !my-auto h-full !max-w-xl overflow-auto !rounded-none !p-0 !pb-28',
            className,
          )}
          {...cardProps}>
          <Image
            className="!h-[248px] w-full object-cover"
            src={
              myReward?.reward_policy?.image_url && /^(https?:\/\/)/i.test(myReward?.reward_policy?.image_url)
                ? myReward?.reward_policy?.image_url
                : '/static/images/rewards.webp'
            }
            alt="image"
            width={440}
            height={248}
          />

          <div className="mb-1 space-y-1 bg-white px-4 py-3">
            <p className="text-xxs font-medium capitalize text-neutral-50">{getBrandName(myReward?.reward_policy)}</p>
            <Ellipsis
              className="text-neutral-90 text-lg font-semibold leading-6"
              direction="end"
              content={myReward?.reward_policy?.title[lang as keyof LocaleContent] || ''}
              rows={4}
            />
            <Space className="w-full text-xs font-medium text-neutral-50">
              <Image src={`/static/images/rewards/clock.png`} width={13} height={13} alt="coin" />
              <span>
                {t('expiredAt')} {dayjs(myReward?.valid_time).format('hh:mm DD/MM/YYYY ')}
              </span>
            </Space>
          </div>

          {(myReward?.reward_policy?.type == RewardPolicyType.AHAMOVE ||
            myReward?.reward_policy?.type == RewardPolicyType.MERCHANT) && (
            <>
              <div className="flex w-full flex-col gap-4 bg-white p-4">
                {myReward?.promo_code && <TextCoppier value={myReward?.promo_code} title="Mã thanh toán" />}
              </div>

              <div className="mb-8 mt-1 bg-white px-4 py-3">
                <h3 className="mb-3 text-lg font-semibold">{t('aboutThisVoucher')}</h3>
                <div
                  className="prose prose-sm prose-p:my-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      myReward?.reward_policy?.description &&
                      myReward?.reward_policy?.description[lang as keyof LocaleContent],
                  }}></div>
              </div>
            </>
          )}

          {myReward?.reward_policy?.type == RewardPolicyType.URBOX && (
            <>
              <div className="desktop:flex bg-white">
                {myReward?.urbox_transaction?.response?.cart?.code_link_gift[0]?.code_image && (
                  <div className="basis-full">
                    <UrboxQrCard imgUrl={myReward?.urbox_transaction?.response?.cart?.code_link_gift[0]?.code_image} />
                  </div>
                )}
                <div className="flex w-full basis-full flex-col justify-center gap-4 p-4">
                  {myReward?.urbox_transaction?.response?.cart?.code_link_gift[0]?.code && (
                    <TextCoppier
                      value={myReward?.urbox_transaction?.response?.cart?.code_link_gift[0]?.code}
                      title={t('myReward.code')}
                    />
                  )}
                  {myReward?.urbox_transaction?.response?.cart?.code_link_gift[0]?.pin && (
                    <TextCoppier
                      value={myReward?.urbox_transaction?.response?.cart?.code_link_gift[0]?.pin}
                      title={t('myReward.pin')}
                    />
                  )}
                  {myReward?.urbox_transaction?.response?.cart?.code_link_gift[0]?.serial && (
                    <TextCoppier
                      value={myReward?.urbox_transaction?.response?.cart?.code_link_gift[0]?.serial}
                      title={t('myReward.serial')}
                    />
                  )}
                </div>
              </div>

              {myReward.reward_policy?.extra?.note ? (
                <Collapse className="adm-collapse-custom" defaultActiveKey={['1']}>
                  <Collapse.Panel
                    key="1"
                    title={<h3 className="text-lg font-semibold">{t('myReward.term_condition')}</h3>}>
                    <div
                      className="prose prose-sm prose-p:my-2"
                      dangerouslySetInnerHTML={{
                        __html: myReward.reward_policy?.extra?.note,
                      }}></div>
                  </Collapse.Panel>
                </Collapse>
              ) : null}

              {myReward.reward_policy?.extra?.office ? (
                <Collapse className="adm-collapse-custom" defaultActiveKey={['1']}>
                  <Collapse.Panel key="1" title={<h3 className="text-lg font-semibold">{t('myReward.office')}</h3>}>
                    <div className="prose prose-sm prose-p:my-2">
                      <ul>
                        {myReward.reward_policy?.extra?.office &&
                          myReward.reward_policy?.extra?.office.map((item) => <li>{item.address}</li>)}
                      </ul>
                    </div>
                  </Collapse.Panel>
                </Collapse>
              ) : null}
            </>
          )}

          {visible && !isUsed && (
            <div
              className={cn('shadow-button-dock inset-x-0 bottom-0 z-20 space-y-3 bg-white px-4 pb-4 pt-3', {
                fixed: isMobile,
                'absolute rounded-b-lg': !isMobile,
              })}>
              <Button
                onClick={() => {
                  if (myReward.reward_policy)
                    handleUseReward({
                      promoCode: myReward.promo_code,
                      reward: myReward.reward_policy,
                      isMobile,
                      isEmbed,
                    });
                }}
                fill="solid"
                color="primary"
                size="large"
                block
                className="!font-semibold">
                {t('myReward.useNow')}
              </Button>
            </div>
          )}
        </Card>
      )}
    </>
  );
}
