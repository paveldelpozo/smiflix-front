import {Video} from "~/models/Video";
import {ChannelResponse} from "~/models/Channel";
import {Playlist, PlaylistItem, PlaylistResponse} from "~/models/Playlist";
import {PlaylistItemResponse} from "~/models/Playlist";

export class YoutubeService {

    private readonly apiKey: string = ''
    private readonly baseUrl: string = 'https://www.googleapis.com/youtube/v3'

    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    async searchChannels(query: string, pageToken: string|null = null): Promise<ChannelResponse> {
        let url = `${this.baseUrl}/search?part=snippet&type=channel&q=${query}&key=${this.apiKey}`;
        if (pageToken) {
            url += `&pageToken=${pageToken}`;
        }
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log('Search response', data)
            return data.items ? new ChannelResponse({
                items: data.items,
            }) : new ChannelResponse()
        } catch (error) {
            throw new Error('Error searching channels');
        }
    }

    async getChannelPlayLists(channelId: string, maxResults: number = 25, pageToken: string|null = null): Promise<PlaylistResponse> {
        let url = `${this.baseUrl}/playlists?part=snippet&channelId=${channelId}&maxResults=${maxResults}&key=${this.apiKey}`;
        if (pageToken) {
            url += `&pageToken=${pageToken}`;
        }
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.items ? new PlaylistResponse({
                items: data.items,
                total: data.pageInfo.totalResults,
                nextPage: data.nextPageToken ?? null,
                previousPage: data.previousPageToken ?? null,
            }) : new PlaylistResponse()
        } catch (error) {
            throw new Error('Error getting channel playlists');
        }
    }

    async getPlaylistDetails(playlistId: string): Promise<Playlist|null> {
        const url = `${this.baseUrl}/playlists?part=snippet,contentDetails&id=${playlistId}&key=${this.apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                const playlist = data.items[0];
                return new Playlist(playlist)
            } else {
                return null
            }
        } catch (error) {
            throw new Error('Error getting playlist');
        }
    }

    async getPlaylistVideos(playlistId: string, maxResults: number = 25, pageToken: string|null = null): Promise<PlaylistItemResponse> {
        let url = `${this.baseUrl}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${this.apiKey}`;
        if (pageToken) {
            url += `&pageToken=${pageToken}`;
        }
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.items ? new PlaylistItemResponse({
                items: data.items,
                total: data.pageInfo.totalResults,
                nextPage: data.nextPageToken ?? null,
                previousPage: data.previousPageToken ?? null,
            }) : new PlaylistItemResponse()
        } catch (error) {
            throw new Error('Error getting playlist videos');
        }
    }

    async getVideoDetails(videoId: string): Promise<Video|null> {
        const url = `${this.baseUrl}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${this.apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                return new Video(data.items[0])
            } else {
                return null
            }
        } catch (error) {
            throw new Error('Error getting video details');
        }
    }

}
