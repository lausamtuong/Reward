'use client';

import { ErrorBlock } from 'antd-mobile';
// import Error from 'next/error';
import useTranslation from 'next-translate/useTranslation';
import Container from '@/components/Container';

/**
 * Note that `app/[...rest]/page.tsx`
 * is necessary for this page to render.
 */
export default function NotFoundPage() {
  const { t } = useTranslation('common');

  return (
    <Container component="main" className="min-h-screen">
      {/* <Error statusCode={404} title={t('title')} /> */}
      <ErrorBlock
        className="my-auto"
        image="/static/images/not-found.webp"
        title={t('NotFoundPage.title')}
        description={t('NotFoundPage.description')}
        style={{
          '--image-height': '122px',
        }}
      />
    </Container>
  );
}
