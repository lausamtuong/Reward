import { QueryClientProvider } from '@ahm/api-wrappers';
import { cn } from '@ahm/common-helpers';
import { Button, Dialog } from 'antd-mobile';
import { CloseIcon } from './icons';
import MyRewardDetail from './MyRewardDetail';

type Props = {
  onClose?: () => void;
  isMobile: boolean;
  id: number;
  isUsed?: boolean;
};

export default function MyRewardDetailModal({ onClose, isMobile, id, isUsed }: Props) {
  return Dialog.show({
    className: 'adm-dialog-headless adm-dialog-custom-mobile overflow-scroll',
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
        <MyRewardDetail className="!rounded-none" id={id} isUsed={isUsed} />
      </QueryClientProvider>
    ),
  });
}
