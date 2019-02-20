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
import { FileIdentifier } from '@atlaskit/media-core';

export { defaultCollectionName } from '@atlaskit/media-test-helpers';

export const imageIdentifier: FileIdentifier = {
  ...imageFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const wideImageIdentifier: FileIdentifier = {
  ...wideImageFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const docIdentifier: FileIdentifier = {
  ...docFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const largePdfIdentifier: FileIdentifier = {
  ...largePdfFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const imageIdentifier2: FileIdentifier = {
  ...imageFileId,
  occurrenceKey: 'other-ocurrence-key',
};

export const videoIdentifier: FileIdentifier = {
  ...videoFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const unsupportedIdentifier: FileIdentifier = {
  ...unknownFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const imageItem: FileIdentifier = {
  ...imageFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const smallImageItem: FileIdentifier = {
  ...smallImageFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const largeImageItem: FileIdentifier = {
  ...largeImageFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const wideImageItem: FileIdentifier = {
  ...wideImageFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const docItem: FileIdentifier = {
  ...docFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const videoItem: FileIdentifier = {
  ...videoFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const videoHorizontalFileItem: FileIdentifier = {
  ...videoHorizontalFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const videoLargeFileItem: FileIdentifier = {
  ...videoLargeFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const videoProcessingFailedItem: FileIdentifier = {
  ...videoProcessingFailedId,
  occurrenceKey: 'testOccurrenceKey',
};

export const videoSquareFileIdItem: FileIdentifier = {
  ...videoSquareFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const audioItem: FileIdentifier = {
  ...audioFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const audioItemNoCover: FileIdentifier = {
  ...audioNoCoverFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const archiveItem: FileIdentifier = {
  ...archiveFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const unsupportedItem: FileIdentifier = {
  ...unknownFileId,
  occurrenceKey: 'testOccurrenceKey',
};

export const errorItem: FileIdentifier = {
  ...errorFileId,
  occurrenceKey: 'testOccurrenceKey',
};
