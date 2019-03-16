import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
export interface Props {
    editorView: EditorView;
    tableRef?: HTMLTableElement;
    isInDanger?: boolean;
    isResizing?: boolean;
    isHeaderColumnEnabled?: boolean;
    isHeaderRowEnabled?: boolean;
    isNumberColumnEnabled?: boolean;
    insertColumnButtonIndex?: number;
    insertRowButtonIndex?: number;
    hoveredRows?: number[];
}
export default class CornerControls extends Component<Props, any> {
    render(): JSX.Element | null;
    private isActive;
    private clearHoverSelection;
    private selectTable;
    private hoverTable;
    private insertColumn;
    private insertRow;
}
