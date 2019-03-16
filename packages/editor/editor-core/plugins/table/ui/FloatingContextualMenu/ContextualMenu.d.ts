import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
import { CellRect } from '../../types';
export declare const messages: {
    cellBackground: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    mergeCells: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    splitCell: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    clearCells: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export interface Props {
    editorView: EditorView;
    isOpen: boolean;
    selectionRect: CellRect;
    targetCellPosition?: number;
    mountPoint?: HTMLElement;
    allowMergeCells?: boolean;
    allowBackgroundColor?: boolean;
    boundariesElement?: HTMLElement;
    offset?: Array<number>;
}
export interface State {
    isSubmenuOpen: boolean;
}
export declare const getSelectedColumnIndexes: (selectionRect: CellRect) => number[];
export declare const getSelectedRowIndexes: (selectionRect: CellRect) => number[];
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
