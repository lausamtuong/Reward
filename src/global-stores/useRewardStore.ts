import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import { logger } from './logger';
import createSelectors from './selectors';

type RewardState = {
  current_redeemed_id?: number;
};

type RewardActions = {
  setCurrentRedeemedId: (id: number) => void;
  clearCurrentRedeemedId: () => void;
};

const useRewardStore = create<
  RewardState & RewardActions,
  [['zustand/devtools', RewardState & RewardActions], ['zustand/persist', RewardState & RewardActions]]
>(
  logger(
    devtools(
      // persist(
      combine({}, (set) => ({
        setCurrentRedeemedId: (id) => set({ current_redeemed_id: id }),
        clearCurrentRedeemedId: () => set({ current_redeemed_id: undefined }),
      })),
      //   {
      //     name: "bearStore",
      //     storage: createJSONStorage(() => localStorage),
      //   }
      // )
    ),
    'rewardStore',
  ),
);

export default createSelectors(useRewardStore);
