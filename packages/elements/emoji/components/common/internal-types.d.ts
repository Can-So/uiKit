import { EmojiProvider } from '../../api/EmojiResource';
export interface EmojiContext {
    emoji: {
        emojiProvider: EmojiProvider;
    };
}
export declare enum UploadStatus {
    Waiting = 0,
    Uploading = 1,
    Error = 2
}
