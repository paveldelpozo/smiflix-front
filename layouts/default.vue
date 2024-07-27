<script setup lang="ts">
import LoadingBar from "~/components/LoadingBar.vue";
import AppToolbar from "~/components/AppToolbar.vue";

const loading = ref(false)

</script>

<template>
    <div class="layout">
        <loading-bar v-model="loading"></loading-bar>

        <app-toolbar></app-toolbar>

        <div class="pb-4 bg-white dark:bg-sky-950">
            <slot />
        </div>

        <div class="h-48">
            <p class="pt-24 text-center text-sky-950 dark:text-white text-xs">© 2024 Smile and Learn Digital Creations. Todos los derechos reservados.</p>
        </div>
    </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
.layout-enter-active,
.layout-leave-active {
    transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
    filter: grayscale(1);
}
</style>

