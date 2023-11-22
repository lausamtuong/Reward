import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const gilroy = localFont({
  src: [
    {
      path: './svn-gilroy-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './svn-gilroy-medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './svn-gilroy-semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './svn-gilroy-bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-gilroy',
  fallback: ['sans-serif', 'system-ui', 'arial'],
});

export { inter, gilroy };
