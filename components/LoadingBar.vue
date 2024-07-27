<script setup lang="ts">
export interface Props {
    color?: string
}

const props = withDefaults(defineProps<Props>(),{
    color: () => 'sky'
})

const model = defineModel()
</script>

<template>
    <div v-if="model" class="w-full absolute">
        <div :class="`h-1.5 w-full bg-${color}-100 overflow-hidden`">
            <div :class="`progress w-full h-full bg-${color}-500 left-right`"></div>
        </div>
    </div>
</template>

<style scoped>

</style>
