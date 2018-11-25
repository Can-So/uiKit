import * as React from 'react';
import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { isTableSelected, selectTable, findTable } from 'prosemirror-utils';
import { TableMap } from 'prosemirror-tables';
import InsertButton from '../InsertButton';
import {
  clearHoverSelection,
  hoverTable,
  insertColumn,
  insertRow,
} from '../../../actions';
import { TableCssClassName as ClassName } from '../../../types';

export interface Props {
  editorView: EditorView;
  tableRef?: HTMLTableElement;
  isInDanger?: boolean;
  isHeaderColumnEnabled?: boolean;
  isHeaderRowEnabled?: boolean;
  isNumberColumnEnabled?: boolean;
  insertColumnButtonIndex?: number;
  insertRowButtonIndex?: number;
  hoveredRows?: number[];
}

export default class CornerControls extends Component<Props, any> {
  render() {
    const {
      isInDanger,
      isHeaderRowEnabled,
      isHeaderColumnEnabled,
      insertColumnButtonIndex,
      insertRowButtonIndex,
      tableRef,
    } = this.props;
    if (!tableRef) {
      return null;
    }
    const isActive = this.isActive();

    return (
      <div
        className={`${ClassName.CORNER_CONTROLS} ${isActive ? 'active' : ''}`}
      >
        <button
          type="button"
          className={`${ClassName.CONTROLS_CORNER_BUTTON} ${
            isActive && isInDanger ? 'danger' : ''
          }`}
          onClick={this.selectTable}
          onMouseOver={this.hoverTable}
          onMouseOut={this.clearHoverSelection}
        />
        {!isHeaderColumnEnabled && (
          <InsertButton
            type="column"
            tableRef={tableRef}
            index={0}
            showInsertButton={insertColumnButtonIndex === 0}
            onMouseDown={this.insertColumn}
          />
        )}
        {!isHeaderRowEnabled && (
          <InsertButton
            type="row"
            tableRef={tableRef}
            index={0}
            showInsertButton={insertRowButtonIndex === 0}
            onMouseDown={this.insertRow}
          />
        )}
      </div>
    );
  }

  private isActive = () => {
    const { editorView, hoveredRows } = this.props;
    const { selection } = editorView.state;
    const table = findTable(selection);
    if (!table) {
      return false;
    }
    return (
      isTableSelected(selection) ||
      (hoveredRows && hoveredRows.length === TableMap.get(table.node).height)
    );
  };

  private clearHoverSelection = () => {
    const { state, dispatch } = this.props.editorView;
    clearHoverSelection(state, dispatch);
  };

  private selectTable = () => {
    const { state, dispatch } = this.props.editorView;
    dispatch(selectTable(state.tr).setMeta('addToHistory', false));
  };

  private hoverTable = () => {
    const { state, dispatch } = this.props.editorView;
    hoverTable()(state, dispatch);
  };

  private insertColumn = () => {
    const { state, dispatch } = this.props.editorView;
    insertColumn(0)(state, dispatch);
  };

  private insertRow = () => {
    const { state, dispatch } = this.props.editorView;
    insertRow(0)(state, dispatch);
  };
}
