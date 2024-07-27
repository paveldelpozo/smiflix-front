import {defineStore} from 'pinia'

export const useLocaleStore = defineStore('localeStore', () => {
    const customLocale = ref(localStorage.getItem('customLocale') ?? 'es')

    function setCustomLocale(code: string) {
        customLocale.value = code
        localStorage.setItem('customLocale', code)
    }

    return {
        customLocale,
        setCustomLocale
    }
})
