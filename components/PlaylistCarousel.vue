<script setup lang="ts">
import {Playlist} from "~/models/Playlist";
import {YoutubeService} from "~/services/YoutubeService";
import VideoThumbnail from "~/components/VideoThumbnail.vue";

const config = useRuntimeConfig()
const props = defineProps({
    playlist: {
        type: Playlist,
        required: true
    }
})

const youtubeService = new YoutubeService(<string>config.public.youtubeApiKey ?? '')

let loading = ref(true)
let videos = ref<any[]>([])
let totalVideos = ref<number>(0)

async function getVideos(id: string) {
    let response = await youtubeService.getPlaylistVideos(id)
    videos.value = response.items;
    totalVideos.value = response.total
}

const canScrollPrev = ref(false);
const canScrollNext = ref(true);
const slider = ref<HTMLElement|null>(null);

const scrollLeft = () => {
    if (slider.value) {
        slider.value.scrollBy({
            left: -slider.value.clientWidth,
            behavior: 'smooth'
        });
    }
};

const scrollRight = () => {
    if (slider.value) {
        slider.value.scrollBy({
            left: slider.value.clientWidth,
            behavior: 'smooth'
        });
    }
};

const updateScrollButtons = () => {
    if (slider.value) {
        canScrollPrev.value = slider.value.scrollLeft > 0;
        canScrollNext.value = slider.value.scrollLeft < (slider.value.scrollWidth - slider.value.clientWidth);
    }
};


async function init() {
    loading.value = true
    if (props.playlist.id) {
        await getVideos(props.playlist.id)
    }
    loading.value = false
    updateScrollButtons();
}

onBeforeMount(() => {
    init()
})

onMounted(() => {

});
</script>

<template>
    <div class="playlist-carousel my-4">
        <nuxt-link :to="`/categories/${playlist.id}`" class="group md:text-2xl flex items-center space-x-3 text-lg text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-500 transition duration-300">
            <h3 class="truncate">{{ playlist.title }}</h3>

            <svg class="w-4 h-4 ms-2 rtl:rotate-180 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </nuxt-link>

        <div class="relative w-full rounded-lg">
            <button
                @click="scrollLeft"
                :class="{ 'hidden': !canScrollPrev }"
                class="absolute top-0 left-0 z-10 pr-4 pl-1 h-full bg-gradient-to-r from-white/100 to-white/0 dark:from-sky-950/100 dark:to-sky-950/0"
            >
                <svg class="w-16 h-16 fill-gray-600 dark:fill-white drop-shadow-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                </svg>
            </button>
            <button
                @click="scrollRight"
                :class="{ 'hidden': !canScrollNext }"
                class="absolute top-0 right-0 z-10 pl-4 pr-1 h-full bg-gradient-to-l from-white/100 to-white/0 dark:from-sky-950/100 dark:to-sky-950/0"
            >
                <svg class="w-16 h-16 fill-gray-600 dark:fill-white drop-shadow-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
            </button>
            <div
                ref="slider"
                @scroll="updateScrollButtons"
                class="slider overflow-x-scroll scrollbar-hide mb-4 relative px-0.5"
            >
                <div class="flex snap-x snap-mandatory gap-4 w-max my-1">
                    <template
                        v-for="(video, v) in videos"
                        :key="v"
                    >
                        <div class="bg-white snap-start w-64 h-48 rounded-lg my-2 transition ease-in-out hover:scale-110">
                            <video-thumbnail :category-id="<string>playlist.id" :video="video"></video-thumbnail>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
