import {
  MediaStore,
  MediaStoreGetCollectionItemsParams,
  MediaCollectionItem,
  MediaCollectionItemFullDetails,
  MediaFile,
} from '@atlaskit/media-store';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { FileItem, FileDetails, LinkItem, LinkDetails } from '../item';
import { FileState, mapMediaFileToFileState } from '../fileState';
import { fileStreamsCache } from '../context/fileStreamCache';

export interface MediaCollectionFileItemDetails extends FileDetails {
  occurrenceKey: string;
}

export interface MediaCollectionFileItem extends FileItem {
  details: MediaCollectionFileItemDetails;
}

export interface MediaCollectionLinkItemDetails extends LinkDetails {
  occurrenceKey: string;
}

export interface MediaCollectionLinkItem extends LinkItem {
  details: MediaCollectionLinkItemDetails;
}

export interface MediaCollection {
  id: string;
  items: Array<MediaCollectionItem>;
}

export interface CollectionCacheEntry {
  items: MediaCollectionItem[];
  subject: ReplaySubject<MediaCollectionItem[]>;
  isLoadingNextPage: boolean;
  nextInclusiveStartKey?: string;
}

export type CollectionCache = {
  [collectionName: string]: CollectionCacheEntry;
};

export const collectionCache: CollectionCache = {};

const createCacheEntry = (): CollectionCacheEntry => ({
  items: [],
  subject: new ReplaySubject<MediaCollectionItem[]>(1),
  isLoadingNextPage: false,
});

export class CollectionFetcher {
  constructor(readonly mediaStore: MediaStore) {}

  private createFileStateObserver(
    id: string,
    details: MediaCollectionItemFullDetails,
  ): Observable<FileState> {
    const subject = new ReplaySubject<FileState>(1);
    const mediaFile: MediaFile = {
      id,
      ...details,
    };
    const fileState = mapMediaFileToFileState({ data: mediaFile });

    subject.next(fileState);

    return subject;
  }

  private populateCache(items: MediaCollectionItem[]) {
    items.forEach(item => {
      const fileStream = this.createFileStateObserver(
        item.id,
        item.details as MediaCollectionItemFullDetails,
      );

      fileStreamsCache.set(item.id, fileStream);
    });
  }

  private removeFromCache(id: string, collectionName: string) {
    fileStreamsCache.remove(id);
    const collectionCacheIndex = collectionCache[
      collectionName
    ].items.findIndex(item => item.id === id);
    collectionCache[collectionName].items.splice(collectionCacheIndex, 1);
  }

  getItems(
    collectionName: string,
    params?: MediaStoreGetCollectionItemsParams,
  ): Observable<MediaCollectionItem[]> {
    if (!collectionCache[collectionName]) {
      collectionCache[collectionName] = createCacheEntry();
    }
    const collection = collectionCache[collectionName];
    const subject = collection.subject;

    this.mediaStore
      .getCollectionItems(collectionName, {
        ...params,
        details: 'full',
      })
      .then(items => {
        const { contents, nextInclusiveStartKey } = items.data;

        this.populateCache(contents);
        // It's hard to merge two together, so we just take what's came from the server.
        // Since we load only one page > 2 pages will be ditched from the cache.
        collection.items = items.data.contents;
        collection.nextInclusiveStartKey = nextInclusiveStartKey;
        subject.next(collection.items);
      });

    return subject;
  }

  async removeFile(id: string, collectionName: string, occurrenceKey?: string) {
    await this.mediaStore.removeCollectionFile(
      id,
      collectionName,
      occurrenceKey,
    );
    this.removeFromCache(id, collectionName);
    const collection = collectionCache[collectionName];
    collection.subject.next(collection.items);
  }

  async loadNextPage(
    collectionName: string,
    params?: MediaStoreGetCollectionItemsParams,
  ) {
    const collection = collectionCache[collectionName];
    const isLoading = collection ? collection.isLoadingNextPage : false;

    if (!collection || !collection.nextInclusiveStartKey || isLoading) {
      return;
    }

    collection.isLoadingNextPage = true;

    const {
      nextInclusiveStartKey: inclusiveStartKey,
      items: currentItems,
      subject,
    } = collectionCache[collectionName];
    const response = await this.mediaStore.getCollectionItems(collectionName, {
      ...params,
      inclusiveStartKey,
      details: 'full',
    });
    const { contents, nextInclusiveStartKey } = response.data;
    this.populateCache(contents);
    const newItems = response.data.contents;
    const items = [...currentItems, ...newItems];

    subject.next(items);

    collectionCache[collectionName] = {
      items,
      nextInclusiveStartKey,
      subject,
      isLoadingNextPage: false,
    };
  }
}
