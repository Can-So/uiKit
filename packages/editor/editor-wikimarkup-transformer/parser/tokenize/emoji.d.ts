import { TokenParser } from './';
export declare const emoji: TokenParser;
export interface EmojiMapItem {
    markup: string[];
    adf: {
        id: string;
        shortName: string;
        text: string;
    };
}
export declare const EMOJIS: EmojiMapItem[];
