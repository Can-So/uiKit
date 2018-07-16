import { Context } from '@atlaskit/media-core';
import {
  UploadService,
  UploadServiceFactory,
} from '../service/uploadServiceFactory';
import {
  UploadEndEventPayload,
  UploadErrorEventPayload,
  UploadEventPayloadMap,
  UploadPreviewUpdateEventPayload,
  UploadProcessingEventPayload,
  UploadsStartEventPayload,
  UploadStatusUpdateEventPayload,
} from '../domain/uploadEvent';
import { UploadComponent } from './component';
import { UploadParams } from '../domain/config';

export interface LocalUploadConfig {
  uploadParams: UploadParams;
  useNewUploadService?: boolean;
}

export class LocalUploadComponent<
  M extends UploadEventPayloadMap = UploadEventPayloadMap
> extends UploadComponent<M> {
  protected readonly uploadService: UploadService;
  readonly context: Context;
  config: LocalUploadConfig;

  constructor(context: Context, config: LocalUploadConfig) {
    super();

    this.context = context;
    this.uploadService = UploadServiceFactory.create(
      this.context,
      config.uploadParams || { collection: '' },
      config.useNewUploadService,
    );
    this.config = config;
    this.uploadService.on('files-added', this.onFilesAdded);
    this.uploadService.on('file-preview-update', this.onFilePreviewUpdate);
    this.uploadService.on('file-uploading', this.onFileUploading);
    this.uploadService.on('file-converting', this.onFileConverting);
    this.uploadService.on('file-converted', this.onFileConverted);
    this.uploadService.on('file-upload-error', this.onUploadError);
  }

  public cancel(uniqueIdentifier?: string): void {
    this.uploadService.cancel(uniqueIdentifier);
  }

  public setUploadParams(uploadParams: UploadParams): void {
    this.uploadService.setUploadParams(uploadParams);
  }

  private onFilesAdded = ({ files }: UploadsStartEventPayload): void => {
    this.emitUploadsStart(files);
  };

  private onFilePreviewUpdate = ({
    file,
    preview,
  }: UploadPreviewUpdateEventPayload): void => {
    this.emitUploadPreviewUpdate(file, preview);
  };

  private onFileUploading = ({
    file,
    progress,
  }: UploadStatusUpdateEventPayload): void => {
    this.emitUploadProgress(file, progress);
  };

  private onFileConverting = ({ file }: UploadProcessingEventPayload): void => {
    this.emitUploadProcessing(file);
  };

  private onFileConverted = (payload: UploadEndEventPayload): void => {
    this.emitUploadEnd(payload.file, payload.public);
  };

  private onUploadError = ({ file, error }: UploadErrorEventPayload): void => {
    this.emitUploadError(file, error);
  };
}
