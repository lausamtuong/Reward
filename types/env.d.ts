// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ProcessEnv {
    NEXT_PUBLIC_APP_TITLE: string;
    NEXT_PUBLIC_APP_URI: string;
    NEXT_PUBLIC_APP_DOMAIN: string;
    NEXT_PUBLIC_HOME_URI: string;
    NEXT_PUBLIC_APP_VUE_URI: string;
    NEXT_PUBLIC_AUTH_URI: string;
    NEXT_PUBLIC_API_URI: string;
    NEXT_PUBLIC_ENABLE_ERUDA: string;

    // Tracking Event
    NEXT_PUBLIC_GTM_KEY: string;
    NEXT_PUBLIC_ENABLE_TRACKING_EVENT: string;
    APP_NAME: string;
    APP_VERSION: string;
    BUILD_TIME: string;
    // more env variables...
  }
}
