import { useQuery, UseQueryOptions } from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import { Stats } from './types';
import type { DefaultOpsTechResponse } from '../types';

export const getStartVoucherByIdFn = async (id: number) => {
  const response = await httpClient.get<DefaultOpsTechResponse<Stats>>(apiRoutes.rewards.statsVoucherById(id));
  return response.data.data;
};

export const useGetStartVoucherById = (id: number, opts?: UseQueryOptions<Stats, DefaultQueryError>) =>
  useQuery<Stats, DefaultQueryError>([apiRoutes.rewards.statsVoucherById(id)], () => getStartVoucherByIdFn(id), opts);
