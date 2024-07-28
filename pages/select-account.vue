<script setup lang="ts">
import {Account} from "~/models/Account";
import {storeToRefs} from "pinia";
import {useAccountsStore} from "~/store/accounts";
const { t } = useI18n()
const avatars = [
    '/images/avatars/bird.svg',
    '/images/avatars/cat.svg',
    '/images/avatars/dog.svg',
    '/images/avatars/fish.svg',
    '/images/avatars/rabbit.svg',
    '/images/avatars/turtle.svg',
];
const accountsStore = useAccountsStore();
const { accounts, currentAccount } = storeToRefs(accountsStore);
const router = useRouter()
const newAccount = ref<Account>(new Account())
const creatingAccount = ref(false)
const inputName = ref<HTMLElement|null>(null)
const { addAccount, setCurrentAccount, getCurrentAccount } = accountsStore

function createAccount() {
    newAccount.value = new Account()
    creatingAccount.value = true
    nextTick(() => {
        if (inputName.value) {
            inputName.value.focus()
        }
    })
}
function createAccountHandler() {
    addAccount({...newAccount.value})
    creatingAccount.value = false
}

function selectAccount(account: Account) {
    setCurrentAccount(account)
    router.push('/categories/')
}

onMounted(() => {
    if (accounts.value.length === 0) {
        createAccount()
    }
})

useHead({
    title: `SmiFlix | ${t('pages.selectAccount.selectAccount')}`,
    meta: [
        {name: 'description', content: t('pages.home.learnHasNeverBeenSoFun')}
    ],
})
</script>

<template>
    <div class="select-account-page bg-white dark:bg-sky-900 w-full h-full">
        <section v-if="!creatingAccount" class="w-full px-4 py-12 lg:pt-12 lg:pb-24">
            <h1 class="mb-4 text-2xl font-extrabold text-center tracking-tight leading-none text-sky-500 dark:text-white md:text-3xl lg:text-4xl">{{ $t('pages.selectAccount.howAreYou') }}</h1>

            <div class="mx-0 md:mx-12 lg:mx-24 grid grid-cols-2 md:grid-cols-5 gap-4 place-content-center">
                <button
                    v-for="(account, a) in accounts"
                    :key="a"
                    @click="selectAccount(account)"
                    class="flex flex-col justify-center items-center group cursor-pointer"
                >
                    <img :src="account.avatar" :alt="`Avatar ${a + 1}`" class="rounded-lg mb-2">
                    <span class="text-lg md:text-xl lg:text-2xl font-extrabold text-center text-orange-400">{{ account.name }}</span>
                </button>

                <button v-if="accounts.length < 4" @click="createAccount" class="flex flex-col justify-center items-center group cursor-pointer">
                    <svg class="aspect-square fill-orange-400 group-hover:fill-orange-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                    <span class="text-lg md:text-xl lg:text-2xl font-extrabold text-center text-orange-400">{{ $t('pages.selectAccount.addAccount') }}</span>
                </button>
            </div>
        </section>

        <section v-if="creatingAccount" class="w-full px-4 py-12 lg:pt-12 lg:pb-24 flex flex-col justify-center items-center">
            <h1 class="mb-4 text-2xl font-extrabold text-center tracking-tight leading-none text-sky-500 dark:text-white md:text-3xl lg:text-4xl">{{ $t('pages.selectAccount.createAccount') }}</h1>

            <div class="mb-6 w-full lg:w-1/2">
                <label for="name" class="block mb-2 text-md md:text-lg lg:text-xl font-medium text-gray-900 dark:text-white">{{ $t('pages.selectAccount.nameField') }}</label>
                <input ref="inputName" v-model.trim="newAccount.name" type="text" id="name" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>

            <div class="mx-0 mb-6 md:mx-12 lg:mx-24 grid grid-cols-2 md:grid-cols-6 gap-4">
                <button
                    v-for="(avatar, a) in avatars"
                    :key="a"
                    class="flex flex-col justify-center items-center p-2"
                    :class="newAccount.avatar === avatar ? 'border-2 md:border-4 rounded-xl border-orange-400' : ''"
                    @click="newAccount.avatar = avatar"
                >
                    <img :src="avatar" :alt="`Avatar ${a + 1}`" class="rounded-lg">
                </button>
            </div>

            <div class="flex gap-8 sm:flex-row">
                <button
                    v-if="accounts.length > 0"
                    @click="creatingAccount = false"
                    class="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-orange-400 rounded-lg border-2 border-orange-400 bg-white-700 hover:bg-orange-100 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                    {{ $t('pages.selectAccount.cancelButton') }}
                </button>
                <button
                    @click="createAccountHandler"
                    class="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-orange-400 hover:bg-orange-300 focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-900 disabled:opacity-25"
                    :disabled="newAccount.name === '' || newAccount.avatar === ''"
                >
                    {{ $t('pages.selectAccount.createAccountButton') }}
                </button>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>
