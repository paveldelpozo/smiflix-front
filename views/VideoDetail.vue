<script setup lang="ts">
import {YoutubeService} from "~/services/YoutubeService";
import type {Video} from "~/models/Video";

const config = useRuntimeConfig()
const route = useRoute()
const videoId = <string>route.params.videoId ?? ''
const categoryId = <string>route.params.categoryId ?? ''

const youtubeService = new YoutubeService(<string>config.public.youtubeApiKey ?? '')

let loading = ref(true)
let video = ref<Video|null>(null)

async function init() {
    loading.value = true
    let response = await youtubeService.getVideoDetails(videoId)
    window.console.log(response);
    video.value = response
    loading.value = false
}

onBeforeMount(() => {
    init()
})
</script>

<template>
    <div class="video-details-page">
        <div v-if="video">
            <div class="back">
                <nuxt-link :to="`/categories/${categoryId}`">
                    Volver
                </nuxt-link>
            </div>
            <video-player
                v-if="videoId"
                :video-id="videoId"
                :start-time="0"
            ></video-player>
        </div>


        <!--      <VideoPlayer v-if="videoID" :videoId="videoID" :start-time="50" />-->
    </div>
</template>

<style scoped>

</style>
