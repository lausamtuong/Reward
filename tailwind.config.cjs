// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharedConfig = require('@ahm/tailwind-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // prefix ui lib classes to avoid conflicting with the app
  // prefix: "a-",
  theme: {
    extend: {
      fontSize: {
        xxs: ['10px', '16px'],
      },
      backgroundImage: {
        'new-member': "url('/static/images/new.webp')",
        platinum: "url('/static/images/silver.webp')",
        gold: "url('/static/images/gold.webp')",
        diamond: "url('/static/images/diamond.webp')",
      },
      colors: {
        'new-member-20': 'rgba(54, 52, 67, 0.40)',
        'new-10': 'rgba(235, 235, 235, 0.40)',
        'platinum-10': 'rgba(156, 156, 156, 0.40)',
        'gold-10': 'rgba(224, 171, 122, 0.40)',
        'diamond-10': 'rgba(217, 169, 255, 0.40)',
      },
      boxShadow: {
        '3xl': '0px 30px 30px 0px rgba(69, 42, 124, 0.15)',
        'reward-card': '0px 2px 12px 0px rgba(0, 0, 0, 0.08)',
        'modal-header': '4px 0px 6px 0px rgba(0, 0, 0, 0.15)',
        'button-dock': '0px -4px 16px 0px rgba(0, 0, 0, 0.12)',
        'button-close': '0px 4px 16px 0px rgba(0, 0, 0, 0.12);',
      },
      keyframes: {
        fadedIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadedOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadedIn: 'fadedIn 0.3s ease-in ',
        fadedOut: 'fadedOut 0.3s ease-out ',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
  presets: [sharedConfig],
  // corePlugins: {
  //   preflight: false,
  // },
};
