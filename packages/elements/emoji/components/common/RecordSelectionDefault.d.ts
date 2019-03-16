import { OnEmojiEvent } from '../../types';
import { EmojiProvider } from '../../api/EmojiResource';
/**
 * A function that will wrap any configured Emoji 'onSelection' function to ensure recordSelection is always
 * called.
 *
 * @param provider the EmojiProvider which will be called on each emoji selection
 * @param onSelect the onSelect function that is explicitly configured on the Emoji component.
 */
export declare const createRecordSelectionDefault: <T>(provider: EmojiProvider, onSelect?: OnEmojiEvent<T> | undefined) => OnEmojiEvent<T>;
