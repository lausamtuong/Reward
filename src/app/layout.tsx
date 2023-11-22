// These styles apply to every route in the application
import '@/styles/globals.css';
import { getSelectorsByUserAgent } from '@ahm/common-helpers';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { ReactNode } from 'react';
import AppProviders from '@/app/AppProviders';
import { gilroy } from '@/styles/fonts';

type Props = {
  children: ReactNode;
  modal: ReactNode;
  params: {
    lang: string;
  };
};

export async function generateMetadata({ params: { lang: locale = 'vi' } }: Props): Promise<Metadata> {
  let description = 'Giải pháp hoàn hảo cho mọi nhu cầu giao hàng của bạn';

  try {
    const messages = (await import(`../../locales/${locale}/common.json`)).default;
    if (messages && messages['slogan']) {
      description = messages['slogan'] as string;
    }
  } catch (error) {
    console.log(error);
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URI),
    title: {
      default: 'Ahamove',
      template: '%s | Ahamove',
    },
    description,
    keywords: ['Ahamove'],
    authors: [{ name: 'Ahamove' }, { name: 'Ahamove', url: '/' }],
    openGraph: {
      title: 'Ahamove',
      description,
      url: '/',
      siteName: 'Ahamove',
      images: [
        {
          url: `/static/images/ahamove-banner.webp`,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'vi_VN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ahamove',
      description,
      creator: '@ahamove',
      images: [`/static/images/ahamove-banner.webp`],
    },
    icons: {
      icon: `/static/favicons/favicon-16x16.png`,
      shortcut: `/static/favicons/favicon.ico`,
      apple: `/static/favicons/apple-touch-icon.png`,
      other: [
        {
          rel: 'icon',
          url: `/static/favicons/favicon-32x32.png`,
          sizes: '32x32',
          type: 'image/png',
        },
        {
          rel: 'icon',
          url: `/static/favicons/favicon-16x16.png`,
          sizes: '16x16',
          type: 'image/png',
        },
        {
          rel: 'mask-icon',
          url: `/static/favicons/safari-pinned-tab.svg`,
        },
      ],
    },
    manifest: `/static/favicons/site.webmanifest`,
    themeColor: '#142246',
    appleWebApp: {
      title: 'Ahamove Web App',
      statusBarStyle: 'black-translucent',
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      viewportFit: 'cover', // You have to handle stand-alone mode yourself for headers
      userScalable: false, // Disable zooming on mobile devices
    },
    alternates: {
      canonical: '/',
    },
    verification: {
      google: '3JUjAaR-jc6Uj7Y4n3znGHR2hKJZgtZ9ESZf_S-uocg',
    },
  };
}

export default async function LocaleLayout(props: Props) {
  const { lang } = props.params;

  const headerList = headers();
  const userAgent = headerList.get('user-agent');

  const { isMobile } = getSelectorsByUserAgent(userAgent as string);

  return (
    <html lang={lang}>
      <body className={gilroy.className}>
        <AppProviders isSsrMobile={isMobile}>
          {props.modal}
          {props.children}
        </AppProviders>
      </body>
    </html>
  );
}
