import * as React from 'react';
import { Component } from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { getSelectionRect } from 'prosemirror-utils';
import { Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { splitCell } from 'prosemirror-tables';
import { colors } from '@atlaskit/theme';
import {
  tableBackgroundColorPalette,
  tableBackgroundBorderColors,
} from '@atlaskit/adf-schema';
import {
  mergeCells,
  canMergeCells,
  deleteColumns,
  deleteRows,
} from '../../transforms';
import { getPluginState } from '../../pm-plugins/main';
import {
  hoverColumns,
  hoverRows,
  clearHoverSelection,
  insertColumn,
  insertRow,
  toggleContextualMenu,
  emptyMultipleCells,
  setMultipleCellAttrs,
} from '../../actions';
import { CellRect, TableCssClassName as ClassName } from '../../types';
import { contextualMenuDropdownWidth } from '../styles';
import { Shortcut } from '../../../../ui/styles';
import DropdownMenu from '../../../../ui/DropdownMenu';
import {
  analyticsService as analytics,
  withAnalytics,
} from '../../../../analytics';
import ColorPalette from '../../../../ui/ColorPalette';
import tableMessages from '../messages';

export const messages = defineMessages({
  cellBackground: {
    id: 'fabric.editor.cellBackground',
    defaultMessage: 'Cell background',
    description: 'Change the background color of a table cell.',
  },
  mergeCells: {
    id: 'fabric.editor.mergeCells',
    defaultMessage: 'Merge cells',
    description: 'Merge tables cells together.',
  },
  splitCell: {
    id: 'fabric.editor.splitCell',
    defaultMessage: 'Split cell',
    description: 'Split a merged table cell.',
  },
  clearCells: {
    id: 'fabric.editor.clearCells',
    defaultMessage: 'Clear {0, plural, one {cell} other {cells}}',
    description:
      'Clears the contents of the selected cells (this does not delete the cells themselves).',
  },
});

export interface Props {
  editorView: EditorView;
  isOpen: boolean;
  columnSelectionRect: CellRect;
  rowSelectionRect: CellRect;
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

class ContextualMenu extends Component<Props & InjectedIntlProps, State> {
  state: State = {
    isSubmenuOpen: false,
  };

  static defaultProps = {
    boundariesElement: document.body,
  };

  render() {
    const { isOpen, mountPoint, offset, boundariesElement } = this.props;
    const items = this.createItems();
    if (!items) {
      return null;
    }

    return (
      <div onMouseLeave={this.closeSubmenu}>
        <DropdownMenu
          mountTo={mountPoint}
          items={items}
          isOpen={isOpen}
          onOpenChange={this.handleOpenChange}
          onItemActivated={this.onMenuItemActivated}
          onMouseEnter={this.handleItemMouseEnter}
          onMouseLeave={this.handleItemMouseLeave}
          fitHeight={188}
          fitWidth={contextualMenuDropdownWidth}
          boundariesElement={boundariesElement}
          offset={offset}
        />
      </div>
    );
  }

  private handleSubMenuRef = ref => {
    const { boundariesElement } = this.props;

    if (!(boundariesElement && ref)) {
      return;
    }

    const boundariesRect = boundariesElement.getBoundingClientRect();
    const rect = ref.getBoundingClientRect();

    if (rect.left + rect.width - boundariesRect.left > boundariesRect.width) {
      ref.style.left = `-${rect.width}px`;
    }
  };

  private createItems = () => {
    const {
      allowMergeCells,
      allowBackgroundColor,
      editorView: { state },
      targetCellPosition,
      isOpen,
      columnSelectionRect,
      rowSelectionRect,
      intl: { formatMessage },
    } = this.props;
    const items: any[] = [];
    const { isSubmenuOpen } = this.state;
    if (allowBackgroundColor) {
      const node =
        isOpen && targetCellPosition
          ? state.doc.nodeAt(targetCellPosition)
          : null;
      const background =
        node && node.attrs.background ? node.attrs.background : '#ffffff';
      items.push({
        content: formatMessage(messages.cellBackground),
        value: { name: 'background' },
        elemAfter: (
          <div>
            <div
              className={ClassName.CONTEXTUAL_MENU_ICON}
              style={{ background }}
            />
            {isSubmenuOpen && (
              <div
                className={ClassName.CONTEXTUAL_SUBMENU}
                ref={this.handleSubMenuRef}
              >
                <ColorPalette
                  palette={tableBackgroundColorPalette}
                  borderColors={tableBackgroundBorderColors}
                  onClick={this.setColor}
                  selectedColor={background}
                  checkMarkColor={colors.N500}
                />
              </div>
            )}
          </div>
        ),
      });
    }

    items.push({
      content: formatMessage(tableMessages.insertColumn),
      value: { name: 'insert_column' },
      elemAfter: <Shortcut>⌃⌥→</Shortcut>,
    });

    items.push({
      content: formatMessage(tableMessages.insertRow),
      value: { name: 'insert_row' },
      elemAfter: <Shortcut>⌃⌥↓</Shortcut>,
    });

    const { right, left } = columnSelectionRect;
    const { top, bottom } = rowSelectionRect;
    const noOfColumns = right - left;
    const noOfRows = bottom - top;

    items.push({
      content: formatMessage(tableMessages.removeColumns, {
        0: noOfColumns,
      }),
      value: { name: 'delete_column' },
    });

    items.push({
      content: formatMessage(tableMessages.removeRows, {
        0: noOfRows,
      }),
      value: { name: 'delete_row' },
    });

    if (allowMergeCells) {
      items.push({
        content: formatMessage(messages.mergeCells),
        value: { name: 'merge' },
        isDisabled: !canMergeCells(state.tr),
      });
      items.push({
        content: formatMessage(messages.splitCell),
        value: { name: 'split' },
        isDisabled: !splitCell(state),
      });
    }

    items.push({
      content: formatMessage(messages.clearCells, {
        0: Math.max(noOfColumns, noOfRows),
      }),
      value: { name: 'clear' },
      elemAfter: <Shortcut>⌫</Shortcut>,
    });

    return items.length ? [{ items }] : null;
  };

  private onMenuItemActivated = ({ item }) => {
    const {
      editorView,
      columnSelectionRect,
      rowSelectionRect,
      targetCellPosition,
    } = this.props;
    const { state, dispatch } = editorView;

    switch (item.value.name) {
      case 'merge':
        analytics.trackEvent('atlassian.editor.format.table.merge.button');
        dispatch(mergeCells(state.tr));
        this.toggleOpen();
        break;
      case 'split':
        analytics.trackEvent('atlassian.editor.format.table.split.button');
        splitCell(state, dispatch);
        this.toggleOpen();
        break;
      case 'clear':
        analytics.trackEvent('atlassian.editor.format.table.split.button');
        emptyMultipleCells(targetCellPosition)(state, dispatch);
        this.toggleOpen();
        break;
      case 'insert_column':
        insertColumn(columnSelectionRect.right)(state, dispatch);
        this.toggleOpen();
        break;
      case 'insert_row':
        insertRow(rowSelectionRect.bottom)(state, dispatch);
        this.toggleOpen();
        break;
      case 'delete_column':
        analytics.trackEvent(
          'atlassian.editor.format.table.delete_column.button',
        );
        dispatch(
          deleteColumns(
            getSelectedColumnIndexes(state.tr, columnSelectionRect),
          )(state.tr),
        );
        this.toggleOpen();
        break;
      case 'delete_row':
        analytics.trackEvent('atlassian.editor.format.table.delete_row.button');
        const {
          pluginConfig: { isHeaderRowRequired },
        } = getPluginState(state);
        dispatch(
          deleteRows(
            getSelectedRowIndexes(state.tr, rowSelectionRect),
            isHeaderRowRequired,
          )(state.tr),
        );
        this.toggleOpen();
        break;
    }
  };

  private toggleOpen = () => {
    const {
      isOpen,
      editorView: { state, dispatch },
    } = this.props;
    toggleContextualMenu(state, dispatch);
    if (!isOpen) {
      this.setState({
        isSubmenuOpen: false,
      });
    }
  };

  private handleOpenChange = ({ isOpen }) => {
    const {
      editorView: { state, dispatch },
    } = this.props;
    toggleContextualMenu(state, dispatch);
    this.setState({ isSubmenuOpen: false });
  };

  private handleItemMouseEnter = ({ item }) => {
    const {
      editorView: { state, dispatch },
      columnSelectionRect,
      rowSelectionRect,
    } = this.props;

    if (item.value.name === 'background') {
      if (!this.state.isSubmenuOpen) {
        this.setState({ isSubmenuOpen: true });
      }
    }

    if (item.value.name === 'delete_column') {
      hoverColumns(
        getSelectedColumnIndexes(state.tr, columnSelectionRect),
        true,
      )(state, dispatch);
    }
    if (item.value.name === 'delete_row') {
      hoverRows(getSelectedRowIndexes(state.tr, rowSelectionRect), true)(
        state,
        dispatch,
      );
    }
  };

  private handleItemMouseLeave = ({ item }) => {
    const { state, dispatch } = this.props.editorView;
    if (item.value.name === 'background') {
      this.closeSubmenu();
    }
    if (
      item.value.name === 'delete_column' ||
      item.value.name === 'delete_row'
    ) {
      clearHoverSelection(state, dispatch);
    }
  };

  private closeSubmenu = () => {
    if (this.state.isSubmenuOpen) {
      this.setState({ isSubmenuOpen: false });
    }
  };

  private setColor = withAnalytics(
    'atlassian.editor.format.table.backgroundColor.button',
    color => {
      const { targetCellPosition, editorView } = this.props;
      const { state, dispatch } = editorView;
      setMultipleCellAttrs({ background: color }, targetCellPosition)(
        state,
        dispatch,
      );
      this.toggleOpen();
    },
  );
}

export const getSelectedColumnIndexes = (
  tr: Transaction,
  selectionRect: CellRect,
): number[] => {
  let from = selectionRect.left;
  let to = selectionRect.right;
  const rect = getSelectionRect(tr.selection);
  if (rect) {
    from = Math.min(rect.left, selectionRect.left);
    to = Math.max(rect.right, selectionRect.right);
  }
  const columnIndexes: number[] = [];
  for (let i = from; i < to; i++) {
    columnIndexes.push(i);
  }
  return columnIndexes;
};

export const getSelectedRowIndexes = (
  tr: Transaction,
  selectionRect: CellRect,
): number[] => {
  let from = selectionRect.top;
  let to = selectionRect.bottom;
  const rect = getSelectionRect(tr.selection);
  if (rect) {
    from = Math.min(rect.top, selectionRect.top);
    to = Math.max(rect.bottom, selectionRect.bottom);
  }
  const rowIndexes: number[] = [];
  for (let i = from; i < to; i++) {
    rowIndexes.push(i);
  }
  return rowIndexes;
};

export default injectIntl(ContextualMenu);
