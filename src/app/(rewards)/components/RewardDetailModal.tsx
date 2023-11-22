import { QueryClientProvider } from '@ahm/api-wrappers';
import { cn } from '@ahm/common-helpers';
import { Button, Dialog } from 'antd-mobile';
import { Reward } from '@/api/rewards/types';
import { CloseIcon } from './icons';
import RewardDetail from './RewardDetail';

type Props = {
  data: Reward;
  isMobile?: boolean;
  onClose?: () => void;
};

export default function RewardDetailModal({ data, isMobile, onClose }: Props) {
  if (!data) return null;

  return Dialog.show({
    className: 'adm-dialog-headless adm-dialog-custom-mobile',
    title: (
      <Button
        className={cn('shadow-button-close !absolute top-2 z-10 !h-10 !w-10 border-none !p-2 hover:shadow-lg', {
          'left-2': isMobile,
          'right-2': !isMobile,
        })}
        fill="solid"
        shape="rounded"
        onClick={() => {
          Dialog.clear();
          onClose && onClose();
        }}>
        <CloseIcon />
      </Button>
    ),
    content: (
      <QueryClientProvider disableDevTools>
        <RewardDetail className="!rounded-none" data={data} />
      </QueryClientProvider>
    ),
  });
}
