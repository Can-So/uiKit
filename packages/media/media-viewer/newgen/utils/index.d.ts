import { Context, FileIdentifier } from '@atlaskit/media-core';
import { MediaCollectionItem } from '@atlaskit/media-store';
export declare function constructAuthTokenUrl(url: string, context: Context, collectionName?: string): Promise<string>;
export declare const toIdentifier: (item: MediaCollectionItem, collectionName: string) => FileIdentifier;
export declare const getSelectedIndex: (items: FileIdentifier[], selectedItem: FileIdentifier) => number;
