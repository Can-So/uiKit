import * as React from 'react';
export interface ImageLoaderProps {
    url?: string;
    onExternalImageLoaded?: (dimensions: {
        width: number;
        height: number;
    }) => void;
    imageStatus?: ImageStatus;
}
export interface ImageLoaderState {
    imageStatus: ImageStatus;
}
export declare type ImageStatus = 'complete' | 'loading' | 'error';
export declare const withImageLoader: <P extends {}>(Wrapped: React.ComponentType<P & ImageLoaderProps>) => React.ComponentClass<P & ImageLoaderProps, any>;
