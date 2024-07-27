<script setup lang="ts">
import {YoutubeService} from "~/services/YoutubeService";
import BreadCrumb from "~/components/BreadCrumb.vue";
// import Slider from "~/components/Slider.vue";
import LoadingBar from "~/components/LoadingBar.vue";
import type {PlaylistItem} from "~/models/Playlist";

const config = useRuntimeConfig()
const youtubeService = new YoutubeService(<string>config.public.youtubeApiKey ?? '')
const { locale, t } = useI18n()
const breadCrumbItems = [
    {
        text: t('pages.home.home'),
        to: '/'
    },
    {
        text: t('pages.categories.categories'),
        to: null
    }
]
const channelIDs: { [key: string]: string } = {
    es: <string>config.public.channelIdEs ?? '',
    en: <string>config.public.channelIdEn ?? ''
};

let loading = ref(true)
let playlists = ref<any[]>([])
let randomVideos = ref<PlaylistItem[]>([])

async function getChannels() {
    let response = await youtubeService.getChannelPlayLists(channelIDs[locale.value], 10)
    playlists.value = response.items
}

// async function getRandomVideos() {
//     randomVideos.value = await youtubeService.getRandomVideos(channelIDs.es)
//     console.log(randomVideos.value)
// }

async function init() {
    loading.value = true
    await Promise.all([
        getChannels(),
        //getRandomVideos()
    ])
    loading.value = false
}

onBeforeMount(() => {
    init()
})
</script>

<template>
  <div class="categories">
      <bread-crumb :items="breadCrumbItems"></bread-crumb>

      <loading-bar v-model="loading"></loading-bar>

<!--      <slider :items="randomVideos" :loading="loading"></slider>-->

      <alert-message
          v-if="playlists.length === 0 && !loading"
          :message="$t('pages.categories.noCategoryFound')"
      ></alert-message>

      <div v-if="playlists.length > 0" class="categories-list p-4">
          <playlist-carousel
              v-for="(playlist, p) in playlists"
              :key="p"
              :playlist="playlist"
          ></playlist-carousel>
      </div>
  </div>
</template>
