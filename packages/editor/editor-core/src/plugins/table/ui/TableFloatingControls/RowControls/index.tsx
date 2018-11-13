import * as React from 'react';
import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { isCellSelection } from 'prosemirror-utils';
import {
  clearHoverSelection,
  insertRow,
  deleteSelectedRows,
} from '../../../actions';
import InsertButton from '../InsertButton';
import DeleteButton from '../DeleteButton';
import {
  RowParams,
  getRowHeights,
  isRowInsertButtonVisible,
  isRowDeleteButtonVisible,
  getRowDeleteButtonParams,
  getRowsParams,
  getRowClassNames,
} from '../../../utils';
import { TableCssClassName as ClassName } from '../../../types';
import tableMessages from '../../messages';

export interface Props {
  editorView: EditorView;
  tableRef: HTMLTableElement;
  selectRow: (row: number) => void;
  hoverRows: (rows: number[], danger?: boolean) => void;
  hoveredRows?: number[];
  isInDanger?: boolean;
  insertRowButtonIndex?: number;
}

export default class RowControls extends Component<Props, any> {
  render() {
    const {
      editorView,
      tableRef,
      insertRowButtonIndex,
      hoveredRows,
      isInDanger,
    } = this.props;
    if (!tableRef) {
      return null;
    }
    const { selection } = editorView.state;
    const rowHeights = getRowHeights(tableRef);
    const rowsParams = getRowsParams(rowHeights);
    const deleteBtnParams = getRowDeleteButtonParams(rowHeights, selection);

    return (
      <div className={ClassName.ROW_CONTROLS}>
        <div className={ClassName.ROW_CONTROLS_INNER}>
          {rowsParams.map(({ startIndex, endIndex, height }: RowParams) => (
            <div
              className={`${
                ClassName.ROW_CONTROLS_BUTTON_WRAP
              } ${getRowClassNames(
                startIndex,
                selection,
                hoveredRows,
                isInDanger,
              )}`}
              key={startIndex}
              style={{ height }}
            >
              <button
                type="button"
                className={ClassName.CONTROLS_BUTTON}
                onMouseDown={() => this.props.selectRow(startIndex)}
                onMouseOver={() => this.props.hoverRows([startIndex])}
                onMouseOut={this.clearHoverSelection}
              >
                {!isCellSelection(selection) && (
                  <>
                    <div
                      className={ClassName.CONTROLS_BUTTON_OVERLAY}
                      data-index={startIndex}
                    />
                    <div
                      className={ClassName.CONTROLS_BUTTON_OVERLAY}
                      data-index={endIndex}
                    />
                  </>
                )}
              </button>
              {isRowInsertButtonVisible(endIndex, selection) && (
                <InsertButton
                  type="row"
                  tableRef={tableRef}
                  index={endIndex}
                  showInsertButton={insertRowButtonIndex === endIndex}
                  onMouseDown={() => this.insertRow(endIndex)}
                />
              )}
            </div>
          ))}
          {isRowDeleteButtonVisible(selection) && deleteBtnParams && (
            <DeleteButton
              key="delete"
              removeLabel={tableMessages.removeRows}
              style={{ top: deleteBtnParams.top }}
              onClick={this.deleteSelectedRows}
              onMouseEnter={() =>
                this.props.hoverRows(deleteBtnParams.indexes, true)
              }
              onMouseLeave={this.clearHoverSelection}
            />
          )}
        </div>
      </div>
    );
  }

  private clearHoverSelection = () => {
    const { state, dispatch } = this.props.editorView;
    clearHoverSelection(state, dispatch);
  };

  private insertRow = (row: number) => {
    const { state, dispatch } = this.props.editorView;
    insertRow(row)(state, dispatch);
  };

  private deleteSelectedRows = () => {
    const { state, dispatch } = this.props.editorView;
    deleteSelectedRows(state, dispatch);
    this.clearHoverSelection();
  };
}
