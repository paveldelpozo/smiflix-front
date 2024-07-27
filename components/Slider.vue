<script setup lang="ts">
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
    updateScrollButtons();
}

onBeforeMount(() => {
    init()
})
</script>

<template>
    <section class="relative m-4 rounded-lg bg-black/25 dark:bg-white/25">
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
            <div class="flex snap-x snap-mandatory w-max">
                <div class="snap-center py-8 px-4 mx-auto text-center lg:py-48" style="width: calc(100vw - 56px)">
                    Slider...
                </div>
                <div class="snap-center py-8 px-4 mx-auto text-center lg:py-48" style="width: calc(100vw - 56px)">
                    Slider...
                </div>
                <div class="snap-center py-8 px-4 mx-auto text-center lg:py-48" style="width: calc(100vw - 56px)">
                    Slider...
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>
