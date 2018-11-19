import * as React from 'react';
import { Component } from 'react';
import { isRowSelected } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { clearHoverSelection } from '../../../actions';
import { TableCssClassName as ClassName } from '../../../types';

export interface Props {
  editorView: EditorView;
  tableRef: HTMLElement;
  tableActive?: boolean;
  hoverRows: (rows: number[], danger?: boolean) => void;
  hoveredRows?: number[];
  selectRow: (row: number) => void;
  hasHeaderRow?: boolean;
  isInDanger?: boolean;
}

export default class NumberColumn extends Component<Props, any> {
  render() {
    const { tableRef, hasHeaderRow } = this.props;
    const tbody = tableRef.querySelector('tbody');
    if (!tbody) {
      return null;
    }
    const rows = tbody.querySelectorAll('tr');

    return (
      <div className={ClassName.NUMBERED_COLUMN}>
        {Array.from(Array(rows.length).keys()).map(index => (
          <div
            key={`wrapper-${index}`}
            className={this.getClassNames(index)}
            style={{
              height: (rows[index] as HTMLElement).offsetHeight + 1,
            }}
            onClick={() => this.selectRow(index)}
            onMouseOver={() => this.hoverRows(index)}
            onMouseOut={this.clearHoverSelection}
          >
            {hasHeaderRow ? (index > 0 ? index : null) : index + 1}
          </div>
        ))}
      </div>
    );
  }

  private hoverRows = (index: number) =>
    this.props.tableActive ? this.props.hoverRows([index]) : null;

  private selectRow = (index: number) =>
    this.props.tableActive ? this.props.selectRow(index) : null;

  private clearHoverSelection = () => {
    const { tableActive, editorView } = this.props;
    if (tableActive) {
      const { state, dispatch } = editorView;
      clearHoverSelection(state, dispatch);
    }
  };

  private getClassNames = (index: number) => {
    const { hoveredRows, editorView, isInDanger } = this.props;
    const isActive =
      isRowSelected(index)(editorView.state.selection) ||
      (hoveredRows || []).indexOf(index) !== -1;
    return [
      ClassName.NUMBERED_COLUMN_BUTTON,
      isActive ? 'active' : '',
      isActive && isInDanger ? 'danger' : '',
    ].join(' ');
  };
}
