import {defineStore} from 'pinia'
import type {Account} from "~/models/Account";

export const useAccountsStore = defineStore('accountsStore', () => {
    const accounts = ref<Account[]>(JSON.parse(localStorage.getItem('accounts') ?? '[]') ?? []);
    const currentAccount = ref<string|null>(JSON.parse(localStorage.getItem('currentAccount') ?? 'null') ?? null);

    function addAccount(account: Account) {
        window.console.log('addAccount >>', account)
        accounts.value.push(account);
        localStorage.setItem('accounts', JSON.stringify(accounts.value));
    }

    function setCurrentAccount(account: Account) {
        currentAccount.value = account.id
        localStorage.setItem('currentAccount', JSON.stringify(account.id));
    }

    function getCurrentAccount(): Account|null {
        //@ts-ignore
        return accounts.value.find(account => account.id === currentAccount.value) ?? null
    }

    function clearCurrentAccount() {
        currentAccount.value = null
        localStorage.removeItem('currentAccount')
    }

    return {
        accounts,
        currentAccount,
        addAccount,
        setCurrentAccount,
        getCurrentAccount,
        clearCurrentAccount
    }
})
