import type {PlaylistResponseInterface, PlaylistInterface, PlaylistItemResponseInterface, PlaylistItemInterface} from "~/interfaces/PlaylistInterface";

export class PlaylistResponse implements PlaylistResponseInterface {
    public items: Playlist[]
    public total: number
    public nextPage: string|null
    public previousPage: string|null

    constructor(data?: PlaylistResponseInterface) {
        this.items = data?.items ? data.items.map((item: any) => new Playlist(item)) : []
        this.total = data?.total ?? 0
        this.nextPage = data?.nextPage ?? null
        this.previousPage = data?.previousPage ?? null
    }
}

export class Playlist implements PlaylistInterface {
    public id: string|null
    public title: string
    public description : string
    public thumbnail: string|null
    public imageBackground: string|null

    constructor(data?: any) {
        this.id = data?.id ?? ''
        this.title = data?.snippet?.title ?? ''
        this.description = data?.snippet?.description ?? ''
        this.thumbnail = data?.snippet?.thumbnails?.high?.url ?? null
        this.imageBackground = data?.snippet?.thumbnails?.maxres?.url ?? null
    }
}

export class PlaylistItemResponse implements PlaylistItemResponseInterface {
    public items: PlaylistItem[]
    public total: number
    public nextPage: string|null
    public previousPage: string|null

    constructor(data?: PlaylistItemResponseInterface) {
        this.items = data?.items ? data.items.map((item: any) => new PlaylistItem(item)) : []
        this.total = data?.total ?? 0
        this.nextPage = data?.nextPage ?? null
        this.previousPage = data?.previousPage ?? null
    }
}

export class PlaylistItem implements PlaylistItemInterface {
    public id: string|null
    public categoryId: string|null
    public title: string
    public description : string
    public position: number
    public videoId: string|null
    public thumbnail: string|null
    public imageBackground: string|null

    constructor(data?: any) {
        this.id = data?.snippet?.resourceId?.videoId ?? ''
        this.categoryId = data?.snippet?.playlistId ?? ''
        this.title = data?.snippet?.title ?? ''
        this.description = data?.snippet?.description ?? ''
        this.position = data?.snippet?.position ?? -1
        this.videoId = data?.snippet?.resourceId?.videoId ?? null
        this.thumbnail = data?.snippet?.thumbnails?.high?.url ?? null
        this.imageBackground = data?.snippet?.thumbnails?.maxres?.url ?? null
    }
}
