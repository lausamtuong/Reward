import { Button, Image } from 'antd-mobile';
import LocaleLink from '@/components/LocaleLink';
interface IButton {
  title: string;
  action?: () => void;
  disabled?: boolean;
  ownVoucher?: number;
}
export default function ButtonBottom({ title, action, disabled, ownVoucher }: IButton) {
  return (
    <div
      className="desktop:pb-4 sticky bottom-0 flex w-full flex-col bg-white px-4 pt-4 shadow-lg "
      style={{ boxShadow: '6px 8px 28px 2px #9b9999' }}>
      {ownVoucher && (
        <div className="mb-3 flex h-5 items-center justify-between">
          <div className="flex items-center gap-1">
            <Image alt="voucherIcon" src="/static/icons/rewards/ownVoucher.svg" />
            <div className="text-[12px] leading-3 text-black">Bạn đang sở hữu {ownVoucher} voucher này</div>
          </div>
          <LocaleLink href="/rewards/my-rewards">
            <div className="flex h-5 items-center">
              <Button color="primary" size="small" fill="none" className="!px-0">
                Xem ngay
              </Button>
            </div>
            <Image
              alt="voucherIcon"
              src="/static/icons/rewards/iconRight.svg"
              className="mt-2"
              width={16}
              height={16}
            />
          </LocaleLink>
        </div>
      )}
      {disabled ? (
        <div className="bg-neutral-30 rounded-t-[4px] !px-0 !py-[14px] ">
          <p className="text-center text-[14px] font-bold leading-5 text-white">{title}</p>
        </div>
      ) : (
        <Button className=" !px-0 !py-[14px] font-bold" color="primary" fill="solid" size="large" onClick={action}>
          <p className="leading-6">{title}</p>
        </Button>
      )}
    </div>
  );
}
