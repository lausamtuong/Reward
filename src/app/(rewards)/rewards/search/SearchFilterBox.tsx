'use client';

import { cn } from '@ahm/common-helpers';
import { useIsMobile } from '@ahm/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CheckList, Dialog, NavBar, Space, SpinLoading } from 'antd-mobile';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { RewardListingPromoType, RewardListingSortBy, RewardListingType } from '@/api/rewards/types';
import { top3Categories, useGetRewardCategories } from '@/api/rewards/useGetRewardCategories';
import { LocaleContent } from '@/api/types';
import { useProtocol } from '@/app/ProtocolProvider';
import {
  CheckboxFilledIcon,
  CheckboxIcon,
  CloseIcon,
  DownArrowIcon,
  RadioFilledIcon,
  RadioIcon,
} from '../../components/icons';

const SearchFilterFormSchema = z.object({
  category_id: z.number().optional(),
  type: z.number().optional(),
  sort: z.number().optional(),
  session_id: z.number().optional(),
  is_redeemable: z.string().optional(),
  promo_type: z.number().optional(),
});

type SearchFilterFormSchemaType = z.infer<typeof SearchFilterFormSchema>;

type Props = {
  className?: string;
};

export default function SearchFilterBox({ className }: Props) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t, lang } = useTranslation('rewards');
  const categoryId = searchParams.get('category_id');
  const promoTypeId = searchParams.get('promo_type');
  const typeId = searchParams.get('type');
  const sortId = searchParams.get('sort');
  const isRedeemable = searchParams.get('is_redeemable');
  const [isChangedSearch, setIsChangedSearch] = useState<boolean>(false);
  const { isAuthenticated } = useProtocol();

  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm<SearchFilterFormSchemaType>({
    resolver: zodResolver(SearchFilterFormSchema),
    mode: 'onChange',
    defaultValues: {
      category_id: Number(categoryId),
      promo_type: Number(promoTypeId),
      type: Number(typeId),
      sort: Number(sortId),
      is_redeemable: isRedeemable || undefined,
    },
  });

  // const sortFormValue = watch('sort');
  // const categoryFormValue = watch('category_id');

  // const categoryValue = useMemo(() => {
  //   if (typeId && Number(typeId) === RewardListingType.ALL) {
  //     return -3;
  //   }

  //   if (typeId && Number(typeId) === RewardListingType.FLASHSALE_ONLY) {
  //     return -2;
  //   }

  //   if (promoTypeId && Number(promoTypeId) === RewardListingPromoType.AHAMOVE) {
  //     return -1;
  //   }
  //   return categoryId;
  // }, [categoryId, promoTypeId, typeId]);

  const [moreOptions, setMoreOptions] = useState<Array<string>>([]);

  useEffect(() => {
    if (typeId && Number(typeId) === RewardListingType.FLASHSALE_ONLY) {
      setMoreOptions((v) => [...v, 'is_flashsale']);
    }
    if (isRedeemable) {
      setMoreOptions((v) => [...v, 'is_redeemable']);
    }
  }, [typeId, isRedeemable]);

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const onSubmit: SubmitHandler<SearchFilterFormSchemaType> = (data) => {
    if (!isChangedSearch) return;
    const params = new URLSearchParams(searchParams as unknown as URLSearchParams);
    Object.keys(data).forEach((key: string) => {
      const value = data[key as keyof SearchFilterFormSchemaType];
      if (!value || value === undefined || value === 0 || value === 'false') {
        if (params.has(key)) params.delete(key);

        return;
      }

      params.set(key, String(value));
    });
    router.push(pathname + '?' + params.toString());
  };
  const { data: categories, isFetching } = useGetRewardCategories(
    {
      offset: 0,
    },
    { enabled: isAuthenticated },
  );

  const selectedCategory = useMemo(() => {
    if (!categories) return top3Categories[0];

    return categories.find((category) => {
      if (categoryId) return category.id === Number(categoryId);
      if (typeId && Number(typeId) === RewardListingType.ALL) {
        return category.id === -3;
      }

      if (typeId && Number(typeId) === RewardListingType.FLASHSALE_ONLY) {
        return category.id === -2;
      }

      if (promoTypeId && Number(promoTypeId) === RewardListingPromoType.AHAMOVE) {
        return category.id === -1;
      }

      return category.id === Number(categoryId);
    });
  }, [categories, categoryId, promoTypeId, typeId]);
  const resetValue = () => {
    typeId && setValue('type', Number(typeId));
    promoTypeId && setValue('promo_type', Number(promoTypeId));
    categoryId && setValue('category_id', Number(categoryId));
    sortId && setValue('sort', Number(sortId));
    isRedeemable && setValue('is_redeemable', String(isRedeemable));
    setMoreOptions([
      `${isRedeemable && 'is_redeemable'}`,
      `${Number(typeId) === RewardListingType.FLASHSALE_ONLY && 'is_flashsale'}`,
    ]);
  };
  function getSortIcon(sortId: number) {
    switch (sortId) {
      case RewardListingSortBy.NEW:
        return '/static/icons/rewards/SortNew.svg';
      // case RewardListingSortBy.POPULAR:
      //   return '/static/icons/rewards/SortNew.svg';

      case RewardListingSortBy.POINT_ASC:
        return '/static/icons/rewards/SortAsc.svg';

      case RewardListingSortBy.POINT_DESC:
        return '/static/icons/rewards/SortDesc.svg';

      default:
        return null;
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('desktop:max-w-[375px] desktop:mt-4 flex w-full gap-2 bg-white py-1', className, {
        'border-neutral-15 fixed left-0 top-11 z-10 border-y': isMobile,
      })}>
      <button hidden type="submit" ref={submitBtnRef}>
        {t('apply')}
      </button>
      <input hidden type="text" {...register('category_id')} />
      <input hidden type="text" {...register('sort')} />
      <input hidden type="text" {...register('is_redeemable')} />
      <input hidden type="text" {...register('type')} />
      <Button
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          '--border-width': '0px',
        }}
        disabled={isFetching}
        className={cn('desktop:!bg-neutral-10 desktop:!px-4 desktop:!ml-0 min-h-[58px]!px-3 !ml-3 flex-1 bg-white', {
          'after:bg-neutral-15 after:absolute after:-right-1 after:bottom-2 after:top-2 after:w-[1px] after:content-["_"]':
            isMobile,
        })}
        onClick={() =>
          Dialog.show({
            className: 'adm-dialog-custom',
            title: (
              <NavBar
                style={{ '--height': '44px' }}
                backArrow={isMobile ? <CloseIcon /> : false}
                onBack={() => (isMobile ? Dialog.clear() : {})}
                back={isMobile ? undefined : <span className="text-neutral-90 text-lg font-bold">{t('category')}</span>}
                right={
                  isMobile ? undefined : (
                    <Button
                      style={{ '--border-radius': '24px' }}
                      className="!-mr-1 ml-auto !h-10 !w-10 border-none !p-2"
                      fill="none"
                      onClick={() => {
                        resetValue();
                        setIsChangedSearch(false);
                        Dialog.clear();
                      }}>
                      <CloseIcon />
                    </Button>
                  )
                }>
                {isMobile ? <span className="text-neutral-90 text-lg font-bold">{t('category')}</span> : undefined}
              </NavBar>
            ),
            content: (
              <CheckList
                style={{
                  '--padding-left': '16px',
                  '--padding-right': '16px',
                  '--border-top': 'none',
                  '--border-bottom': 'none',
                }}
                className={cn('-mx-3 w-[calc(100%+24px)]', { 'mt-2': !isMobile })}
                extra={(active) => (active ? <RadioFilledIcon /> : <RadioIcon />)}
                defaultValue={selectedCategory ? [String(selectedCategory.id)] : ['-3']}
                onChange={(val) => {
                  const value = Number(val[0]);
                  setIsChangedSearch(true);
                  switch (!isNaN(value) && value) {
                    case -3:
                      setValue('type', RewardListingType.ALL);
                      setValue('promo_type', undefined);
                      setValue('category_id', undefined);
                      break;

                    // case -2:
                    //   setValue('type', RewardListingType.FLASHSALE_ONLY);
                    //   setValue('promo_type', undefined);
                    //   setValue('category_id', undefine d);
                    //   break;

                    case -1:
                      setValue('promo_type', RewardListingPromoType.AHAMOVE);
                      setValue('type', undefined);
                      setValue('category_id', undefined);
                      break;

                    case false:
                      setValue('category_id', undefined);
                      setValue('type', RewardListingType.ALL);
                      setValue('promo_type', undefined);
                      break;

                    default:
                      setValue('category_id', Number(val[0]));
                      setValue('type', undefined);
                      setValue('promo_type', undefined);
                      break;
                  }
                }}>
                {categories?.map(
                  (category) =>
                    category.id !== -2 && (
                      <CheckList.Item key={category.id} value={String(category.id)} className="text-sm">
                        <p className="text-sm font-medium"> {category.name[lang as keyof LocaleContent]}</p>
                      </CheckList.Item>
                    ),
                )}
              </CheckList>
            ),
            actions: [
              {
                key: 'apply',
                text: t('apply'),
                bold: true,
                onClick: () => {
                  submitBtnRef && submitBtnRef.current && submitBtnRef.current.click();
                  Dialog.clear();
                },
              },
            ],
          })
        }>
        <Space justify="between" align="center" className="w-full">
          <Space direction="vertical" style={{ '--gap-vertical': '4px' }} align="start">
            <span className="text-neutral-30 text-xxs block font-bold uppercase">{t('category')}</span>
            <p className="text-neutral-90 text-xs font-medium">
              {selectedCategory?.name[lang as keyof LocaleContent] || t('allReward')}
            </p>
          </Space>
          {isFetching ? <SpinLoading style={{ '--size': '24px' }} /> : <DownArrowIcon />}
        </Space>
      </Button>

      <Button
        className="desktop:!bg-neutral-10 desktop:!px-4 desktop:!mx-0 !mr-3 min-h-[58px] flex-1 bg-white !px-3"
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          '--border-width': '0px',
        }}
        disabled={isFetching}
        onClick={() =>
          Dialog.show({
            className: 'adm-dialog-custom',
            title: (
              <NavBar
                style={{ '--height': '44px' }}
                backArrow={isMobile ? <CloseIcon /> : false}
                onBack={() => (isMobile ? Dialog.clear() : {})}
                back={isMobile ? undefined : <span className="text-neutral-90 text-lg font-bold">{t('sortBy')}</span>}
                right={
                  isMobile ? undefined : (
                    <Button
                      style={{ '--border-radius': '24px' }}
                      className="!-mr-1 ml-auto !h-10 !w-10 border-none !p-2"
                      fill="none"
                      onClick={() => {
                        resetValue();
                        setIsChangedSearch(false);
                        Dialog.clear();
                      }}>
                      <CloseIcon />
                    </Button>
                  )
                }>
                {isMobile ? <span className="text-neutral-90 text-lg font-bold">{t('sortBy')}</span> : undefined}
              </NavBar>
            ),
            content: (
              <Space
                direction="vertical"
                className={cn('-mx-3 w-[calc(100%+24px)] pb-16', { 'mt-2': !isMobile })}
                style={{ '--gap-vertical': '6px' }}>
                <div className="bg-white">
                  <h3 className="text-neutral-90 px-4 py-3 text-base font-bold">{t('sort.sortBy')}</h3>
                  <CheckList
                    className="w-full"
                    defaultValue={sortId ? [String(sortId)] : ['1']}
                    extra={(active) => (active ? <RadioFilledIcon /> : <RadioIcon />)}
                    onChange={(val) => {
                      setIsChangedSearch(true);
                      setValue('sort', Number(val[0] || RewardListingSortBy.NEW));
                    }}>
                    {Object.values(RewardListingSortBy)
                      .filter((v) => typeof v !== 'number')
                      .map((sortValue) => (
                        <CheckList.Item
                          key={sortValue}
                          value={String(RewardListingSortBy[sortValue as number])}
                          className="text-sm">
                          <Space direction="horizontal" align="center" style={{ '--gap': '16px' }}>
                            {getSortIcon(Number(RewardListingSortBy[sortValue as number])) ? (
                              <Image
                                src={getSortIcon(Number(RewardListingSortBy[sortValue as number])) as string}
                                alt="sort"
                                height={24}
                                width={24}
                              />
                            ) : null}
                            <span className="text-neutral-90 text-xs font-medium">
                              {t(`sort.${String(sortValue).toLowerCase()}`)}
                            </span>
                          </Space>
                        </CheckList.Item>
                      ))}
                  </CheckList>
                </div>
                <div className="bg-white">
                  <h3 className="text-neutral-90 px-4 py-3 text-base font-bold">{t('filter.filterBy')}</h3>
                  <CheckList
                    className="w-full"
                    multiple
                    defaultValue={moreOptions}
                    extra={(active) => (active ? <CheckboxFilledIcon /> : <CheckboxIcon />)}
                    onChange={(val) => {
                      setIsChangedSearch(true);
                      setMoreOptions(val);
                      setValue(
                        'type',
                        val.includes('is_flashsale') ? RewardListingType.FLASHSALE_ONLY : RewardListingType.ALL,
                      );
                      setValue('is_redeemable', val.includes('is_redeemable') ? 'true' : 'false');
                    }}>
                    <CheckList.Item key="is_flashsale" value="is_flashsale" className="text-sm">
                      {t('filter.is_flashsale')}
                    </CheckList.Item>
                    <CheckList.Item key="is_redeemable" value="is_redeemable" className="text-sm">
                      {t('filter.is_redeemable')}
                    </CheckList.Item>
                  </CheckList>
                </div>
              </Space>
            ),
            actions: [
              {
                key: 'apply',
                text: t('apply'),
                bold: true,
                onClick: () => {
                  submitBtnRef && submitBtnRef.current && submitBtnRef.current.click();
                  setTimeout(() => {
                    Dialog.clear();
                  });
                },
              },
            ],
          })
        }>
        <Space justify="between" align="center" className="w-full">
          <Space direction="vertical" style={{ '--gap-vertical': '4px' }} align="start">
            <span className="text-neutral-30 text-xxs block font-bold uppercase">{t('sortBy')}</span>
            <p className="text-neutral-90 text-xs font-medium">
              {t(`sort.${RewardListingSortBy[Number(sortId) || 1].toLowerCase()}`)}
            </p>
          </Space>

          {isFetching ? <SpinLoading style={{ '--size': '24px' }} /> : <DownArrowIcon />}
        </Space>
      </Button>
    </form>
  );
}
