<script setup lang="ts">
import {Video} from "~/models/Video";
import type {PlaylistItem} from "~/models/Playlist";
import {useAccountsStore} from "~/store/accounts";

export interface Props {
    video: Video|PlaylistItem
    categoryId: string
}

const props = defineProps<Props>()
const accountsStore = useAccountsStore();
const { getCurrentAccount } = accountsStore;
const account = getCurrentAccount()
const currentVideoIsView = computed(() => {
    return account && props.video.id && account.views[props.video.id]
})
const progress = ref(0)

if (currentVideoIsView.value) {
    window.console.log('Current Video is View >>', currentVideoIsView.value)
    progress.value = currentVideoIsView.value.currentTime / currentVideoIsView.value.seconds * 100
}
</script>

<template>
    <nuxt-link :to="`/categories/${categoryId}/videos/${video.id}`" class="h-full rounded-lg">
        <section
            class="relative h-full bg-center bg-no-repeat bg-cover rounded-lg group overflow-hidden shadow-md"
            :style="`background-image: url(${video.imageBackground})`"
        >
            <div class="h-full bg-gradient-to-t from-black/90 to-black/50 bg-blend-multiply opacity-100 md:opacity-100 lg:opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg">
                <div class="flex flex-col justify-center items-center mx-auto text-center p-4 h-full">
                    <h3 class="mb-4 text-sm font-extrabold tracking-tight leading-none text-white md:text-lg opacity-100 -translate-y-0 lg:opacity-0 md:-translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">
                        {{ video.title }}
                    </h3>
                </div>
            </div>
            <div
                v-if="currentVideoIsView"
                class="absolute top-1 right-2 drop-shadow-lg"
            >
                <svg class="w-8 h-8 fill-white drop-shadow-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                </svg>
            </div>
            <div
                v-if="currentVideoIsView"
                class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200"
            >
                <div class="absolute h-full bg-orange-500 flex items-center justify-end" :style="`width: ${progress ? progress + '%' : 0}`"></div>
            </div>
        </section>
    </nuxt-link>
</template>

<style scoped>

</style>
