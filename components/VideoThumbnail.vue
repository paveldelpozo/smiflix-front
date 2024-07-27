<script setup lang="ts">
import {Video} from "~/models/Video";
import type {PlaylistItem} from "~/models/Playlist";

export interface Props {
    video: Video|PlaylistItem
    categoryId: string
}

const props = defineProps<Props>()
</script>

<template>
    <nuxt-link :to="`/categories/${categoryId}/videos/${video.id}`" class="h-full rounded-lg">
        <section
            class="h-full bg-center bg-no-repeat bg-cover rounded-lg group overflow-hidden shadow-md"
            :style="`background-image: url(${video.imageBackground})`"
        >
            <div class="h-full bg-gradient-to-t from-black/90 to-black/50 bg-blend-multiply opacity-100 md:opacity-100 lg:opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg">
                <div class="flex flex-col justify-center items-center mx-auto text-center p-4 h-full">
                    <h3 class="mb-4 text-sm font-extrabold tracking-tight leading-none text-white md:text-lg opacity-100 -translate-y-0 lg:opacity-0 md:-translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">
                        {{ video.title }}
                    </h3>
                </div>
            </div>
        </section>
    </nuxt-link>
</template>

<style scoped>

</style>
