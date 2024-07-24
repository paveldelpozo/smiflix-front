import type {ChannelInterface, ChannelResponseInterface} from "~/interfaces/ChannelInterface";

export class ChannelResponse implements ChannelResponseInterface {
    public items: any[]

    constructor(data?: ChannelResponseInterface) {
        this.items = data?.items ?? []
    }

}

export class Channel implements ChannelInterface {

}
