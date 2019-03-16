import * as PubNub from 'pubnub';
import { MessageEvent } from 'pubnub';
export default class HistoryFetcher {
    private pubNubClient;
    private messageHandler;
    private tooMuchHistoryHandler;
    constructor(config: {
        pubNubClient: PubNub;
        messageHandler: (data: MessageEvent) => void;
        tooMuchHistoryHandler: () => void;
    });
    fetch(channels: string[], sinceTimetoken?: string): void;
    private historyFetched;
}
