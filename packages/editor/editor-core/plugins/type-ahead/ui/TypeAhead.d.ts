import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { TypeAheadItem } from '../types';
export declare const TypeAheadContent: React.ComponentClass<React.HTMLAttributes<{}>>;
export declare type TypeAheadProps = {
    active: boolean;
    items?: Array<TypeAheadItem>;
    isLoading?: boolean;
    currentIndex: number;
    editorView: EditorView;
    anchorElement?: HTMLElement;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
};
export declare function TypeAhead({ active, items, isLoading, anchorElement, currentIndex, editorView, popupsMountPoint, popupsBoundariesElement, popupsScrollableElement, }: TypeAheadProps): JSX.Element | null;
