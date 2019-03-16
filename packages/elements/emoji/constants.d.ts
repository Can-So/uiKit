import { CategoryId } from './components/picker/categories';
export declare const customCategory = "CUSTOM";
export declare const frequentCategory = "FREQUENT";
export declare const customType = "SITE";
export declare const customTitle = "allUploadsCustomCategory";
export declare const userCustomTitle = "userUploadsCustomCategory";
export declare const dataURLPrefix = "data:";
export declare const deleteEmojiLabel = "delete-emoji";
/**
 * A constant used in sorting/ordering to represent a number 'obviously much bigger than any item in the set being handled'.
 * This is used instead of Number.MAX_VALUE since subtraction of MAX_VALUE from itself occassionaly doesn't equal zero exactly :-(
 */
export declare const MAX_ORDINAL = 100000;
export declare const defaultEmojiHeight = 20;
export declare const emojiPickerWidth = 350;
export declare const emojiPickerHeight = 295;
export declare const localStoragePrefix = "fabric.emoji";
export declare const selectedToneStorageKey: string;
export declare const defaultCategories: CategoryId[];
export declare const defaultListLimit = 50;
export declare const migrationUserId = "hipchat_migration_emoticons";
export declare const analyticsEmojiPrefix = "atlassian.fabric.emoji.picker";
