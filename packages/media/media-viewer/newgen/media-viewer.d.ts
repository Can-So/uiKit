import { Context, Identifier } from '@findable/media-core';
import { WithAnalyticsEventProps } from '@findable/analytics-next-types';
import { ItemSource, MediaViewerFeatureFlags } from './domain';
export declare type Props = Readonly<{
    onClose?: () => void;
    selectedItem?: Identifier;
    featureFlags?: MediaViewerFeatureFlags;
    context: Context;
    itemSource: ItemSource;
} & WithAnalyticsEventProps>;
export declare const MediaViewer: any;
