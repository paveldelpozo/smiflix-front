<script setup lang="ts">
import {Playlist} from "~/models/Playlist";

const props = defineProps({
    playlist: {
        type: Playlist,
        required: true
    }
})


</script>

<template>
    <div class="playlist-carousel my-4">
        <nuxt-link :to="`/categories/${playlist.id}`" class="group md:text-2xl flex items-center space-x-3 text-lg hover:text-orange-500 transition duration-300">
            <h3>{{ playlist.title }}</h3>

            <svg class="w-4 h-4 ms-2 rtl:rotate-180 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </nuxt-link>

        <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="">
            </div>
            <div>
                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="">
            </div>
            <div class="hidden md:block">
                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="">
            </div>
            <div class="hidden md:block">
                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="">
            </div>
            <div class="hidden md:block">
                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="">
            </div>
            <div class="hidden md:block">
                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
