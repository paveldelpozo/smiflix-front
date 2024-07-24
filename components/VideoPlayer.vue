<template>
    <div>
        <div id="player"></div>
        <p>Tiempo reproducido: {{ currentTime }} segundos</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
    props: {
        videoId: {
            type: String,
            required: true,
        },
        startTime: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        const player = ref<YT.Player | null>(null);
        const currentTime = ref(0);
        const intervalId = ref<number | null>(null);

        const loadYouTubeAPI = () => {
            return new Promise<void>((resolve) => {
                const tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                (window as any).onYouTubeIframeAPIReady = () => {
                    resolve();
                };
            });
        };

        const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
            if (event.data == YT.PlayerState.PLAYING) {
                intervalId.value = window.setInterval(() => {
                    if (player.value) {
                        currentTime.value = Math.floor(player.value.getCurrentTime());
                    }
                }, 1000);
            } else {
                if (intervalId.value) {
                    clearInterval(intervalId.value);
                }
            }
        };

        onMounted(async () => {
            await loadYouTubeAPI();
            player.value = new YT.Player('player', {
                height: '360',
                width: '640',
                videoId: props.videoId,
                playerVars: {
                    start: props.startTime,
                },
                events: {
                    onStateChange: onPlayerStateChange,
                },
            });
        });

        onBeforeUnmount(() => {
            if (intervalId.value) {
                clearInterval(intervalId.value);
            }
        });

        return {
            currentTime,
        };
    },
});
</script>

<style>
#player {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
}
</style>
