'use client';

import { Toast } from 'antd-mobile';
import useTranslation from 'next-translate/useTranslation';
import { CopyIcon } from './icons/Copy';

export default function TextCoppier({ title, value }: { value: string; title: string }) {
  const { t } = useTranslation('rewards');
  return (
    <>
      <div className="border-neutral-30 flex w-full items-center justify-between rounded border px-4 py-2">
        <div className="flex flex-col gap-1">
          <p className="text-neutral-70 leading-4">{title}</p>
          <p className="text-neutral-90 font-semibold leading-6">{value}</p>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            Toast.show({
              content: t('myReward.coppied'),
              position: 'bottom',
            });
            navigator.clipboard.writeText(value);
          }}>
          <CopyIcon />
        </div>
      </div>
    </>
  );
}
