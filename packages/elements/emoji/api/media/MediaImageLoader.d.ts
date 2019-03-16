import TokenManager from './TokenManager';
export declare type DataURL = string;
export interface MediaImageLoaderOptions {
    concurrentDownloadLimit: number;
}
export default class MediaImageLoader {
    private tokenManager;
    private mediaImageQueue;
    private activeProcessing;
    private concurrentDownloadLimit;
    private pendingRequests;
    constructor(tokenManager: TokenManager, options?: MediaImageLoaderOptions);
    loadMediaImage(url: string): Promise<DataURL>;
    getQueueSize(): number;
    getActiveDownloads(): number;
    private processFromQueue;
    private completedItem;
    private requestMediaEmoji;
    private readBlob;
}
