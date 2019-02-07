import { Context, MediaItemType } from '@atlaskit/media-core';
import { MediaViewerFeatureFlags } from '../newgen/domain';

export interface MediaViewerItem {
  id: string;
  occurrenceKey: string;
  type: MediaItemType;
}

export interface MediaViewerDataSource {
  list?: Array<MediaViewerItem>;
  collectionName?: string;
}

export interface MediaViewerProps {
  readonly context: Context;

  readonly selectedItem: MediaViewerItem;
  readonly dataSource: MediaViewerDataSource;

  readonly collectionName: string;
  readonly pageSize?: number;

  readonly onClose?: () => void;

  readonly featureFlags?: MediaViewerFeatureFlags;
}
