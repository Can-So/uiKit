import * as React from 'react';
import { ReactNode } from 'react';
import { TableLayout } from '@atlaskit/adf-schema';
import {
  calcTableWidth,
  WidthConsumer,
  TableSharedCssClassName,
  akEditorTableNumberColumnWidth,
  tableCellMinWidth,
} from '@atlaskit/editor-common';
import overflowShadow, { OverflowShadowProps } from '../../ui/overflow-shadow';
import TableHeader from './tableHeader';

export interface TableProps {
  columnWidths?: Array<number>;
  layout: TableLayout;
  isNumberColumnEnabled: boolean;
  children: ReactNode;
}

const isHeaderRowEnabled = rows => {
  if (!rows.length) {
    return false;
  }
  const { children } = rows[0].props;
  if (!children.length) {
    return false;
  }
  return children[0].type === TableHeader;
};

const addNumberColumnIndexes = rows => {
  const headerRowEnabled = isHeaderRowEnabled(rows);
  return React.Children.map(rows, (row, index) => {
    return React.cloneElement(React.Children.only(row), {
      isNumberColumnEnabled: true,
      index: headerRowEnabled ? (index === 0 ? '' : index) : index + 1,
    });
  });
};

class Table extends React.Component<TableProps & OverflowShadowProps> {
  wrapper: HTMLDivElement | null;

  render() {
    const { isNumberColumnEnabled, layout, children } = this.props;

    return (
      <WidthConsumer>
        {({ width }) => (
          <div
            className={`${TableSharedCssClassName.TABLE_CONTAINER} ${
              this.props.shadowClassNames
            }`}
            data-layout={layout}
            ref={ref => {
              this.wrapper = ref;
              this.props.handleRef(ref);
            }}
            style={{ width: calcTableWidth(layout, width, false) }}
          >
            <div className={TableSharedCssClassName.TABLE_NODE_WRAPPER}>
              <table data-number-column={isNumberColumnEnabled}>
                {this.renderColgroup()}
                <tbody>
                  {isNumberColumnEnabled
                    ? addNumberColumnIndexes(children)
                    : children}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </WidthConsumer>
    );
  }

  private renderColgroup = () => {
    const { columnWidths, isNumberColumnEnabled } = this.props;
    if (!columnWidths) {
      return null;
    }
    let actualWidth = 0;
    if (this.wrapper) {
      actualWidth = this.wrapper.offsetWidth;
    } else {
      this.forceUpdate();
      return;
    }

    const minTableWidth = columnWidths.reduce((acc: number, width: number) => {
      return (acc += Math.ceil(width) || tableCellMinWidth);
    }, 0);

    return (
      <colgroup>
        {isNumberColumnEnabled && (
          <col style={{ width: akEditorTableNumberColumnWidth }} />
        )}
        {columnWidths.map((colWidth, idx) => {
          let width;
          // @see ED-5775:
          // we can't rely on css min-width as long as we use "table-layout: fixed"
          // therefore if a column is not resized, we enforce min-width when table is smaller than minimum table width
          if (colWidth) {
            width = colWidth < tableCellMinWidth ? tableCellMinWidth : colWidth;
          } else {
            width = actualWidth <= minTableWidth ? tableCellMinWidth : 0;
          }
          const style = width ? { width: `${width}px` } : {};
          return <col key={idx} style={style} />;
        })}
      </colgroup>
    );
  };
}

export default overflowShadow(Table, {
  overflowSelector: `.${TableSharedCssClassName.TABLE_NODE_WRAPPER}`,
  scrollableSelector: 'table',
});
