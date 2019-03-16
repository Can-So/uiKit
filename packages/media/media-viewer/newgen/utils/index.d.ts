import { Context, FileIdentifier } from '@findable/media-core';
import { MediaCollectionItem } from '@findable/media-store';
export declare function constructAuthTokenUrl(url: string, context: Context, collectionName?: string): Promise<string>;
export declare const toIdentifier: (item: MediaCollectionItem, collectionName: string) => FileIdentifier;
export declare const getSelectedIndex: (items: FileIdentifier[], selectedItem: FileIdentifier) => number;
