import {defineStore} from 'pinia'

export const useThemeStore = defineStore('themeStore', () => {
    const darkMode = ref(JSON.parse(localStorage.getItem('darkMode') ?? 'false') ?? false)

    function swapDarkMode() {
        darkMode.value = !darkMode.value
        localStorage.setItem('darkMode', darkMode.value)
    }

    function setDarkMode(state: boolean) {
        darkMode.value = state
        localStorage.setItem('darkMode', darkMode.value)
        window.console.log('Click >>', darkMode.value)
    }

    return {
        darkMode,
        swapDarkMode,
        setDarkMode
    }
})
