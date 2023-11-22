'use client';

import { cn } from '@ahm/common-helpers';
import { Ellipsis, JumboTabs, SideBar, Skeleton } from 'antd-mobile';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { useGetRewardCategories } from '@/api/rewards/useGetRewardCategories';
import { LocaleContent } from '@/api/types';
import { useProtocol } from '@/app/ProtocolProvider';
import LocaleLink from '@/components/LocaleLink';
import styles from './CategoryList.module.css';

type Props = {
  className?: string;
  direction?: 'horizontal' | 'vertical';
};

export default function CategoryList({ className, direction = 'horizontal' }: Props) {
  const { lang } = useTranslation('rewards');
  const { isAuthenticated } = useProtocol();

  const { data: categories, isLoading } = useGetRewardCategories(
    {
      offset: 0,
    },
    { enabled: isAuthenticated },
  );

  if (direction === 'vertical')
    return (
      <>
        {categories && categories.length > 0 ? (
          <div className={cn('overflow-y-auto overflow-x-hidden rounded-xl bg-white p-4', className)}>
            <SideBar style={{ '--item-border-radius': '0px', '--width': '100%', '--background-color': '#fff' }}>
              {categories.map((category, index) => (
                <SideBar.Item
                  className={cn('hover:bg-primary-10 rounded-lg !p-1 transition', styles.sidebar, {
                    'mb-1': index !== categories.length - 1,
                  })}
                  key={category.id}
                  title={
                    <LocaleLink
                      href={category.link}
                      className="flex w-full flex-row items-center justify-start gap-3 rounded-lg p-1">
                      <Image
                        src={category.icon || '/static/icons/AhamoveCat.svg'}
                        width={32}
                        height={32}
                        alt={category.name[lang as keyof LocaleContent]}
                        className="flex-none rounded-3xl"
                      />
                      <span className="text-neutral-90 grow text-xs font-semibold">
                        {category.name[lang as keyof LocaleContent]}
                      </span>
                    </LocaleLink>
                  }
                />
              ))}
            </SideBar>
          </div>
        ) : isLoading ? (
          <div className={cn('min-h-[652px] overflow-y-auto overflow-x-hidden rounded-xl bg-white p-4', className)}>
            <SideBar style={{ '--item-border-radius': '0px', '--width': '100%', '--background-color': '#fff' }}>
              {Array.from(Array(3).keys()).map((item, index) => (
                <SideBar.Item
                  className="mb-1 !p-1 last:mb-0"
                  key={index}
                  title={
                    <div className="flex w-full flex-row items-center justify-start gap-3 rounded-lg p-1">
                      <Skeleton style={{ '--border-radius': '20px', '--width': '32px', '--height': '32px' }} animated />
                      <Skeleton style={{ '--width': '80px', '--height': '12px' }} animated />
                    </div>
                  }
                />
              ))}
            </SideBar>
          </div>
        ) : null}
      </>
    );

  return (
    <>
      {categories && categories.length > 0 ? (
        <div className={cn('w-full bg-white py-1', className)}>
          <JumboTabs className={styles.jumbo}>
            {categories.map((category) => (
              <JumboTabs.Tab
                key={category.id}
                title={
                  <LocaleLink href={category.link} className="block space-y-1">
                    <Image
                      className="mx-auto"
                      alt={category.name[lang as keyof LocaleContent]}
                      src={category.icon || '/static/icons/AhamoveCat.svg'}
                      height={40}
                      width={40}
                    />
                    <Ellipsis
                      className="text-neutral-90 w-16 whitespace-pre-line text-center text-xs font-semibold"
                      content={category.name[lang as keyof LocaleContent]}
                      rows={2}
                      direction="end"
                    />
                  </LocaleLink>
                }
                description=""
              />
            ))}
          </JumboTabs>
        </div>
      ) : isLoading ? (
        <div className={cn('w-full bg-white py-1', className)}>
          <JumboTabs className={styles.jumbo}>
            {Array.from(Array(9).keys()).map((item, index) => (
              <JumboTabs.Tab
                key={index}
                title={
                  <div className="block min-h-[80px] space-y-1">
                    <Skeleton
                      className="mx-auto"
                      style={{ '--border-radius': '30px', '--width': '40px', '--height': '40px' }}
                      animated
                    />
                    <Skeleton style={{ '--width': '64px', '--height': '16px' }} animated />
                  </div>
                }
                description=""
              />
            ))}
          </JumboTabs>
        </div>
      ) : null}
    </>
  );
}
