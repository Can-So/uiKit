import * as React from 'react';
import rafSchedule from 'raf-schd';
import { Node as PmNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { TableMap } from 'prosemirror-tables';

import {
  browser,
  calcTableWidth,
  akEditorMobileBreakoutPoint,
} from '@atlaskit/editor-common';

import TableFloatingControls from '../ui/TableFloatingControls';
import ColumnControls from '../ui/TableFloatingControls/ColumnControls';

import { getPluginState } from '../pm-plugins/main';
import {
  ResizeState,
  scaleTable,
  setColumnWidths,
} from '../pm-plugins/table-resizing';

import { TablePluginState, TableCssClassName as ClassName } from '../types';
import * as classnames from 'classnames';
const isIE11 = browser.ie_version === 11;

import { Props } from './table';
import {
  containsHeaderRow,
  checkIfHeaderColumnEnabled,
  checkIfHeaderRowEnabled,
} from '../utils';
import { autoSizeTable } from '../actions';
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

class TableComponent extends React.Component<ComponentProps> {
  state: {
    scroll: number;
    tableContainerWidth: string;
  } = {
    scroll: 0,
    tableContainerWidth: 'inherit',
  };

  private wrapper: HTMLDivElement | null;
  private table: HTMLTableElement | null;
  private rightShadow: HTMLDivElement | null;
  private columnControls: React.Component | null;

  constructor(props) {
    super(props);

    // Disable inline table editing and resizing controls in Firefox
    // https://github.com/ProseMirror/prosemirror/issues/432
    if ('execCommand' in document) {
      ['enableObjectResizing', 'enableInlineTableEditing'].forEach(cmd => {
        if (document.queryCommandSupported(cmd)) {
          document.execCommand(cmd, false, 'false');
        }
      });
    }
  }

  componentDidMount() {
    const { allowColumnResizing } = this.props;

    if (allowColumnResizing && this.wrapper && !isIE11) {
      this.wrapper.addEventListener('scroll', this.handleScrollDebounced);
    }

    if (allowColumnResizing) {
      const { node, containerWidth } = this.props;

      setColumnWidths(
        this.table,
        node,
        containerWidth.width,
        node.attrs.layout,
      );

      this.setState(() => ({
        tableContainerWidth: calcTableWidth(
          node.attrs.layout,
          containerWidth.width,
        ),
      }));
    }
  }

  componentWillUnmount() {
    if (this.wrapper && !isIE11) {
      this.wrapper.removeEventListener('scroll', this.handleScrollDebounced);
    }

    this.handleScrollDebounced.cancel();
  }

  componentDidUpdate(prevProps) {
    updateRightShadow(this.wrapper, this.table, this.rightShadow);

    if (this.props.node.attrs.__autoSize) {
      // Wait for next tick to handle auto sizing, gives the browser time to do layout calc etc.
      this.handleAutoSizeDebounced();
    } else if (this.props.allowColumnResizing && this.table) {
      this.handleTableResizing(prevProps);
    }
  }

  render() {
    const {
      view,
      node,
      pluginState,
      tableResizingPluginState,
      width,
    } = this.props;

    const {
      pluginConfig: { allowControls = true },
    } = pluginState;

    // doesn't work well with WithPluginState
    const {
      isInDanger,
      hoveredColumns,
      hoveredRows,
      insertColumnButtonIndex,
      insertRowButtonIndex,
    } = getPluginState(view.state);

    const tableRef = this.table || undefined;
    const tableActive = this.table === pluginState.tableRef;
    const isResizing =
      !!tableResizingPluginState && !!tableResizingPluginState.dragging;
    const { scroll } = this.state;

    const rowControls = [
      <div
        key={0}
        className={`${ClassName.ROW_CONTROLS_WRAPPER} ${
          scroll > 0 ? ClassName.TABLE_LEFT_SHADOW : ''
        }`}
      >
        <TableFloatingControls
          editorView={view}
          tableRef={tableRef}
          tableActive={tableActive}
          hoveredRows={hoveredRows}
          isInDanger={isInDanger}
          isResizing={isResizing}
          isNumberColumnEnabled={node.attrs.isNumberColumnEnabled}
          isHeaderColumnEnabled={checkIfHeaderColumnEnabled(view.state)}
          isHeaderRowEnabled={checkIfHeaderRowEnabled(view.state)}
          hasHeaderRow={containsHeaderRow(view.state, node)}
          // pass `selection` and `tableHeight` to control re-render
          selection={view.state.selection}
          tableHeight={tableRef ? tableRef.offsetHeight : undefined}
          insertColumnButtonIndex={insertColumnButtonIndex}
          insertRowButtonIndex={insertRowButtonIndex}
        />
      </div>,
    ];

    const columnControls = [
      <div key={0} className={ClassName.COLUMN_CONTROLS_WRAPPER}>
        <ColumnControls
          editorView={view}
          tableRef={tableRef}
          ref={elem => (this.columnControls = elem)}
          hoveredColumns={hoveredColumns}
          isInDanger={isInDanger}
          isResizing={isResizing}
          // pass `selection` and `numberOfColumns` to control re-render
          selection={view.state.selection}
          numberOfColumns={node.firstChild!.childCount}
          insertColumnButtonIndex={insertColumnButtonIndex}
        />
      </div>,
    ];

    return (
      <div
        style={{
          width: this.state.tableContainerWidth,
        }}
        className={classnames(ClassName.TABLE_CONTAINER, {
          [ClassName.WITH_CONTROLS]: tableActive,
          'less-padding': width < akEditorMobileBreakoutPoint,
        })}
        data-number-column={node.attrs.isNumberColumnEnabled}
        data-layout={node.attrs.layout}
      >
        {allowControls && rowControls}
        <div
          className={classnames(ClassName.TABLE_NODE_WRAPPER)}
          ref={elem => {
            this.wrapper = elem;
            this.props.contentDOM(elem ? elem : undefined);
            if (elem) {
              this.table = elem.querySelector('table');
            }
          }}
        >
          {allowControls && columnControls}
        </div>
        <div
          ref={elem => {
            this.rightShadow = elem;
          }}
          className={ClassName.TABLE_RIGHT_SHADOW}
        />
      </div>
    );
  }

  private handleScroll = (event: Event) => {
    if (!this.wrapper || event.target !== this.wrapper) {
      return;
    }

    this.setState({ scroll: this.wrapper.scrollLeft });
  };

  private handleScrollDebounced = rafSchedule(this.handleScroll);

  private handleTableResizing(prevProps) {
    const { view, node, getPos, containerWidth } = this.props;

    const prevAttrs = prevProps.node.attrs;
    const currentAttrs = node.attrs;

    const prevMap = TableMap.get(prevProps.node);
    const currentMap = TableMap.get(node);

    if (
      prevMap.width !== currentMap.width ||
      prevAttrs.layout !== currentAttrs.layout ||
      prevAttrs.isNumberColumnEnabled !== currentAttrs.isNumberColumnEnabled ||
      prevAttrs.__autoSize !== currentAttrs.__autoSize ||
      prevProps.containerWidth !== containerWidth
    ) {
      scaleTable(
        view,
        this.table,
        node,
        getPos(),
        containerWidth.width,
        currentAttrs.layout,
      );

      if (this.columnControls) {
        this.columnControls.forceUpdate();
      }

      this.setState(() => ({
        tableContainerWidth: calcTableWidth(
          currentAttrs.layout,
          containerWidth.width,
        ),
      }));
    }
  }

  private handleAutoSize = () => {
    if (this.table) {
      const { view, node, getPos } = this.props;
      const { state, dispatch } = view;
      autoSizeTable(node, this.table, getPos())(state, dispatch);
    }
  };

  private handleAutoSizeDebounced = rafSchedule(this.handleAutoSize);
}

export const updateRightShadow = (
  wrapper: HTMLElement | null,
  table: HTMLElement | null,
  rightShadow: HTMLElement | null,
) => {
  if (table && wrapper && rightShadow) {
    const diff = table.offsetWidth - wrapper.offsetWidth;
    rightShadow.style.display =
      diff > 0 && diff > wrapper.scrollLeft ? 'block' : 'none';
  }
  return;
};

export default TableComponent;
