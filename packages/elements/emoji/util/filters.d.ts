import { EmojiProvider } from '../api/EmojiResource';
import { EmojiDescription, OptionalEmojiDescription } from '../types';
export declare const getToneEmoji: (provider: EmojiProvider) => EmojiDescription | Promise<OptionalEmojiDescription> | undefined;
declare const _default: {
    byShortName: (emojis: EmojiDescription[], shortName: string) => EmojiDescription;
    toneEmoji: (emojis: EmojiDescription[]) => EmojiDescription;
};
export default _default;
