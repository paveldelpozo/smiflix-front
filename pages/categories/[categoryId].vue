<script setup lang="ts">
import {YoutubeService} from "~/services/YoutubeService";
import type {Playlist} from "~/models/Playlist";
import type {BreadCrumb} from "~/components/BreadCrumb.vue";
import LoadingBar from "~/components/LoadingBar.vue";
import {useAccountsStore} from "~/store/accounts";

const config = useRuntimeConfig()
const route = useRoute()
const accountsStore = useAccountsStore();
const { getCurrentAccount, swapSubscriptionToCurrentAccount } = accountsStore;
const categoryId = <string>route.params.categoryId ?? ''
const youtubeService = new YoutubeService(<string>config.public.youtubeApiKey ?? '')
const { locale, t } = useI18n()
const breadCrumbItems = ref<BreadCrumb[]>([
    {
        text: t('pages.home.home'),
        to: '/'
    },
    {
        text: t('pages.categories.categories'),
        to: '/categories/'
    }
])

let loading = ref(true)
let playlist = ref<Playlist|null>(null)
let videos = ref<any[]>([])
let totalVideos = ref<number>(0)

let subscribed = computed(() => {
    const account = getCurrentAccount()
    if (account) {
        return Object.keys(account.subscriptions).includes(categoryId)
    }
})

async function getPlaylistInfo() {
    playlist.value = await youtubeService.getPlaylistDetails(categoryId)
    if (playlist.value) {
        breadCrumbItems.value.push({
            text: playlist.value.title,
            to: null
        })
    }
}

async function getVideos() {
    let response = await youtubeService.getPlaylistVideos(categoryId)
    videos.value = response.items;
    totalVideos.value = response.total
}

async function init() {
    loading.value = true
    await Promise.all([
        getPlaylistInfo(),
        getVideos(),
    ])
    loading.value = false
}

watch(locale, () => {
    breadCrumbItems.value = [
        {
            text: t('pages.home.home'),
            to: '/'
        },
        {
            text: t('pages.categories.categories'),
            to: '/categories/'
        }
    ]
    init()
})

onBeforeMount(() => {
    init()
})

useHead({
    title: `SmiFlix | ${t('pages.categories.categories')} | ${playlist.value?.title ?? t('pages.categories.selectedCategoryNotFound')}`,
    meta: [
        {name: 'description', content: t('pages.home.learnHasNeverBeenSoFun')}
    ],
})
</script>

<template>
    <div class="categories-details-page">
        <bread-crumb :items="breadCrumbItems"></bread-crumb>

        <loading-bar v-model="loading"></loading-bar>

        <alert-message
            v-if="!playlist && !loading"
            :message="$t('pages.categories.selectedCategoryNotFound')"
        ></alert-message>

        <div v-if="playlist" class="categories-details m-4">
            <section class="bg-center bg-no-repeat bg-cover rounded-lg" :style="`background-image: url(${playlist.imageBackground})`">
                <div class="bg-gradient-to-r from-black/90 to-black/50 bg-blend-multiply min-h-64 rounded-lg">
                    <div class="px-4 mx-auto lg:mx-10 max-w-screen-2xl py-12 lg:pt-12 lg:pb-24 w-100 lg:w-1/3">
                        <h1 class="mb-4 text-2xl font-extrabold tracking-tight leading-none text-white md:text-3xl lg:text-4xl">{{ playlist.title }}</h1>
                        <p class="mb-8 text-md font-normal text-gray-300 lg:text-lg max-h-48 overflow-y-auto scrollbar-hide">
                            {{ playlist.description }}
                        </p>
                        <div class="flex space-y-4 sm:flex-row sm:justify-start sm:space-y-0">
                            <button
                                @click="swapSubscriptionToCurrentAccount(playlist)"
                                class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-orange-400 hover:bg-orange-300 focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-900"
                            >
                                <svg v-if="subscribed" class="w-4 h-4 mr-2 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>
                                <svg v-if="!subscribed" class="w-4 h-4 mr-2 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
                                {{ subscribed ? $t('pages.categories.unsubscribe') : $t('pages.categories.subscribe') }}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <h3 class="md:text-2xl flex items-center space-x-3 text-lg mt-4 mb-2 text-black dark:text-white">Videos</h3>
            <div class="categories-videos">
                <playlist-videos-carousel
                    :category-id="categoryId"
                    :videos="videos"
                    :total="totalVideos"
                ></playlist-videos-carousel>
            </div>
        </div>
    </div>

</template>

<style scoped>
.progress {
    animation: progress 1s infinite linear;
}

.left-right {
    transform-origin: 0% 50%;
}
@keyframes progress {
    0% {
        transform:  translateX(0) scaleX(0);
    }
    40% {
        transform:  translateX(0) scaleX(0.4);
    }
    100% {
        transform:  translateX(100%) scaleX(0.5);
    }
}
</style>
