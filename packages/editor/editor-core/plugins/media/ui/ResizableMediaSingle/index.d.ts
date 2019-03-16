import * as React from 'react';
import { Context } from '@atlaskit/media-core';
import { MediaSingleLayout } from '@atlaskit/adf-schema';
import { Props } from './types';
declare type State = {
    offsetLeft: number;
    isVideoFile: boolean;
};
export default class ResizableMediaSingle extends React.Component<Props, State> {
    state: {
        offsetLeft: number;
        isVideoFile: boolean;
    };
    componentDidUpdate(): boolean;
    readonly wrappedLayout: boolean;
    componentDidMount(): Promise<void>;
    componentWillReceiveProps(nextProps: Props): void;
    checkVideoFile(viewContext?: Context): Promise<void>;
    calcNewSize: (newWidth: number, stop: boolean) => {
        width: number;
        layout: MediaSingleLayout;
    } | {
        width: number | null;
        layout: "full-width" | "wide";
    };
    readonly $pos: import("prosemirror-model").ResolvedPos<any> | null;
    /**
     * The maxmimum number of grid columns this node can resize to.
     */
    readonly gridWidth: number;
    calcOffsetLeft(): number;
    calcColumnLeftOffset: () => number;
    wrapper: HTMLElement | null;
    calcSnapPoints(): number[];
    readonly insideInlineLike: boolean;
    highlights: (newWidth: number, snapPoints: number[]) => number[] | string[];
    render(): JSX.Element;
}
export {};
