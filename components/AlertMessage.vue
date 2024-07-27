<script setup lang="ts">
export interface Props {
    type?: 'success' | 'warning' | 'error' | 'info',
    message: string,
}
const colors = {
    success: 'green',
    warning: 'amber',
    error: 'red',
    info: 'blue',
}
const icons = {
    success: `<path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />`,
    warning: `<path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" />`,
    error: `<path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />`,
    info: `<path d="M5 3H19C20.1 3 21 3.89 21 5V19C21 19.53 20.79 20.04 20.41 20.41C20.04 20.79 19.53 21 19 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V5C3 3.89 3.89 3 5 3M12.3 7.29C12.11 7.5 12 7.74 12 8C12 8.27 12.11 8.5 12.3 8.71C12.5 8.9 12.74 9 13 9C13.27 9 13.5 8.9 13.71 8.71C13.9 8.5 14 8.27 14 8C14 7.74 13.9 7.5 13.71 7.29C13.5 7.11 13.27 7 13 7C12.74 7 12.5 7.11 12.3 7.29M9.8 11.97C9.7 12.06 9.7 12.07 9.77 12.17L9.82 12.25L9.85 12.31C9.92 12.44 9.93 12.44 10.04 12.36C10.17 12.27 10.39 12.13 10.76 11.91C11.68 11.32 11.5 12 11.09 13.5C10.87 14.33 10.59 15.39 10.38 16.62C10.14 18.37 11.71 17.47 12.12 17.2C12.5 16.96 13.44 16.3 13.66 16.15L13.7 16.13C13.82 16.04 13.77 16 13.68 15.86L13.62 15.78C13.54 15.67 13.46 15.75 13.46 15.75L13.3 15.86C12.85 16.16 12.23 16.59 12.13 16.25C12.04 16 12.41 14.64 12.79 13.25C12.96 12.64 13.13 12 13.26 11.47L13.28 11.41C13.35 10.97 13.5 10.12 12.77 10.18C11.97 10.25 9.8 11.97 9.8 11.97Z" />`
}
const props = withDefaults(defineProps<Props>(),{
    type: () => 'error'
})

const background = computed(() => {
    const styles: { [key: string]: string } = {
        success: 'p-4 m-4 text-sm text-green-800 rounded-lg bg-gradient-to-b from-green-500/50 to-white dark:to-sky-950 dark:from-green-500/25 dark:text-green-400',
        warning: 'p-4 m-4 text-sm text-amber-800 rounded-lg bg-gradient-to-b from-amber-500/50 to-white dark:to-sky-950 dark:from-amber-500/25 dark:text-amber-400',
        error: 'p-4 m-4 text-sm text-red-800 rounded-lg bg-gradient-to-b from-red-500/50 to-white dark:to-sky-950 dark:from-red-500/25 dark:text-red-400',
        info: 'p-4 m-4 text-sm text-blue-800 rounded-lg bg-gradient-to-b from-blue-500/50 to-white dark:to-sky-950 dark:from-blue-500/25 dark:text-blue-400',
    }
    return styles[props.type] ?? styles.error
})

const iconStyle = computed(() => {
    const styles: { [key: string]: string } = {
        success: 'w-16 h-16 mb-4 fill-green-800 dark:fill-green-600',
        warning: 'w-16 h-16 mb-4 fill-amber-800 dark:fill-amber-600',
        error: 'w-16 h-16 mb-4 fill-red-800 dark:fill-red-600',
        info: 'w-16 h-16 mb-4 fill-blue-800 dark:fill-blue-600',
    }
    return styles[props.type] ?? styles.error
})
</script>

<template>
    <div :class="background" role="alert">
        <div class="flex flex-col items-center justify-center">
            <svg :class="iconStyle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-html="icons[type]"></svg>
            <p v-if="type !== 'success'" class="text-2xl font-bold">{{ $t(`alerts.${type}`) }}</p>
            <p class="text-xl">{{ message }}</p>
        </div>
    </div>
</template>

<style scoped>

</style>
