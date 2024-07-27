import {en} from '~/locales/en'
import {es} from '~/locales/es'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'es',
    messages: {
        en,
        es
    }
}))
