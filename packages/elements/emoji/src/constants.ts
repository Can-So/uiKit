export const customCategory = 'CUSTOM';
export const frequentCategory = 'FREQUENT';
export const customType = 'SITE';
export const customTitle = 'All uploads';
export const userCustomTitle = 'Your uploads';

export const dataURLPrefix = 'data:';

/**
 * A constant used in sorting/ordering to represent a number 'obviously much bigger than any item in the set being handled'.
 * This is used instead of Number.MAX_VALUE since subtraction of MAX_VALUE from itself occassionaly doesn't equal zero exactly :-(
 */
export const MAX_ORDINAL = 100000;

export const defaultEmojiHeight = 20;

export const emojiPickerWidth = 350;
export const emojiPickerHeight = 295;

export const localStoragePrefix = 'fabric.emoji';
export const selectedToneStorageKey = `${localStoragePrefix}.selectedTone`;
export const defaultCategories = [
  'PEOPLE',
  'NATURE',
  'FOODS',
  'ACTIVITY',
  'PLACES',
  'OBJECTS',
  'SYMBOLS',
  'FLAGS',
];

export const defaultListLimit = 50;

export const migrationUserId = 'hipchat_migration_emoticons';

export const analyticsEmojiPrefix = 'atlassian.fabric.emoji.picker';
