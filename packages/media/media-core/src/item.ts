import { MediaType } from './mediaTypes';
import { SmartCardResponse } from './smartCardResponse';

export type MediaItemType = 'file' | 'link';

export type MediaItem = FileItem | LinkItem;

export type MediaItemDetails = FileDetails | LinkDetails | UrlPreview;

export interface FileItem {
  type: 'file';
  details: FileDetails;
}

export type FileProcessingStatus =
  | 'pending'
  | 'running'
  | 'succeeded'
  | 'failed';

export interface FileDetails {
  id?: string;
  name?: string;
  size?: number;
  mimeType?: string;
  mediaType?: MediaType;
  creationDate?: number; // timestamp in milliseconds from EPOCH
  processingStatus?: FileProcessingStatus;
  artifacts?: Object;
}

export interface LinkItem {
  type: 'link';
  details: LinkDetails;
}

export interface LinkDetails extends UrlPreview {
  id: string;
}

export interface UrlPreview {
  type: string;
  url: string;
  title: string;
  description?: string;
  site?: string;
  author?: UrlAuthorDetails;
  date?: number;
  resources?: Resources;
}

export interface UrlAuthorDetails {
  name?: string;
  url?: string;
}

export interface Resources {
  icon?: Resource;
  thumbnail?: Resource;
  image?: Resource;
  file?: Resource;
  player?: Resource;
  app?: Resource;
  smartCard?: SmartCardResponse;
}

export interface Resource {
  url?: string;
  type?: string;
  width?: number;
  height?: number;
  aspect_ratio?: number;
  length?: number;
  html?: string;
}
