<script setup lang="ts">
export interface BreadCrumb {
    text: string
    to: string|null
}

export interface Props {
    items: BreadCrumb[]
}

const props = withDefaults(defineProps<Props>(),{
    items: () => []
})
</script>

<template>
    <div class="breadcrumb shadow-lg">
        <nav class="flex px-4 py-4 border-b border-sky-100 dark:border-sky-800 bg-sky-50 dark:bg-sky-900 shadow-inner" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <template v-for="(item, i) in items" :key="i">
                    <li v-if="i < (items.length - 1)" class="inline-flex items-center">
                        <nuxt-link :to="<string>item.to" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-sky-600 dark:text-white dark:hover:text-sky-300">
                            <svg v-if="i === 0" class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                            </svg>
                            <svg v-if="i > 0" class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span class=" max-w-64 truncate">{{ item.text }}</span>
                        </nuxt-link>
                    </li>
                    <li v-else aria-current="page">
                        <div class="flex items-center cursor-default">
                            <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span class="ms-1 text-sm font-medium text-sky-600 md:ms-2 dark:text-sky-300 max-w-64 truncate">{{ item.text }}</span>
                        </div>
                    </li>
                </template>
            </ol>
        </nav>
    </div>
</template>

<style scoped>

</style>
