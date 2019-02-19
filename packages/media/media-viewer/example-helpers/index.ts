import {
  archiveFileId,
  audioFileId,
  audioNoCoverFileId,
  docFileId,
  largePdfFileId,
  imageFileId,
  largeImageFileId,
  smallImageFileId,
  unknownFileId,
  videoFileId,
  videoHorizontalFileId,
  videoLargeFileId,
  videoProcessingFailedId,
  wideImageFileId,
  errorFileId,
  videoSquareFileId,
} from '@atlaskit/media-test-helpers';
import { Identifier } from '@atlaskit/media-core';

export { defaultCollectionName } from '@atlaskit/media-test-helpers';

export const imageIdentifier: Identifier = {
  ...imageFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const wideImageIdentifier: Identifier = {
  ...wideImageFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const docIdentifier: Identifier = {
  ...docFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const largePdfIdentifier: Identifier = {
  ...largePdfFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const imageIdentifier2: Identifier = {
  ...imageFileId,
  occurrenceKey: 'other-ocurrence-key',
};

export const videoIdentifier: Identifier = {
  ...videoFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const unsupportedIdentifier: Identifier = {
  ...unknownFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const imageItem: Identifier = {
  ...imageFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const smallImageItem: Identifier = {
  ...smallImageFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const largeImageItem: Identifier = {
  ...largeImageFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const wideImageItem: Identifier = {
  ...wideImageFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const docItem: Identifier = {
  ...docFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const videoItem: Identifier = {
  ...videoFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const videoHorizontalFileItem: Identifier = {
  ...videoHorizontalFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const videoLargeFileItem: Identifier = {
  ...videoLargeFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const videoProcessingFailedItem: Identifier = {
  ...videoProcessingFailedId,
  occurrenceKey: 'testOccurrenceKey',
};

export const videoSquareFileIdItem: Identifier = {
  ...videoSquareFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const audioItem: Identifier = {
  ...audioFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const audioItemNoCover: Identifier = {
  ...audioNoCoverFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const archiveItem: Identifier = {
  ...archiveFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const unsupportedItem: Identifier = {
  ...unknownFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const errorItem: Identifier = {
  ...errorFileId,
  occurrenceKey: 'testOccurrenceKey',
};
