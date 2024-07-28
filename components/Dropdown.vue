<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import type Ref from 'vue'

interface Props {
    modelValue?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const isOpen = ref(props.modelValue ?? false);

watch(isOpen, (newValue) => {
    emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
    isOpen.value = newValue ?? false;
});

const dropdownRef: Ref<HTMLElement | null> = ref(null);
const dropdownContentRef: Ref<HTMLElement | null> = ref(null);

function toggleDropdown() {
    isOpen.value = !isOpen.value;
}

function handleClickOutside(event: MouseEvent) {
    if ((dropdownRef.value && !dropdownRef.value.contains(event.target as Node))
        || (dropdownContentRef.value && dropdownContentRef.value.contains(event.target as Node))
    ) {
        isOpen.value = false;
    }

}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div class="relative inline-block text-left" ref="dropdownRef">
        <div>
            <slot name="button" :toggleDropdown="toggleDropdown">
                <button @click="toggleDropdown" type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                    Dropdown
                    <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.94l3.71-3.75a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0l-4.25-4.25a.75.75 0 01-.02-1.06z" clip-rule="evenodd" />
                    </svg>
                </button>
            </slot>
        </div>

        <transition name="fade">
            <div v-if="isOpen" ref="dropdownContentRef" class="z-20 origin-top-left md:origin-top-right absolute md:right-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                    <slot name="content"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
