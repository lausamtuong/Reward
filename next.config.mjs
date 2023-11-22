import withBundleAnalyzer from '@next/bundle-analyzer';
import withPlugins from 'next-compose-plugins';
import nextTranslate from 'next-translate-plugin';
// import { createSecureHeaders } from 'next-secure-headers';
import { readFileSync } from 'node:fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Once supported replace by node / eslint / ts and out of experimental, replace by
 * `import packageJson from './package.json' assert { type: 'json' };`
 * @type {import('type-fest').PackageJson}
 */
const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)).toString('utf-8'));

const trueEnv = ['true', '1', 'yes'];

const isProd = process.env.NODE_ENV === 'production';
const isCI = trueEnv.includes(process.env?.CI ?? 'false');
// const enableCSP = true;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * A way to allow CI optimization when the build done there is not used
 * to deliver an image or deploy the files.
 * @link https://nextjs.org/docs/advanced-features/source-maps
 */
const disableSourceMaps = trueEnv.includes(process.env.NEXT_DISABLE_SOURCEMAPS ?? 'false');

if (disableSourceMaps) {
  console.warn('notice - Sourcemaps generation have been disabled through NEXT_DISABLE_SOURCEMAPS');
}

// @link https://github.com/jagaapple/next-secure-headers
// const secureHeaders = createSecureHeaders({
//   contentSecurityPolicy: {
//     directives: enableCSP
//       ? {
//           defaultSrc: "'self'",
//           styleSrc: ["'self'", "'unsafe-inline'"],
//           scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
//           frameSrc: ["'self'"],
//           connectSrc: [
//             "'self'",
//             // 'https://*.sentry.io',
//           ],
//           imgSrc: ["'self'", 'https:', 'http:', 'data:'],
//           workerSrc: ['blob:'],
//         }
//       : {},
//   },
//   ...(enableCSP && process.env.NODE_ENV === 'production'
//     ? {
//         forceHTTPSRedirect: [true, { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true }],
//       }
//     : {}),
//   referrerPolicy: 'same-origin',
// });

/** @type {import('next').NextConfig} */
const nextConfig = withPlugins(
  [[withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })], [nextTranslate({})]],
  {
    reactStrictMode: true,
    productionBrowserSourceMaps: !disableSourceMaps,
    optimizeFonts: true,
    output: 'standalone',

    compiler: {
      // removeConsole: {
      //   exclude: ["error", "warn"],
      // },
    },

    images: {
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      minimumCacheTTL: 60,
      formats: ['image/webp'],
      loader: 'default',
      dangerouslyAllowSVG: false,
      disableStaticImages: false,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      remotePatterns: [
        // {
        //   protocol: 'https',
        //   hostname: 'ahamoveimg.s3-ap-southeast-1.amazonaws.com',
        //   port: '',
        //   pathname: '/*/**',
        // },
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
      domains: [
        'ahamoveimg.s3-ap-southeast-1.amazonaws.com',
        'ahamove.com',
        'home.ahamove.com',
        '632466.sgp1.digitaloceanspaces.com',
      ],
      unoptimized: false,
    },

    experimental: {
      appDir: true,
      // instrumentationHook: true,
    },

    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}',
        preventFullImport: true,
      },
    },

    onDemandEntries: {
      // period (in ms) where the server will keep pages in the buffer
      maxInactiveAge: (isCI ? 3600 : 25) * 1000,
      // number of pages that should be kept simultaneously without being disposed
      // pagesBufferLength: 2,
    },

    // Packages to be transpiled part of nextjs build to follow nextjs/browserslist compatibility.
    // This replaces next-transpile-modules starting from nextjs 13.1, if you're relying on css
    // please see https://github.com/vercel/next.js/issues/42837
    transpilePackages: isProd ? ['antd-mobile', '@ahm/api-wrappers'] : ['antd-mobile'],

    // async headers() {
    //   return [
    //     {
    //       // All page routes, not the api ones
    //       source: '/:path((?!api).*)*',
    //       headers: [
    //         ...secureHeaders,
    //         { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    //         { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' },
    //       ],
    //     },
    //   ];
    // },

    // @link https://nextjs.org/docs/api-reference/next.config.js/rewrites
    async rewrites() {
      return [
        { source: '/health', destination: '/api/monitor/healthcheck' },
        { source: '/ping', destination: '/api/monitor/healthcheck' },
      ];
    },
    webpack: (config, { webpack, isServer }) => {
      if (!isServer) {
        // Fixes npm packages that depend on `fs` module
        // @link https://github.com/vercel/next.js/issues/36514#issuecomment-1112074589
        config.resolve.fallback = { ...config.resolve.fallback, fs: false };
      }

      // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/tree-shaking/
      config.plugins.push(
        new webpack.DefinePlugin({
          // __APP_VERSION__: getAppVersion(),
        }),
      );

      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.(js|ts)x?$/,
        use: [
          {
            loader: '@svgr/webpack',
            // https://react-svgr.com/docs/webpack/#passing-options
            options: {
              svgo: isProd,
              // @link https://github.com/svg/svgo#configuration
              // svgoConfig: { }
            },
          },
        ],
      });

      return config;
    },

    env: {
      APP_NAME: packageJson.name ?? 'not-in-package.json',
      APP_VERSION: packageJson.version ?? 'not-in-package.json',
      BUILD_TIME: new Date().toISOString(),
    },
  },
);

export default nextConfig;
