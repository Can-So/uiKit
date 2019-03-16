import * as React from 'react';
import { RefObject } from 'react';
import { MediaSingleLayout } from '@findable/adf-schema';
import { Props as ResizableMediaSingleProps, EnabledHandles } from './types';
import Resizable from 're-resizable';
import { ResizableDirection, NumberSize } from 're-resizable';
declare type ResizerProps = ResizableMediaSingleProps & {
    selected: boolean;
    enable: EnabledHandles;
    calcNewSize: (newWidth: number, stop: boolean) => {
        layout: MediaSingleLayout;
        width: number | null;
    };
    snapPoints: number[];
    scaleFactor?: number;
    highlights: (width: number, snapPoints: number[]) => number[] | string[];
};
declare type ResizerState = {
    isResizing: boolean;
};
export default class Resizer extends React.Component<ResizerProps, ResizerState> {
    resizable: RefObject<Resizable>;
    state: {
        isResizing: boolean;
    };
    constructor(props: ResizerProps);
    handleResizeStart: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    handleResize: (event: MouseEvent | TouchEvent, direction: ResizableDirection, elementRef: HTMLDivElement, delta: NumberSize) => void;
    handleResizeStop: (event: MouseEvent | TouchEvent, direction: string, refToElement: HTMLElement, delta: {
        width: number;
        height: number;
    }) => void;
    render(): JSX.Element;
}
export {};
