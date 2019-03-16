import { MediaSingleLayout } from '@findable/adf-schema';
import { MediaSingleProps } from '@findable/editor-common';
import { EditorAppearance } from '../../../../types';
import { GridType } from '../../../grid/types';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { Context } from '@findable/media-core';
export declare type EnabledHandles = {
    left?: boolean;
    right?: boolean;
};
export declare type Props = MediaSingleProps & {
    updateSize: (width: number | null, layout: MediaSingleLayout) => void;
    displayGrid: (show: boolean, type: GridType, highlight?: number[] | string[]) => void;
    getPos: () => number | undefined;
    view: EditorView;
    state: EditorState;
    lineLength: number;
    gridSize: number;
    containerWidth: number;
    appearance?: EditorAppearance;
    selected: boolean;
    viewContext?: Context;
};
