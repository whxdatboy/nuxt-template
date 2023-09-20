import fs from 'fs';
import path from 'path';

const isDev = process.env.NODE_ENV === 'development';

const env = {
  SERVER_API_URL: process.env.SERVER_API_URL,
  CLIENT_API_URL: process.env.CLIENT_API_URL,
  PROXY_URL: process.env.PROXY_URL,
  HTTPS_KEY: process.env.HTTPS_KEY,
  HTTPS_CERT: process.env.HTTPS_CERT,
  DEVELOPMENT: process.env.NODE_ENV === 'development',
  IMGPROXY_SITE_HOST: process.env.IMGPROXY_SITE_HOST,
  UI_DEMO: process.env.UI_DEMO,
  REDIS_DSN: process.env.REDIS_DSN,
  SENTRY_DSN_FRONTEND: process.env.SENTRY_DSN_FRONTEND,
  SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
};

// NuxtDeviceIs breakpoints
const breakpoints = {
  mobile: 767,
  tablet: 1279,
  laptop: 1439,
  desktop: 999999,
};
export default defineNuxtConfig({
  telemetry: false,
  
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  
  modules: [
      '@pinia/nuxt'
  ],
  
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  
  router: {
    // linkActiveClass: '_active-link',
    // linkExactActiveClass: '_exact-link',
  },
  
  // * Customize the progress-bar color
  // loading: {
  //   color: '#d9ff6c', height: '2px', throttle: 0,
  // },
  
  // Public env config
  // publicRuntimeConfig: {
  //   IS_DEV: isDev,
  //   PROXY_URL: env.PROXY_URL,
  //   IMGPROXY_SITE_HOST: env.IMGPROXY_SITE_HOST,
  //   UI_DEMO: env.UI_DEMO,
  //   REDIS_DSN: env.REDIS_DSN,
  //   SENTRY_ENVIRONMENT: env.SENTRY_ENVIRONMENT,
  // },
  
  // buildModules: ['@nuxt/image', '@nuxtjs/svg-sprite'],
  
  // Axios && proxy
  // axios: {
  //   progress: false,
  //   ...!env.PROXY_URL && { baseURL: env.SERVER_API_URL || '' },
  //   ...!env.PROXY_URL && { browserBaseURL: env.CLIENT_API_URL || '' },
  //   proxy: Boolean(env.PROXY_URL),
  // },
  
  // Disabled _icons page from svgSprite
  // svgSprite: {
  //   iconsPath: null,
  // },
  
  // NuxtDeviceIs breakpoints
  // NuxtDeviceIs: {
  //   breakpoints,
  // },
  
  // Auto import UI components
  components: [{
    path: '~/components/ui',
    extensions: ['vue'],
    pathPrefix: false,
    isAsync: true,
    prefetch: !isDev,
  }],
  
  
  // Nuxt images module
  // image: {
  //   provider: 'imgProxy',
  //   domains: [env.SERVER_API_URL || env.PROXY_URL, 'storage.yandexcloud.net'],
  //   screens: { ...breakpoints, desktop: 1920 },
  //
  //   intersectOptions: { // Intersection observer settings for native lazy
  //     rootMargin: '50px',
  //   },
  //
  //   presets: {
  //     preview: {
  //       modifiers: {
  //         quality: 30,
  //         blur: 60,
  //       },
  //     },
  //   },
  //
  //   providers: {
  //     imgProxy: {
  //       provider: '~/config/imgProxy',
  //
  //       options: {
  //         baseURL: env.IMGPROXY_SITE_HOST, // imgProxy service url
  //         staticFolder: '/images', // redirect to internal url, if url from static folder
  //         quality: 80, // Default quality
  //       },
  //     },
  //   },
  // },
  
  // Nuxt-delay-hydration
  // delayHydration: {
  //   mode: 'mount',
  //   postIdleTimeout: { mobile: 10000, desktop: 9000 },
  //   debug: isDev,
  // },
  
  // Global CSS
  css: [
    '@/assets/scss/bundle.scss',
    '@/assets/scss/vendors.scss',
    '@/assets/scss/default.scss',
  ],
  
  // styleResources: {
  //   scss: '@import "@/assets/scss/shared.scss"',
  //   hoistUseStatements: true,
  // },
  
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/shared.scss";',
        }
      }
    }
  },
  
  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // BUILD SECTION
  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  build: {
    // publicPath: '/n/',
    
    analyze: isDev,
    
    // Set libraries to transpile by babel
    transpile: [({ isDev }) => !isDev && ''],
    
    // loaders: {
    //   scss: {
    //     sourceMap: isDev,
    //   },
    //   vue: {
    //     cacheBusting: false,
    //   },
    // },
    
    // extractCss: true,
    
    // Terser settings
    // terser: !isDev && {
    //   terserOptions: {
    //     mangle: {
    //       safari10: true,
    //     },
    //   },
    // },
    
    // Postcss settings
    // postcss: !isDev && {
    //   preset: {
    //     autoprefixer: {
    //       grid: true,
    //     },
    //   },
    //
    //   postcssOptions: {
    //     plugins: {
    //       'flex-gap-polyfill': { only: true },
    //     },
    //   },
    // },
    
    // optimization: {
    //   splitChunks: {
    //     maxSize: 300000,
    //   },
    // },
  },
  
  // devtools: { enabled: true },
})
