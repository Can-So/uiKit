import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { Selection } from 'prosemirror-state';
export interface Props {
    editorView: EditorView;
    selection?: Selection;
    tableRef?: HTMLTableElement;
    tableActive?: boolean;
    isInDanger?: boolean;
    isResizing?: boolean;
    isHeaderColumnEnabled?: boolean;
    isHeaderRowEnabled?: boolean;
    isNumberColumnEnabled?: boolean;
    hasHeaderRow?: boolean;
    tableHeight?: number;
    hoveredRows?: number[];
    insertColumnButtonIndex?: number;
    insertRowButtonIndex?: number;
}
export default class TableFloatingControls extends Component<Props> {
    shouldComponentUpdate(nextProps: Props): boolean;
    render(): JSX.Element | null;
    private selectRow;
    private hoverRows;
}
