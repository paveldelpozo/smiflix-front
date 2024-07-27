import type {AccountInterface, SubscriptionInterface, ViewVideoInterface} from "~/interfaces/AccountInterface";
import {generateUniqueHash} from "~/services/Utils";

export class Account implements AccountInterface {
    id: string
    name: string
    avatar: string
    subscriptions: {
        [key: string]: Subscription
    }
    views: {
        [key: string]: ViewVideo
    }

    constructor(data?: any) {
        this.id = generateUniqueHash()
        this.name = data?.name ?? ''
        this.avatar = data?.avatar ?? ''
        this.subscriptions = data?.subscriptions?? {}
        this.views = data?.views?? {}
    }
}

export class Subscription implements SubscriptionInterface {
    id: string
    title: string
    thumbnail: string|null

    constructor(data?: any) {
        this.id = data?.id ?? ''
        this.title = data?.title ?? ''
        this.thumbnail = data?.thumbnail ?? ''
    }
}

export class ViewVideo implements ViewVideoInterface {
    id: string
    title: string
    thumbnail: string|null
    duration: number
    seconds: number

    constructor(data?: any) {
        this.id = data?.id ?? ''
        this.title = data?.title ?? ''
        this.thumbnail = data?.thumbnail ?? ''
        this.duration = data?.duration ?? ''
        this.seconds = data?.seconds
    }
}
