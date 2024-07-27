// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' },
        head: {
            bodyAttrs: {
                class: 'bg-white dark:bg-sky-950',
            },
        },
    },
    ssr: false,
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            youtubeApiKey: '',
            channelIdEs: '',
            channelIdEn: ''
        }
    },
    modules: [
        '@nuxtjs/i18n',
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
    ],
    tailwindcss: {
        cssPath: [
            '~/assets/css/tailwind.css',
            {
                injectPosition: "first"
            }
        ],
        configPath: '~~/tailwind.config',
        exposeConfig: {
            level: 2
        },
        config: {},
        viewer: false,
    },
    i18n: {
        strategy: 'no_prefix',
        locales: [
            {
                code: 'en',
                name: 'English'
            },
            {
                code: 'es',
                name: 'Español'
            },
        ]
    },
    hooks: {
        'pages:extend'(pages) {
            // We need to manually add this route because Nuxt’s dynamic routing system generates a nested view
            // that requires one view inside another. However, we only need a path that accommodates both
            // parameters: categoryId and videoId.
            pages.push({
                name: 'video-details',
                path: '/categories/:categoryId/videos/:videoId',
                file: '~/views/VideoDetail.vue'
            })
        }
    },
})
