import {en} from '~/locales/en'
import {es} from '~/locales/es'

export default defineI18nConfig(() => ({
    globalInjection: true,
    locale: 'es',
    fallbackLocale: 'es',
    legacy: false,
    messages: {
        en,
        es
    }
}))
