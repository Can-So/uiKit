import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
export interface Props {
    editorView: EditorView;
    tableRef: HTMLTableElement;
    selectRow: (row: number) => void;
    hoverRows: (rows: number[], danger?: boolean) => void;
    hoveredRows?: number[];
    isInDanger?: boolean;
    isResizing?: boolean;
    insertRowButtonIndex?: number;
}
export default class RowControls extends Component<Props, any> {
    render(): JSX.Element | null;
    private clearHoverSelection;
    private insertRow;
    private deleteRows;
}
