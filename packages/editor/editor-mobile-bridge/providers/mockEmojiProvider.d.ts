/**
 * Mocking out emojis for the editor, so they easily fall back to text.
 */
import { EmojiProvider } from '@findable/emoji';
declare class EmojiProviderImpl implements EmojiProvider {
    findByShortName(): undefined;
    findByEmojiId(): undefined;
    findById(): undefined;
    findInCategory(): Promise<never[]>;
    getAsciiMap(): Promise<Map<any, any>>;
    getFrequentlyUsed(): Promise<never[]>;
    recordSelection(): Promise<void>;
    deleteSiteEmoji(): Promise<boolean>;
    loadMediaEmoji(): undefined;
    optimisticMediaRendering(): boolean;
    getSelectedTone(): undefined;
    getCurrentUser(): undefined;
    setSelectedTone(): void;
    filter(): void;
    subscribe(): void;
    unsubscribe(): void;
}
declare const _default: EmojiProviderImpl;
export default _default;
