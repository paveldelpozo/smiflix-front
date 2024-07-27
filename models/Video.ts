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
    public seconds: number|null;
    public views: number;
    public likes: number;
    public dislikes: number;

    constructor(data?: any) {
        this.id = data?.id ?? null
        this.title = data?.snippet?.title ?? ''
        this.categoryId = data?.snippet?.playlistId ?? ''
        this.description = data?.snippet?.description ?? ''
        this.thumbnail = data?.snippet?.thumbnails?.high?.url ?? null
        this.imageBackground = data?.snippet?.thumbnails?.maxres?.url ?? data?.snippet?.thumbnails?.high?.url ?? null
        this.publishedAt = data?.snippet?.publishedAt ?? ''
        this.duration = this.getDuration(data?.contentDetails?.duration)
        this.seconds = this.getDurationSeconds(data?.contentDetails?.duration)
        this.views = data?.statistics?.viewCount ? parseInt(data?.statistics?.viewCount) : 0
        this.likes = data?.statistics?.likeCount ? parseInt(data?.statistics?.likeCount) : 0
        this.dislikes = data?.statistics?.dislikeCount ? parseInt(data?.statistics?.dislikeCount) : 0
    }

    private decodeDuration(duration: string): { hours: number; minutes: number; seconds: number } {
        const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
        const matches = duration.match(regex);
        if (!matches) {
            return { hours: 0, minutes: 0, seconds: 0 };
        }
        const hours = parseInt(matches[1] || '0', 10);
        const minutes = parseInt(matches[2] || '0', 10);
        const seconds = parseInt(matches[3] || '0', 10);
        return {
            hours,
            minutes,
            seconds
        }
    }

    private getDuration(duration: string): string {
        const { hours, minutes, seconds } = this.decodeDuration(duration);
        return [
            hours > 0 ? hours : null,
            hours > 0 || minutes > 0 ? String(minutes).padStart(2, '0') : '0',
            String(seconds).padStart(2, '0')
        ].filter(Boolean).join(':');
    }

    private getDurationSeconds(duration: string): number {
        const { hours, minutes, seconds } = this.decodeDuration(duration);
        return (hours * 60 * 60) + (minutes * 60) + seconds
    }

}
