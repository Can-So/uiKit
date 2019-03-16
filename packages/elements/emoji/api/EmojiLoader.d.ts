import { EmojiResponse } from '../types';
import { EmojiLoaderConfig } from './EmojiUtils';
/**
 * Emoji providers should return JSON in the format defined by EmojiServiceResponse.
 */
export default class EmojiLoader {
    private config;
    constructor(config: EmojiLoaderConfig);
    /**
     * Returns a promise with an array of Emoji from all providers.
     */
    loadEmoji(): Promise<EmojiResponse>;
}
