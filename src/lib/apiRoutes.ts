const apiRoutes = {
  rewards: {
    category: '/opstech/loyalty/user/api/v1/category',
    banner: '/opstech/loyalty/user/api/v1/banner',
    reward: '/opstech/loyalty/user/api/v1/reward',
    myReward: '/opstech/loyalty/user/api/v1/user/reward',
    session: '/opstech/loyalty/user/api/v1/session',
    userProfile: '/opstech/loyalty/user/api/v1/user',
    rankingConfig: '/opstech/loyalty/user/api/v1/rank-config',
    pointTransaction: '/opstech/loyalty/user/api/v1/point-transaction',
    rewardDetail: (id: number) => `/opstech/loyalty/user/api/v1/reward/${id}`,
    myRewardDetail: (id: number) => `/opstech/loyalty/user/api/v1/user/reward/${id}`,
    sessionDetail: (id: number) => `/opstech/loyalty/user/api/v1/session/${id}`,
    statsVoucherById: (id: number) => `/opstech/loyalty/user/api/v1/reward/${id}/stats`,
  },
};

export default apiRoutes;
