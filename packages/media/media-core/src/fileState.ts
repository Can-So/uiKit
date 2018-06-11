import {
  MediaFileProcessingStatus,
  MediaFile,
  MediaStoreResponse,
} from '@atlaskit/media-store';

export type FileStatus = 'uploading' | 'processing' | 'processed' | 'error';
export interface FilePreview {
  blob: Blob;
  originalDimensions?: {
    width: number;
    height: number;
  };
}
export interface PreviewOptions {}
export interface GetFileOptions {
  preview?: PreviewOptions;
  collectionName?: string;
  occurrenceKey?: string;
}
export interface UploadingFileState {
  status: 'uploading';
  id: string;
  name: string;
  size: number;
  progress: number;
  preview?: FilePreview;
}
export interface ProcessingFileState {
  status: 'processing';
  id: string;
  name: string;
  size: number;
  preview?: FilePreview;
}
export interface ProcessedFileState {
  status: 'processed';
  id: string;
  name: string;
  size: number;
  artifacts: Object;
  mediaType: string;
  binaryUrl: string;
  preview?: FilePreview;
}
export interface ErrorFileState {
  status: 'error';
  id: string;
}
export type FileState =
  | UploadingFileState
  | ProcessingFileState
  | ProcessedFileState
  | ErrorFileState;

const apiProcessingStatusToFileStatus = (
  fileStatus: MediaFileProcessingStatus,
): FileStatus => {
  switch (fileStatus) {
    case 'pending':
      return 'processing';
    case 'succeeded':
      return 'processed';
    case 'failed':
      return 'error';
  }
};

export const mapMediaFileToFileState = (
  mediaFile: MediaStoreResponse<MediaFile>,
): FileState => {
  const {
    id,
    name,
    size,
    processingStatus,
    artifacts,
    mediaType,
  } = mediaFile.data;
  const status = apiProcessingStatusToFileStatus(processingStatus);

  switch (status) {
    // This state will not be used until we merge uploadFile + getFile
    case 'uploading':
      return {
        id,
        status,
        name,
        size,
        progress: 0,
      };
    case 'processing':
      return {
        id,
        status,
        name,
        size,
      };
    case 'processed':
      return {
        id,
        status,
        name,
        size,
        artifacts,
        mediaType,
        binaryUrl: `/file/${id}/binary`,
      };
    case 'error':
      return {
        id,
        status,
      };
  }
};
