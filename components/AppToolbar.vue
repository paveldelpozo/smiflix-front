<script setup lang="ts">
import {useAccountsStore} from "~/store/accounts";
import SwapThemeButton from "~/components/SwapThemeButton.vue";

const accountsStore = useAccountsStore();
const { getCurrentAccount, clearCurrentAccount } = accountsStore;
const router = useRouter()

function toggleNavbar() {
    const menu = document.getElementById('navbar-default')
    console.log(menu)
    if (menu) {
        menu.classList.toggle('hidden')
    }
}

function logout() {
    clearCurrentAccount()
    router.push('/')
}
</script>

<template>
    <nav class="bg-white border-gray-200 dark:bg-sky-950">
        <div class="flex flex-wrap items-center justify-between mx-auto p-4">
            <nuxt-link to="/" class="flex items-center space-x-2 rtl:space-x-reverse">
                <img src="/images/smiflix-logo.svg" class="h-8" alt="SmiFlix Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-sky-400 dark:text-white">SmiFlix</span>
            </nuxt-link>
            <button @click="toggleNavbar" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Abrir menú</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-gray-700">
                    <li>
                        <swap-theme-button></swap-theme-button>
                    </li>
                    <li>
                        <a href="#" class="inline-flex justify-center items-center text-sky-400">
                            <svg class="w-8 h-8 fill-sky-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" /></svg>
                            <span class="md:hidden">GitHub</span>
                        </a>
                    </li>
                    <li v-if="getCurrentAccount()">
                        <button
                            @click="logout"
                            class="inline-flex justify-center items-center text-sky-400"
                        >
                            <img
                                class="w-8 h-8 mr-2 rounded"
                                :src="getCurrentAccount()?.avatar"
                                :alt="`${getCurrentAccount()?.name} avatar`"
                            >
                            <span class="md:hidden">{{ getCurrentAccount()?.name }}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>
