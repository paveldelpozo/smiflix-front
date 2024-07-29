<script setup lang="ts">
import YouTube from 'vue3-youtube'
import {YoutubeService} from "~/services/YoutubeService";

export interface Props {
    videoId: string
    startTime?: number
    duration?: string|null
    seconds?: number|null
}

const props = withDefaults(defineProps<Props>(),{
    startTime: () => 0,
    seconds: () => 0
})
const emit = defineEmits(['update:currentTime']);
const player = ref<YT.Player|null>(null);
const wrapper = ref<HTMLElement|null>(null);

const youtubeOptions = ref({
    autoplay: 0,
    controls: 0,
    enablejsapi: 1,
    //fs: 1,
    rel: 0,
    start: Math.floor(props.startTime),
    hl: 'es-ES'
})
const isPlaying = ref(false)
const currentTime = ref(props.startTime)
const intervalId = ref<number | null>(null)
//const settingSize = ref(false)
const width = ref(640)
const height = ref(640 * 9 / 16)
const progress = ref(0)

function playPause() {
    if (player.value) {
        if (isPlaying.value) {
            player.value.pauseVideo()
        } else {
            player.value.playVideo()
        }
    }
}

function stop() {
    if (player.value) {
        player.value.stopVideo()
        currentTime.value = 0;
        emit('update:currentTime', currentTime.value);
    }
}

function playHandler() {
    isPlaying.value = true
    if (player.value) {
        currentTime.value = player.value.getCurrentTime();
        emit('update:currentTime', currentTime.value);
        progress.value = currentTime.value / (props.seconds ?? 0) * 100
    }
}

function stopHandler() {
    isPlaying.value = false
    if (intervalId.value) {
        clearInterval(intervalId.value);
    }
}

function stateChange(event: any) {
    if (event.data == YT.PlayerState.PLAYING) {
        playHandler()
        intervalId.value = window.setInterval(() => {
            playHandler()
        }, 1000);
    } else {
        stopHandler()
    }
}

function setWrapperSize() {
    if (wrapper.value) {
        //settingSize.value = true
        width.value = wrapper.value.clientWidth
        height.value = Math.floor(wrapper.value.clientWidth * 9 / 16)
        // nextTick(() => {
        //     settingSize.value = false
        // })
    }
}

onMounted(() => {
    setWrapperSize()
    window.addEventListener('resize', setWrapperSize)
})

onBeforeUnmount(() => {
    stopHandler()
    window.removeEventListener('resize', setWrapperSize)
});
</script>

<template>
    <div class="video-player w-full aspect-video" ref="wrapper">
        <YouTube
            :src="`https://www.youtube.com/embed/${videoId}`"
            :vars="youtubeOptions"
            :width="width"
            :height="height"
            @state-change="stateChange"
            ref="player"
        />
        <div class="rounded-md bg-black/75">
            <div class="relative h-1 bg-gray-200">
                <div class="absolute h-full bg-orange-500 flex items-center justify-end" :style="`width: ${progress ? progress + '%' : 0}`">
                    <div class="rounded-full w-3 h-3 bg-white shadow"></div>
                </div>
            </div>
            <div class="flex justify-between items-center text-xs font-medium text-gray-500 py-2 px-4">
                <div class="w-24 text-left text-white">
                    {{ YoutubeService.formatSeconds(Math.floor(currentTime)) }}
                </div>
                <div class="flex space-x-3">
                    <button @click="stop" class="focus:outline-none disabled:opacity-50" :disabled="currentTime === 0">
                        <svg class="w-6 h-6 fill-orange-500 hover:fill-orange-400 transition duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" />
                        </svg>
                    </button>

                    <button @click="playPause" class="rounded-full w-8 h-8 flex items-center justify-center pl-0.5 ring-2 ring-orange-500 focus:outline-none hover:bg-orange-400 group transition duration-300">
                        <svg v-if="!isPlaying" class="w-5 h-5 fill-orange-500 group-hover:fill-white transition duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        <svg v-if="isPlaying" class="w-5 h-5 fill-orange-400 group-hover:fill-white transition duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                        </svg>
                    </button>

<!--                    <button class="focus:outline-none">-->
<!--                        <svg class="w-6 h-6 fill-orange-500 hover:fill-orange-400 transition duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">-->
<!--                            <path d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" />-->
<!--                        </svg>-->
<!--                    </button>-->
                </div>
                <div class="w-24 text-right text-white">
                    {{ $t('pages.video.duration') }}: {{ duration }}
                </div>
            </div>
        </div>
    </div>
</template>
