import { EmojiUpload, EmojiDescription } from '@findable/emoji';

export interface PromiseBuilder<R> {
  (result: R, context: string): Promise<R>;
}

export interface UploadDetail {
  upload: EmojiUpload;
  emoji: EmojiDescription;
}

// Copy of constants from @findable/emoji
// NOTE: if this is changed in the original package, this must also be modified
export const customType = 'SITE';
export const customCategory = 'CUSTOM';
export const selectedToneStorageKey = 'fabric.emoji.selectedTone';
