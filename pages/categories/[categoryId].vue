<script setup lang="ts">
import {YoutubeService} from "~/services/YoutubeService";
import type {Playlist} from "~/models/Playlist";

const config = useRuntimeConfig()
const route = useRoute()
const categoryId = <string>route.params.categoryId ?? ''
const youtubeService = new YoutubeService(<string>config.public.youtubeApiKey ?? '')

let loading = ref(true)
let playlist = ref<Playlist|null>(null)
let videos = ref<any[]>([])
let totalVideos = ref<number>(0)

async function getPlaylistInfo() {
    playlist.value = await youtubeService.getPlaylistDetails(categoryId)
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

onBeforeMount(() => {
    init()
})
</script>

<template>
    <div class="categories-details-page">
        <div class="breadcrumb">
            <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li class="inline-flex items-center">
                        <nuxt-link to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                            </svg>
                            Home
                        </nuxt-link>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <nuxt-link to="/categories/" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Categories</nuxt-link>
                        </div>
                    </li>
                    <li aria-current="page" v-if="playlist">
                        <div class="flex items-center">
                            <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span class="ms-1 text-sm font-medium text-blue-600 md:ms-2 dark:text-white w-32 md:w-64 truncate">{{ playlist.title }}</span>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>

        <div v-if="loading">
            Cargando...
        </div>

        <div v-if="!playlist && !loading">
            <h2>La categoría no se ha encontrado</h2>
        </div>

        <div v-if="playlist" class="categories-details mt-4">
            <section class="bg-center bg-no-repeat bg-cover rounded-lg" :style="`background-image: url(${playlist.imageBackground})`">
                <div class="bg-gradient-to-t from-black/90 to-black/75 bg-blend-multiply min-h-64 rounded-lg">
                    <div class="px-4 mx-auto max-w-screen-2xl text-center py-24 lg:pt-64 lg:pb-24">
                        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">{{ playlist.title }}</h1>
                        <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-16">{{ playlist.description }}</p>
                        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
    <!--                        <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">-->
    <!--                            Get started-->
    <!--                            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">-->
    <!--                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>-->
    <!--                            </svg>-->
    <!--                        </a>-->
    <!--                        <a href="#" class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">-->
    <!--                            Learn more-->
    <!--                        </a>-->
                        </div>
                    </div>
                </div>
            </section>

            <h3 class="md:text-2xl flex items-center space-x-3 text-lg mt-4">Videos</h3>
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

</style>
