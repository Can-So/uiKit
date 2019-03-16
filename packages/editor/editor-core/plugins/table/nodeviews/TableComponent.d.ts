import * as React from 'react';
import { Node as PmNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ResizeState } from '../pm-plugins/table-resizing';
import { TablePluginState } from '../types';
import { Props } from './table';
import { WidthPluginState } from '../../width';
export interface ComponentProps extends Props {
    view: EditorView;
    node: PmNode;
    allowColumnResizing: boolean;
    contentDOM: (element: HTMLElement | undefined) => void;
    containerWidth: WidthPluginState;
    pluginState: TablePluginState;
    tableResizingPluginState?: ResizeState;
    width: number;
}
interface TableState {
    scroll: number;
    tableContainerWidth: string;
    parentWidth?: number;
}
declare class TableComponent extends React.Component<ComponentProps, TableState> {
    state: {
        scroll: number;
        tableContainerWidth: string;
        parentWidth: undefined;
    };
    private wrapper;
    private table;
    private rightShadow;
    constructor(props: ComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: ComponentProps): void;
    render(): JSX.Element;
    private handleScroll;
    private handleTableResizing;
    private handleAutoSize;
    private updateTableContainerWidth;
    private getParentNode;
    private getParentNodeWidth;
    private updateParentWidth;
    private scaleTableDebounced;
    private handleTableResizingDebounced;
    private handleScrollDebounced;
    private handleAutoSizeDebounced;
}
export declare const updateRightShadow: (wrapper: HTMLElement | null, table: HTMLElement | null, rightShadow: HTMLElement | null) => void;
export default TableComponent;
