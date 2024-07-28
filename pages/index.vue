<script setup lang="ts">
import {useAccountsStore} from "~/store/accounts";
const { t } = useI18n()
const accountsStore = useAccountsStore();
const { getCurrentAccount } = accountsStore;
useHead({
    title: 'SmiFlix',
    meta: [
        {name: 'description', content: t('pages.home.learnHasNeverBeenSoFun')}
    ],
})
</script>

<template>
    <div class="home">
        <section class="relative bg-white dark:bg-gray-900 overflow-hidden rounded-lg" style="height: calc(50vh)">
            <div class="z-1 absolute w-full h-full perspective overflow-hidden">
                <div class="absolute w-full aspect-square md:aspect-video bg-center bg-no-repeat bg-cover rotated" style="background-image: url(/images/thumbnails.jpg)"></div>
                <div class="absolute w-full h-full bg-gradient-to-t from-white/100 to-white/50 dark:from-sky-950/100 dark:to-sky-950/50"></div>
            </div>
            <div class="absolute left-0 right-0 h-full z-2 py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-48">
                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl text-sky-600 dark:text-white">{{ $t('pages.home.learnHasNeverBeenSoFun') }}</h1>
                <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-sky-200">{{ $t('pages.home.videosStoriesAndGames') }}</p>
                <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <nuxt-link :to="getCurrentAccount() ? '/categories/' : '/select-account/'" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-900">
                        {{ $t('pages.home.enterButton') }}
                        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </nuxt-link>
                </div>
            </div>
        </section>

        <div class="divider rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                <path class="fill-orange" opacity="0.33" d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7 c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z"></path>
                <path class="fill-orange" opacity="0.66" d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1 s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z"></path>
                <path class="fill-orange" d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,44.9,89.9,52.5C28.6,63.7,0,0,0,0 h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z"></path>
            </svg>
        </div>

        <section class="bg-orange">
            <div class="px-4 mx-auto max-w-screen-2xl py-4 md:py-12 grid grid-cols-1 md:grid-cols-2">
                <div class="px-8 md:px-16 lg:px-24">
                    <h2 class="mb-4 text-2xl font-extrabold tracking-tight leading-none text-white md:text-3xl lg:text-4xl">{{ $t('pages.home.custom360Education') }}</h2>
                    <p class="mb-8 text-lg font-normal text-orange-100 lg:text-xl">{{ $t('pages.home.moreOf14000activities') }}</p>
                    <p>{{ $t('pages.home.developedByEducators') }}</p>
                </div>
                <div class="px-8 md:px-16 lg:px-24">
                    <img src="/images/Multidispositivo.png" :alt="$t('pages.home.imageComputerTabletMobile')">
                </div>
            </div>
            <div class="px-4 mx-auto max-w-screen-2xl py-4 md:py-12 grid grid-cols-1 md:grid-cols-2">
                <div class="px-8 md:px-16 lg:px-24">
                    <img class="rounded-lg shadow-lg mb-4" src="/images/School-And-People-C-405104033.jpg" :alt="$t('pages.home.imageKidsHavingFun')">
                </div>
                <div class="px-8 md:px-16 lg:px-24">
                    <h2 class="mb-4 text-2xl font-extrabold tracking-tight leading-none text-white md:text-3xl lg:text-4xl">{{ $t('pages.home.learnHasNeverBeenSoFun') }}</h2>
                    <p class="mb-8 text-lg font-normal text-orange-100 lg:text-xl">{{ $t('pages.home.videosStoriesAndGames') }}</p>
                    <p>{{ $t('pages.home.discoverMoreThan14000activities') }}</p>
                </div>
            </div>
        </section>

        <div class="divider">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                <path class="fill-orange" opacity="0.33" d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7 c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z"></path>
                <path class="fill-orange" opacity="0.66" d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1 s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z"></path>
                <path class="fill-orange" d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,44.9,89.9,52.5C28.6,63.7,0,0,0,0 h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z"></path>
            </svg>
        </div>
    </div>
</template>

<style scoped>

</style>
