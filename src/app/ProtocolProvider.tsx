'use client';

import {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  storeAccessToken,
} from '@ahm/api-wrappers';
import { DefaultQueryError } from '@ahm/api-wrappers/api/types';
import { AuthContextProps } from '@ahm/api-wrappers/client/AuthProvider';
import { JSFunction, loadJS } from '@ahm/common-helpers';
import { useIsMobile } from '@ahm/ui';
import { DotLoading, Space } from 'antd-mobile';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import Container from '@/components/Container';
import { SEARCH_PARAMS_PROTOCOL } from '@/lib/constants';
import httpClient from '@/lib/httpClient';

type ProtocolContextType = {
  webinappId?: string;
  accessToken: string | null;
  isGadget: boolean;
  isEmbed: boolean;
  isAuthenticated: boolean;
};

type Props = {
  children: ReactNode;
};

const ProtocolContext = createContext<ProtocolContextType>({
  accessToken: null,
  isGadget: false,
  isEmbed: false,
  isAuthenticated: false,
});

export function ProtocolProvider({ children }: Props) {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const protocol = searchParams.get(SEARCH_PARAMS_PROTOCOL) || null;

  const [accessToken, setAccessToken] = useState<AuthContextProps['accessToken']>(null);
  const [webinappId, setWebinappId] = useState<string | undefined>();

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);
  const isGadget = useMemo(() => Boolean(protocol && protocol === 'gadget'), [protocol]);
  const isEmbed = useMemo(() => !!webinappId && isMobile, [webinappId, isMobile]);

  const handleLoadInitGadget = async () => {
    const postRobot = await import('post-robot');
    const response = await postRobot.send(window.parent, 'INIT_GADGET');

    if ('webinapp' in response.data && response.data.webinapp) {
      setWebinappId(response.data.webinapp ? (response.data.webinapp as string) : undefined);

      if (isMobile) {
        JSFunction.hideToolbar();
      }
    }

    const cookieToken = getAccessToken();

    const token = 'token' in response.data && response.data.token ? (response.data.token as string) : cookieToken;

    if (token) {
      httpClient.interceptors.request.use(
        async (config) => {
          if (token) {
            config.headers = {
              ...config.headers,
              authorization: `Bearer ${token}`,
            } as unknown as AxiosRequestHeaders;
          }

          return config;
        },
        (error) => Promise.reject(error),
      );

      httpClient.interceptors.response.use(
        (response) => response,
        async (error: DefaultQueryError) => {
          const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
          const cookieToken = getAccessToken();

          if (error.response?.status === 401 && !originalRequest._retry && !!cookieToken) {
            originalRequest._retry = true;
            // try {
            const response = await postRobot.send(window.parent, 'REQUEST_TOKEN');

            console.log('REQUEST_TOKEN', response.data);

            // return httpClient(originalRequest);
            // } catch (error) {
            setAccessToken(null);
            removeAccessToken();
            removeRefreshToken();

            return Promise.reject(error);
            // }
          }

          return Promise.reject(error);
        },
      );

      setAccessToken(token);
      storeAccessToken(token);
    } else {
      const response = await postRobot.send(window.parent, 'REQUEST_TOKEN');

      console.log('REQUEST_TOKEN', response.data);
    }
  };

  useEffect(() => {
    if (isGadget) {
      handleLoadInitGadget();
    }
  }, [isGadget]);

  const handleResize = () => {
    const doc = document.documentElement;
    doc.style.setProperty(`--app-height`, `${window.innerHeight}px`);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENABLE_ERUDA === 'true' && isMobile) {
      const src = `//cdn.jsdelivr.net/npm/eruda`;

      loadJS(src).then(() => {
        if (window.eruda && window.eruda._isInit) return;
        window.eruda.init();
      });
    }
    return () => {
      window.eruda && window.eruda._isInit && window.eruda.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuthenticated) {
    return (
      <Container component="main" className="min-h-screen">
        <Space
          direction="vertical"
          className="my-auto h-full w-full items-center justify-center"
          style={{ '--gap-vertical': '16px' }}>
          <Image
            data-testid="logo"
            src="/static/icons/Logo.svg"
            alt="Ahamove Logo"
            width={255}
            height={44}
            className="m-auto"
          />
          <span className="text-2xl">
            <DotLoading color="primary" />
          </span>
        </Space>
      </Container>
    );
  }

  return (
    <ProtocolContext.Provider value={{ webinappId, accessToken, isGadget, isEmbed, isAuthenticated: !!accessToken }}>
      {children}
    </ProtocolContext.Provider>
  );
}

export const useProtocol = (): ProtocolContextType => {
  const context = useContext(ProtocolContext);

  if (!context) {
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'No Protocol context found. Have you configured the provider?'
        : undefined,
    );
  }

  return context;
};
