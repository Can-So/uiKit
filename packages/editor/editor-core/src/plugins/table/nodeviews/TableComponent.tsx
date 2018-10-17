import * as React from 'react';
import rafSchedule from 'raf-schd';
import { updateColumnsOnResize } from 'prosemirror-tables';
import { browser } from '@atlaskit/editor-common';
import { calcTableWidth } from '@atlaskit/editor-common';

import TableFloatingControls from '../ui/TableFloatingControls';
import ColumnControls from '../ui/TableFloatingControls/ColumnControls';

import { getPluginState } from '../pm-plugins/main';
import { scaleTable, setColumnWidths } from '../pm-plugins/table-resizing';

import { TablePluginState, TableCssClassName as ClassName } from '../types';
import { getCellMinWidth } from '../';

const isIE11 = browser.ie_version === 11;

import { Props } from './table';
import {
  containsHeaderRow,
  checkIfHeaderColumnEnabled,
  checkIfHeaderRowEnabled,
} from '../utils';
import { WidthPluginState } from '../../width';

export interface ComponentProps extends Props {
  onComponentMount: () => void;
  contentDOM: (element: HTMLElement | undefined) => void;

  containerWidth: WidthPluginState;
  pluginState: TablePluginState;
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
    const {
      onComponentMount,
      allowColumnResizing,
      UNSAFE_allowFlexiColumnResizing,
    } = this.props;

    onComponentMount();

    if (allowColumnResizing && this.wrapper && !isIE11) {
      this.wrapper.addEventListener('scroll', this.handleScrollDebounced);
    }

    if (allowColumnResizing && UNSAFE_allowFlexiColumnResizing) {
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

    if (this.props.allowColumnResizing && this.table) {
      if (this.props.UNSAFE_allowFlexiColumnResizing) {
        this.handleTableResizing(prevProps);
      } else {
        updateColumnsOnResize(
          this.props.node,
          this.table.querySelector('colgroup')!,
          this.table,
          getCellMinWidth(false),
        );
      }
    }
  }

  render() {
    const { view, node, pluginState, containerWidth } = this.props;
    const {
      pluginConfig: { allowControls = true },
    } = pluginState;

    // doesn't work well with WithPluginState
    const {
      isTableHovered,
      isTableInDanger,
      dangerColumns,
      dangerRows,
      insertColumnButtonIndex,
      insertRowButtonIndex,
    } = getPluginState(view.state);

    const tableRef = this.table || undefined;
    const tableActive = this.table === pluginState.tableRef;
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
          isTableHovered={isTableHovered}
          isTableInDanger={isTableInDanger}
          dangerRows={dangerRows}
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
          isTableHovered={isTableHovered}
          isTableInDanger={isTableInDanger}
          dangerColumns={dangerColumns}
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
          width: this.getTableContainerWidth(node.attrs.layout, containerWidth),
        }}
        className={`${ClassName.TABLE_CONTAINER} ${
          tableActive ? ClassName.WITH_CONTROLS : ''
        }`}
        data-number-column={node.attrs.isNumberColumnEnabled}
        data-layout={node.attrs.layout}
      >
        {allowControls && rowControls}
        <div
          className={ClassName.TABLE_NODE_WRAPPER}
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

  private getTableContainerWidth(layout, containerWidth: WidthPluginState) {
    if (this.props.UNSAFE_allowFlexiColumnResizing) {
      return this.state.tableContainerWidth;
    } else {
      return calcTableWidth(layout, containerWidth.width);
    }
  }

  private handleTableResizing(prevProps) {
    const { view, node, getPos, containerWidth } = this.props;

    const prevAttrs = prevProps.node.attrs;
    const currentAttrs = node.attrs;

    const prevColCount = prevProps.node.firstChild!.childCount;
    const currentColCount = node.firstChild!.childCount;

    if (
      prevColCount !== currentColCount ||
      prevAttrs.layout !== currentAttrs.layout ||
      prevAttrs.isNumberColumnEnabled !== currentAttrs.isNumberColumnEnabled ||
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
