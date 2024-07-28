<script setup lang="ts">
import {YoutubeService} from "~/services/YoutubeService";
import type {Video} from "~/models/Video";
import type {BreadCrumb} from "~/components/BreadCrumb.vue";
import type {Playlist} from "~/models/Playlist";
import LoadingBar from "~/components/LoadingBar.vue";
import {useAccountsStore} from "~/store/accounts";

const config = useRuntimeConfig()
const route = useRoute()
const accountsStore = useAccountsStore();
const { getCurrentAccount, addViewVideoWithCurrentTime } = accountsStore;
const videoId = <string>route.params.videoId ?? ''
const categoryId = <string>route.params.categoryId ?? ''
const youtubeService = new YoutubeService(<string>config.public.youtubeApiKey ?? '')
const startTime = ref(0)
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
let video = ref<Video|null>(null)
let showAllDescription = ref(false)

async function getPlaylistInfo() {
    playlist.value = await youtubeService.getPlaylistDetails(categoryId)
    if (playlist.value) {
        breadCrumbItems.value.push({
            text: playlist.value.title,
            to: `/categories/${categoryId}/`
        })
    }
}

async function getVideo() {
    video.value = await youtubeService.getVideoDetails(videoId)
    if (video.value) {
        breadCrumbItems.value.push({
            text: video.value.title,
            to: null
        })
    }
}

function updateCurrentTime(currentTime: number) {
    if (video.value) {
        addViewVideoWithCurrentTime(<Video>video.value, currentTime)
    }
}

function getStartTime() {
    const account = getCurrentAccount()
    if (account?.views[videoId]) {
        startTime.value = account.views[videoId].currentTime
    }
}

async function init() {
    loading.value = true
    await getPlaylistInfo()
    await getVideo()
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
    getStartTime()
})

useHead({
    title: `SmiFlix | ${t('pages.categories.categories')} | ${playlist.value?.title ?? t('pages.categories.selectedCategoryNotFound')} | ${video.value?.title ?? t('pages.video.selectedVideoNotFound')}`,
    meta: [
        {name: 'description', content: t('pages.home.learnHasNeverBeenSoFun')}
    ],
})
</script>

<template>
    <div class="video-details-page">
        <bread-crumb :items="breadCrumbItems"></bread-crumb>

        <loading-bar v-model="loading"></loading-bar>

        <alert-message
            v-if="!video && !loading"
            :message="$t('pages.video.selectedVideoNotFound')"
        ></alert-message>

        <alert-message
            v-if="!playlist && video && !loading"
            type="warning"
            :message="$t('pages.categories.selectedCategoryNotFound')"
        ></alert-message>

        <div v-if="video" class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
            <div class="md:col-span-3">
                <video-player
                    v-if="videoId"
                    :video-id="videoId"
                    :start-time="startTime"
                    :duration="video.duration"
                    :seconds="video.seconds"
                    @update:current-time="updateCurrentTime"
                ></video-player>
            </div>

            <div class=" bg-sky-50 dark:bg-sky-900 rounded-md p-4">
                <h2 class="mb-4 text-2xl font-extrabold tracking-tight leading-none text-sky-400">{{ video.title }}</h2>
                <div class="relative mb-4">
                    <p class="text-base font-normal text-gray-900 dark:text-white overflow-y-auto scrollbar-hide" :class="showAllDescription ? 'max-h-full' : 'max-h-48'">
                        {{ video.description }}
                    </p>
                    <button @click="showAllDescription = !showAllDescription" class="w-full flex justify-center p-2 z-10">
                        <svg v-if="!showAllDescription" class="w-4 h-4 ms-2 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                        <svg v-if="showAllDescription" class="w-4 h-4 ms-2 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /></svg>
                    </button>
                </div>

                <p class="mb-4 text-sm text-gray-500 dark:text-sky-400">
                    {{ $t('pages.video.uploadDate') }}: {{ YoutubeService.formatDate(video.publishedAt, 'es-ES') }}
                </p>

                <div class="flex gap-4 mb-4">
                    <span class="inline-flex justify-center items-center py-2 px-5 text-base font-medium text-center text-white rounded-lg bg-orange-400 hover:bg-orange-300 focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-900">
                        {{ YoutubeService.formatNumberForHumans(video.views) }}
                        <svg class="w-5 h-5 ms-2 fill-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                        </svg>
                        <span class="sr-only">{{ $t('pages.video.views') }}</span>
                    </span>

                    <span class="inline-flex justify-center items-center py-2 px-5 text-base font-medium text-center text-white rounded-lg bg-orange-400 hover:bg-orange-300 focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-900">
                        {{ YoutubeService.formatNumberForHumans(video.likes) }}
                        <svg class="w-5 h-5 ms-2 fill-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" />
                        </svg>
                        <span class="sr-only">{{ $t('pages.video.likes') }}</span>
                    </span>

                    <span class="inline-flex justify-center items-center py-2 px-5 text-base font-medium text-center text-white rounded-lg bg-orange-400 hover:bg-orange-300 focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-900">
                        {{ YoutubeService.formatNumberForHumans(video.dislikes) }}
                        <svg class="w-5 h-5 ms-2 fill-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z" />
                        </svg>
                        <span class="sr-only">{{ $t('pages.video.dislikes') }}</span>
                    </span>
                </div>

                <h3 class="md:text-xl flex items-center space-x-3 text-md mt-4 text-black dark:text-white">{{ $t('pages.video.moreVideos') }}</h3>

            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
