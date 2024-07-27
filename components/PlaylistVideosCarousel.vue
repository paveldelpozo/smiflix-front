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
                class="video-thumbnail w-full h-48 transition ease-in-out hover:scale-105"
            >
                <video-thumbnail :category-id="categoryId" :video="video"></video-thumbnail>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
