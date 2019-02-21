import {
  MediaItemType,
  FileDetails,
  ExternalImageIdentifier,
} from '@atlaskit/media-core';
import {
  defaultCollectionName as collectionName,
  onlyAnimatedGifsCollectionName,
} from './collectionNames';

const fileType: MediaItemType = 'file';

// === FILE ===

export const genericFileId = {
  id: '2dfcc12d-04d7-46e7-9fdf-3715ff00ba40',
  mediaItemType: fileType,
  collectionName,
};

export const audioFileId = {
  id: 'a965c8df-1d64-4db8-9de5-16dfa8fd2e12', // mp3 audio
  mediaItemType: fileType,
  collectionName,
};

export const audioNoCoverFileId = {
  id: '7a5698bb-919c-4200-8699-6041e7913b11', // mp3 audio
  mediaItemType: fileType,
  collectionName,
};

export const videoFileId = {
  id: '1b01a476-83b4-4f44-8192-f83b2d00913a', // mp4 video
  mediaItemType: fileType,
  collectionName,
};

export const videoHorizontalFileId = {
  id: '2afaf845-4385-431f-9a15-3e21520cf896', // .mov video
  mediaItemType: fileType,
  collectionName,
};

export const videoLargeFileId = {
  id: '3291050e-6b66-4296-94c6-12088ef6fbad',
  mediaItemType: fileType,
  collectionName,
};

export const videoSquareFileId = {
  id: 'cdff20d6-2c0a-4d0d-b2a9-22cc728a0368',
  mediaItemType: fileType,
  collectionName,
};

export const videoProcessingFailedId = {
  id: 'e558199f-f982-4d23-93eb-313be5998d1b',
  mediaItemType: fileType,
  collectionName,
};

export const imageFileId = {
  id: '5556346b-b081-482b-bc4a-4faca8ecd2de', // jpg image
  mediaItemType: fileType,
  collectionName,
};
export const smallImageFileId = {
  id: 'f251bd05-4b2d-485d-a088-57d112ca7945',
  mediaItemType: fileType,
  collectionName,
};

export const wideImageFileId = {
  id: '3b6621a2-5b72-400e-ad95-447610dbb770',
  mediaItemType: fileType,
  collectionName,
};

export const largeImageFileId = {
  id: '0607a6a8-b2ec-49a7-b6d3-d767cb49e844',
  mediaItemType: fileType,
  collectionName,
};

export const docFileId = {
  id: '71cd7e7d-4e86-4b89-a0b4-7f6ffe013c94',
  mediaItemType: fileType,
  collectionName,
};

export const largePdfFileId = {
  id: '0a510b7f-4168-44d8-b4d7-f5639ecefa2c',
  mediaItemType: fileType,
  collectionName,
};

export const passwordProtectedPdfFileId = {
  id: 'c0e5bfa5-013d-4cbc-9b87-17d7f63bcc30',
  mediaItemType: fileType,
  collectionName,
};

export const archiveFileId = {
  id: '1abbae6b-f507-4b4f-b181-21016bf3b7cc',
  mediaItemType: fileType,
  collectionName,
};

export const unknownFileId = {
  id: 'e0652e68-c596-4800-8a91-1920e6b8a585',
  mediaItemType: fileType,
  collectionName,
};

export const errorFileId = {
  id: 'error-file-id',
  mediaItemType: fileType,
  collectionName,
};

export const gifFileId = {
  id: '26adc5af-3af4-42a8-9c24-62b6ce0f9369',
  mediaItemType: fileType,
  collectionName,
};

export const noMetadataFileId = {
  id: '1adaf6f9-37f6-4171-ab6b-455ec3115381',
  mediaItemType: fileType,
  collectionName,
};

export const animatedFileId = {
  id: 'af637c7a-75c3-4254-b074-d16e6ae2e04b',
  mediaItemType: fileType,
  collectionName: onlyAnimatedGifsCollectionName,
};
// === EXTERNAL IMAGE ===

export const atlassianLogoUrl =
  'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/apple-touch-icon-152x152.png';
export const externalImageIdentifier: ExternalImageIdentifier = {
  mediaItemType: 'external-image',
  dataURI: atlassianLogoUrl,
};

export const genericFileDetails: FileDetails = {
  id: 'fd4c4672-323a-4b6c-8326-223169e2a13e',
  mediaType: 'image',
  mimeType: 'image/gif',
  name: 'picker-thread-leaking.gif',
  size: 2958464,
  processingStatus: 'succeeded',
  artifacts: {
    'thumb_320.jpg': {
      url:
        '/file/fd4c4672-323a-4b6c-8326-223169e2a13e/artifact/thumb_320.jpg/binary',
      processingStatus: 'succeeded',
    },
    'thumb_large.jpg': {
      url:
        '/file/fd4c4672-323a-4b6c-8326-223169e2a13e/artifact/thumb_320.jpg/binary',
      processingStatus: 'succeeded',
    },
    'thumb_120.jpg': {
      url:
        '/file/fd4c4672-323a-4b6c-8326-223169e2a13e/artifact/thumb_120.jpg/binary',
      processingStatus: 'succeeded',
    },
    'thumb.jpg': {
      url:
        '/file/fd4c4672-323a-4b6c-8326-223169e2a13e/artifact/thumb_120.jpg/binary',
      processingStatus: 'succeeded',
    },
    'meta.json': {
      url:
        '/file/fd4c4672-323a-4b6c-8326-223169e2a13e/artifact/meta.json/binary',
      processingStatus: 'succeeded',
    },
    'image.jpg': {
      url:
        '/file/fd4c4672-323a-4b6c-8326-223169e2a13e/artifact/image.jpg/binary',
      processingStatus: 'succeeded',
    },
  },
};

export const imageFileDetails: FileDetails = {
  id: 'some-id',
  mediaType: 'image',
  name: 'image_file.jpg',
  size: 2958464,
};

export const videoFileDetails: FileDetails = {
  id: 'some-id',
  mediaType: 'video',
  name: 'video_file.mp4',
  size: 29584640,
};

export const audioFileDetails: FileDetails = {
  id: 'some-id',
  mediaType: 'audio',
  name: 'audio_file.mp3',
  size: 2958464,
};

export const docFileDetails: FileDetails = {
  id: 'some-id',
  mediaType: 'doc',
  name: 'doc_file.pdf',
  size: 2958464,
};

export const unknownFileDetails: FileDetails = {
  id: 'some-id',
  mediaType: 'unknown',
  name: 'doc_file.pdf',
  size: 2958464,
};

export const genericDataURI =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABkAAAAAQAAAGQAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAKgAwAEAAAAAQAAAAIAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIAAIAAgMBEQACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAQECAQEBAgICAgICAgICAQICAgICAgICAgL/2wBDAQEBAQEBAQEBAQECAQEBAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL/3QAEAAH/2gAMAwEAAhEDEQA/AP0U8M2NmPDfh8C0tgBomkgAW8OAPsFvwK/lh7s+5u+/4n//2Q==';
