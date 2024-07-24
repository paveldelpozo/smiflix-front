export interface PlaylistResponseInterface {
    items: PlaylistInterface[]
    total: number
    nextPage: string|null
    previousPage: string|null
}

export interface PlaylistInterface {
    id: string|null
    title: string
    description: string
    thumbnail: string|null
    imageBackground: string|null
}

export interface PlaylistItemResponseInterface {
    items: PlaylistItemInterface[]
    total: number
    nextPage: string|null
    previousPage: string|null
}

export interface PlaylistItemInterface {
    id: string|null
    categoryId: string|null
    title: string
    description: string
    position: number
    videoId: string|null
    thumbnail: string|null
    imageBackground: string|null
}
