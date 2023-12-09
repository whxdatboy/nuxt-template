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
        [
            '@nuxt/image',
            {
                inject: true,
                provider: 'ipx',

                intersectOptions: {
                    // Intersection observer settings for native lazy
                    rootMargin: '50px',
                },

                presets: {
                    preview: {
                        modifiers: {
                            quality: 30,
                            blur: 80,
                        },
                    },
                },

                format: ['webp', 'jpg', 'png', 'jpeg'],
            },
        ],
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    // automatically imports `defineStore`
                    'defineStore', // import { defineStore } from 'pinia'
                    ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
                ],
            },
        ],
        [
            '@nuxtjs/svg-sprite',
            {
                iconsPath: null,
                elementClass: 'icon',
            },
        ],
        [
            '@nuxtjs/stylelint-module',
            {
                fix: true,
                dev: isDev,
                build: !isDev,
                exclude: ['**/node_modules/**', 'virtual:'],
                chokidar: true,
                lintOnStart: false,
            },
        ],
        // [
        //     'nuxt-delay-hydration',
        //     {
        //         mode: 'mount',
        //         postIdleTimeout: { mobile: 10000, desktop: 9000 },
        //         debug: isDev,
        //     },
        // ],
    ],

    sourcemap: {
        server: false,
        client: false,
    },

    // Auto import UI components
    components: [
        {
            path: '~/components/ui',
            extensions: ['vue'],
            pathPrefix: false,
            isAsync: true,
            prefetch: !isDev,
        },
    ],

    // Global CSS
    css: [
        '@/assets/scss/bundle.scss',
        '@/assets/scss/vendors.scss',
        '@/assets/scss/default.scss',
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "assets/scss/shared.scss";',
                },
            },

            modules: {
                hashPrefix: '',
                generateScopedName: '[local]_[hash:base64:5]',
            },
        },

        resolve: {
            dedupe: ['vue'],
            preserveSymlinks: true,
        },

        optimizeDeps: {
            exclude: ['ufo'],
        },
    },

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILD SECTION
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    build: {
        // publicPath: '/n/',
        analyze: isDev,

        // Set libraries to transpile by babel
        transpile: [({ isDev }) => !isDev && ''],
    },

    devtools: { enabled: isDev },
});
