import * as React from 'react';
import { HTMLAttributes } from 'react';
import { MediaSingleLayout } from '@findable/adf-schema';
/**
 * Calculates the image width for non-resized images.
 *
 * If an image has not been resized using the pctWidth attribute,
 * then an image in wide or full-width can not be wider than the image's
 * original width.
 */
export declare function calcLegacyWidth(layout: MediaSingleLayout, width: number, containerWidth?: number): string;
/**
 * Calculates the image width for previously resized images.
 *
 * Wide and full-width images are always that size (960px and 100%); there is
 * no distinction between max-width and width.
 */
export declare function calcResizedWidth(layout: MediaSingleLayout, width: number, containerWidth?: number): string;
export interface WrapperProps {
    layout: MediaSingleLayout;
    width: number;
    height: number;
    containerWidth?: number;
    pctWidth?: number;
    innerRef?: (elem: HTMLElement) => void;
}
/**
 * Can't use `.attrs` to handle highly dynamic styles because we are still
 * supporting `styled-components` v1.
 */
export declare const MediaSingleDimensionHelper: ({ width, height, layout, containerWidth, pctWidth, }: WrapperProps) => import("styled-components").InterpolationValue[];
declare const Wrapper: React.ComponentClass<HTMLAttributes<{}> & WrapperProps>;
export default Wrapper;
