import { Component, ReactNode } from 'react';
import { Context, FileIdentifier } from '@findable/media-core';
import { Subscription } from 'rxjs/Subscription';
import { MediaStoreGetFileImageParams } from '@findable/media-store';
export interface MediaImageChildrenProps {
    /** Boolean with value to check if component is loading image source from API */
    loading: boolean;
    /** Boolean with value to check if there was an error during the image load from media API */
    error: boolean;
    /** Data structure with image data, if media API returned with success */
    data: MediaImageState | undefined;
}
export interface MediaImageProps {
    /** Instance of file identifier */
    identifier: FileIdentifier;
    /** Instance of Media Context */
    context: Context;
    /** Media API Configuration object */
    apiConfig?: MediaStoreGetFileImageParams;
    /** Render props returning `MediaImageChildrenProps` data structure */
    children: (props: MediaImageChildrenProps) => ReactNode;
}
export interface MediaImageState {
    /** Current status of the image to be loaded */
    status: 'loading' | 'error' | 'processed' | 'succeeded';
    /** Image source. It will be added in case the request for the image returns with success or image preview is available */
    src?: string;
}
export declare class MediaImage extends Component<MediaImageProps, MediaImageState> {
    subscription?: Subscription;
    state: MediaImageState;
    static defaultProps: {
        apiConfig: {};
    };
    componentDidMount(): void;
    componentWillReceiveProps({ apiConfig: newApiConfig, identifier: newIdentifier, ...otherNewProps }: MediaImageProps): void;
    componentWillUnmount(): void;
    private releaseSrc;
    private subscribe;
    private setSourceFromBlob;
    unsubscribe: () => void;
    render(): ReactNode;
}
export default MediaImage;
