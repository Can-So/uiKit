import { FileDetails } from '@atlaskit/media-core';

import { MediaFile, PublicMediaFile } from '../domain/file';
import { MediaProgress } from '../domain/progress';
import { MediaError } from '../domain/error';
import { Preview } from '../domain/preview';

import { GenericEventEmitter } from '../util/eventEmitter';
import { UploadEventPayloadMap } from '../domain/uploadEvent';

export interface UploadEventEmitter {
  emitUploadsStart(files: MediaFile[]): void;
  emitUploadProgress(file: MediaFile, progress: MediaProgress): void;
  emitUploadPreviewUpdate(file: MediaFile, preview: Preview): void;
  emitUploadProcessing(file: PublicMediaFile): void;
  emitUploadEnd(file: PublicMediaFile, fileDetails: FileDetails): void;
  emitUploadError(file: MediaFile, error: MediaError): void;
}

export class UploadComponent<M extends UploadEventPayloadMap>
  extends GenericEventEmitter<M>
  implements UploadEventEmitter {
  emitUploadsStart(files: MediaFile[]): void {
    this.emit('uploads-start', {
      files,
    });
  }

  emitUploadProgress(file: MediaFile, progress: MediaProgress): void {
    this.emit('upload-status-update', {
      file,
      progress,
    });
  }

  emitUploadPreviewUpdate(file: MediaFile, preview: Preview): void {
    this.emit('upload-preview-update', {
      file,
      preview,
    });
  }

  emitUploadProcessing(file: PublicMediaFile): void {
    this.emit('upload-processing', { file });
  }

  emitUploadEnd(file: PublicMediaFile, fileDetails: FileDetails): void {
    this.emit('upload-end', { file, public: fileDetails });
  }

  emitUploadError(file: MediaFile, error: MediaError): void {
    this.emit('upload-error', {
      file: file,
      error: error,
    });
  }
}
