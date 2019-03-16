import * as React from 'react';
import { MediaSingleLayout } from '@findable/adf-schema';
export declare const DEFAULT_IMAGE_WIDTH = 250;
export declare const DEFAULT_IMAGE_HEIGHT = 200;
export interface Props {
    children: React.ReactChild;
    layout: MediaSingleLayout;
    width: number;
    height: number;
    containerWidth?: number;
    isLoading?: boolean;
    className?: string;
    lineLength: number;
    pctWidth?: number;
}
export default function MediaSingle({ children, layout, width, height, containerWidth, isLoading, pctWidth, lineLength, className, }: Props): JSX.Element;
