<script setup lang="ts">
// https://i18n.nuxtjs.org/docs/guide/lang-switcher

import {storeToRefs} from "pinia";
import {useLocaleStore} from "~/store/locale";

const localeStore = useLocaleStore();
const { customLocale } = storeToRefs(localeStore)
const { setCustomLocale } = localeStore
const { locale, setLocale } = useI18n()

function swapLocale() {
    if (locale.value === 'es') {
        setLocale('en')
        setCustomLocale('en')
    } else {
        setLocale('es')
        setCustomLocale('es')
    }
}

setLocale(customLocale.value)
</script>

<template>
    <button @click="swapLocale" class="inline-flex justify-center items-center text-sky-400">
        <svg class="w-8 h-8 fill-sky-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z" /></svg>
        <span class="md:hidden">{{ $t('appToolbar.changeLanguage') }}</span>
    </button>
</template>

<style scoped>

</style>
