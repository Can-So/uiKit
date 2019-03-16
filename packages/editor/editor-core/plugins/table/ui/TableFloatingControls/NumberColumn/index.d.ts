import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
export interface Props {
    editorView: EditorView;
    tableRef: HTMLElement;
    tableActive?: boolean;
    hoverRows: (rows: number[], danger?: boolean) => void;
    hoveredRows?: number[];
    selectRow: (row: number) => void;
    hasHeaderRow?: boolean;
    isInDanger?: boolean;
    isResizing?: boolean;
}
export default class NumberColumn extends Component<Props, any> {
    render(): JSX.Element | null;
    private hoverRows;
    private selectRow;
    private clearHoverSelection;
    private getClassNames;
}
