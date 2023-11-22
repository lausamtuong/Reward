module.exports = {
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  pages: {
    '*': ['common', 'rewards', 'membership'],
    '/(rewards)/rewards': ['rewards'],
    '/(rewards)/rewards/my-rewards': ['myreward'],
    '/(rewards)/rewards/*': ['rewards'],
    '/(rewards)/rewards/search': ['category', 'filter'],
    '/(rewards)/membership': ['membership'],
    '/(rewards)/membership/history': ['history'],
    '/(rewards)/membership/*': ['membership'],
  },
  logBuild: process.env.NODE_ENV !== 'production',
  localeDetection: false,
};
