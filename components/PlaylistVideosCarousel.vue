<script setup lang="ts">
import {PlaylistItem} from "~/models/Playlist";

export interface Props {
    categoryId: string
    videos: PlaylistItem[]
    total: number
}

const props = withDefaults(defineProps<Props>(),{
    videos: () => []
})
</script>

<template>
    <div class="playlist-videos-carousel">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
                v-for="(video, v) in props.videos"
                :key="v"
                class="video-thumbnail"
            >
                <nuxt-link :to="`/categories/${props.categoryId}/videos/${video.id}`">
                    <section class="bg-center bg-no-repeat bg-cover rounded-lg group" :style="`background-image: url(${video.imageBackground})`">
                        <div class="bg-gradient-to-t from-black/90 to-black/75 bg-blend-multiply opacity-100 md:opacity-100 lg:opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg">
                            <div class="px-4 mx-auto max-w-screen-2xl text-center pt-24 pb-4 md:pt-28 md:pb-8 lg:pt-28 lg:pb-4">
                                <h3 class="mb-4 text-sm font-extrabold tracking-tight leading-none text-white md:text-xl opacity-100 -translate-y-0 lg:opacity-0 md:-translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">{{ video.title }}</h3>
                            </div>
                        </div>
                    </section>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
