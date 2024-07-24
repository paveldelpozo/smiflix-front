import type {VideoInterface} from "~/interfaces/VideoInterface";

export class Video implements VideoInterface {
    public id: string|null;
    public categoryId: string|null;
    public title: string;
    public description: string;
    public thumbnail: string|null;
    public imageBackground: string|null;
    public publishedAt: string;
    public duration: string|null;
    public views: number;
    public likes: number;
    public dislikes: number;

    constructor(data?: any) {
        this.id = data?.id ?? null
        this.title = data?.snippet?.title ?? ''
        this.categoryId = data?.snippet?.playlistId ?? ''
        this.description = data?.snippet?.description ?? ''
        this.thumbnail = data?.snippet?.thumbnails?.high?.url ?? null
        this.imageBackground = data?.snippet?.thumbnails?.maxres?.url ?? null
        this.publishedAt = data?.snippet?.publishedAt ?? ''
        this.duration = this.decodeDuration(data?.contentDetails?.duration)
        this.views = data?.statistics?.viewCount ? parseInt(data?.statistics?.viewCount) : 0
        this.likes = data?.statistics?.likeCount ? parseInt(data?.statistics?.likeCount) : 0
        this.dislikes = data?.statistics?.dislikeCount ? parseInt(data?.statistics?.dislikeCount) : 0
    }

    private decodeDuration(duration: string): string|null {
        const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
        const matches = duration.match(regex);
        if (!matches) {
            return null
        }
        const hours = parseInt(matches[1] || '0', 10);
        const minutes = parseInt(matches[2] || '0', 10);
        const seconds = parseInt(matches[3] || '0', 10);
        return [
            hours > 0 ? hours : null,
            hours > 0 || minutes > 0 ? String(minutes).padStart(2, '0') : '0',
            String(seconds).padStart(2, '0')
        ].filter(Boolean).join(':');
    }

}
