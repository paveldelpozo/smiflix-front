export interface AccountInterface {
    id: string
    name: string,
    avatar: string,
    subscriptions: {
        [key: string]: SubscriptionInterface
    }
    views: {
        [key: string]: ViewVideoInterface
    }
}

export interface SubscriptionInterface {
    id: string
    title: string
    thumbnail: string|null
}

export interface ViewVideoInterface {
    id: string
    title: string
    thumbnail: string|null
    duration: number
    seconds: number
}
