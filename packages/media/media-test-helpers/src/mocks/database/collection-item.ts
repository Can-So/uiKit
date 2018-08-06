import * as uuid from 'uuid';
import { MediaCollectionItem } from '@atlaskit/media-store';
import {
  getHackerNoun,
  getPastDate,
  fakeImage,
  getFakeFileName,
  getTextFileType,
} from './mockData';

import { mapDataUriToBlob } from '../../utils';

export type CollectionItem = MediaCollectionItem & {
  readonly collectionName?: string;
  readonly blob: Blob;
};

export type CreateCollectionItemOptions = {
  readonly name?: string;
  readonly mimeType?: string;
  readonly collectionName?: string;
  readonly occurrenceKey?: string;
  readonly blob?: Blob;
};

export function createCollectionItem({
  name,
  mimeType,
  collectionName,
  occurrenceKey,
  blob = new Blob(['Hello World'], { type: 'text/plain' }),
}: CreateCollectionItemOptions = {}): CollectionItem {
  const extension = getTextFileType();
  return {
    id: uuid.v4(),
    insertedAt: getPastDate().valueOf(),
    occurrenceKey: occurrenceKey || uuid.v4(),
    type: 'file',
    details: {
      name: name || getFakeFileName(extension),
      size: blob.size,
      mimeType,
      processingStatus: 'succeeded',
      mediaType: 'image',
      artifacts: {},
    },
    collectionName: collectionName || getHackerNoun(),
    blob: blob || mapDataUriToBlob(fakeImage),
  };
}
