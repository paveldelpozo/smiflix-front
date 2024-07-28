import {defineStore} from 'pinia'
import {type Account, Subscription, ViewVideo} from "~/models/Account";
import {Playlist} from "~/models/Playlist";
import type {Video} from "~/models/Video";

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

    function swapSubscriptionToCurrentAccount(playlist: Playlist) {
        let account = getCurrentAccount()
        if (account) {
            if (!Object.keys(account.subscriptions).includes(playlist.id ?? '')) {
                const subscription = new Subscription(playlist)
                account.subscriptions[subscription.id] = subscription
            } else {
                delete account.subscriptions[playlist.id ?? '']
            }
            localStorage.setItem('accounts', JSON.stringify(accounts.value));
        }
    }

    function addViewVideoWithCurrentTime(video: Video, currentTime: number) {
        let account = getCurrentAccount()
        if (account) {
            const viewVideo = new ViewVideo({...video, currentTime})
            account.views[viewVideo.id] = viewVideo
        }
        localStorage.setItem('accounts', JSON.stringify(accounts.value));
    }

    return {
        accounts,
        currentAccount,
        addAccount,
        setCurrentAccount,
        getCurrentAccount,
        clearCurrentAccount,
        swapSubscriptionToCurrentAccount,
        addViewVideoWithCurrentTime
    }
})
