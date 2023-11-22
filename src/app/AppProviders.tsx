'use client';

import { QueryClientProvider } from '@ahm/api-wrappers';
import { IsSsrMobileContext } from '@ahm/ui';
import { ConfigProvider } from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import React from 'react';
import { ProtocolProvider } from './ProtocolProvider';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eruda: any;
  }
}

type Props = {
  children: React.ReactNode;
  isSsrMobile: boolean;
};

export default function AppProviders({ children, isSsrMobile }: Props) {
  return (
    <ConfigProvider locale={enUS}>
      <QueryClientProvider>
        <IsSsrMobileContext.Provider value={isSsrMobile}>
          {/* <AuthProvider> */}
          <ProtocolProvider>{children}</ProtocolProvider>
          {/* </AuthProvider> */}
        </IsSsrMobileContext.Provider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
