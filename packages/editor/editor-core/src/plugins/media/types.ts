import { Context } from '@atlaskit/media-core';
import { MediaFile, UploadParams } from '@atlaskit/media-picker';

export type MediaStateStatus =
  | 'unknown'
  | 'ready'
  | 'cancelled'
  | 'preview'
  | 'error'
  | 'mobile-upload-end';

export interface MediaState {
  id: string;
  status?: MediaStateStatus;
  fileName?: string;
  fileSize?: number;
  fileMimeType?: string;
  collection?: string;
  dimensions?: {
    width: number | undefined;
    height: number | undefined;
  };
  scaleFactor?: number;
  error?: {
    name: string;
    description: string;
  };
  /** still require to support Mobile */
  publicId?: string;
}

export interface FeatureFlags {}

export interface MediaProvider {
  uploadParams?: UploadParams;

  /**
   * Used for displaying Media Cards and downloading files.
   * This is context config is required.
   */
  viewContext: Promise<Context>;

  /**
   * (optional) Used for creating new uploads and finalizing files.
   * NOTE: We currently don't accept Context instance, because we need config properties
   *       to initialize
   */
  uploadContext?: Promise<Context>;

  /**
   * (optional) For any additional feature to be enabled
   */
  featureFlags?: FeatureFlags;
}

export type Listener = (data: any) => void;

export interface CustomMediaPicker {
  on(event: string, cb: Listener): void;
  removeAllListeners(event: any);
  emit(event: string, data: any): void;
  destroy(): void;
  setUploadParams(uploadParams: UploadParams);
}

export type MobileUploadEndEventPayload = {
  readonly file: MediaFile & {
    readonly collectionName?: string;
    readonly publicId?: string;
  };
};
