import * as React from 'react';
import { ReactNode } from 'react';
import { TableLayout } from '@atlaskit/adf-schema';
import {
  calcTableWidth,
  WidthConsumer,
  TableSharedCssClassName,
  akEditorTableNumberColumnWidth,
  akEditorWideLayoutWidth,
  akEditorDefaultLayoutWidth,
  akEditorFullWidthLayoutWidth,
  akEditorTableLegacyCellMinWidth,
} from '@atlaskit/editor-common';
import overflowShadow, { OverflowShadowProps } from '../../ui/overflow-shadow';
import TableHeader from './tableHeader';
import { RendererAppearance } from '../../ui/Renderer';
import { FullPagePadding } from '../../ui/Renderer/style';

export interface TableProps {
  columnWidths?: Array<number>;
  layout: TableLayout;
  isNumberColumnEnabled: boolean;
  children: ReactNode;
  renderWidth: number;
  rendererAppearance?: RendererAppearance;
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

const getTableWidthLimit = (layout: TableLayout) => {
  switch (layout) {
    case 'full-width':
      return akEditorFullWidthLayoutWidth;
    case 'wide':
      return akEditorWideLayoutWidth;
    default:
      return akEditorDefaultLayoutWidth;
  }
};

const fixColumnWidth = (
  columnWidth: number,
  tableWidth: number,
  layoutWidth: number,
  zeroWidthColumnsCount: number,
) => {
  // If the tables total width (including no zero widths col or cols without width) is less than the current layout
  // We scale up the columns to meet the minimum of the table layout.
  if (zeroWidthColumnsCount === 0 && tableWidth < layoutWidth) {
    return (columnWidth * (layoutWidth / tableWidth)).toFixed(2);
  }

  return columnWidth;
};

class Table extends React.Component<TableProps & OverflowShadowProps> {
  render() {
    const { isNumberColumnEnabled, layout, children, renderWidth } = this.props;

    return (
      <div
        className={`${TableSharedCssClassName.TABLE_CONTAINER} ${
          this.props.shadowClassNames
        }`}
        data-layout={layout}
        ref={this.props.handleRef}
        style={{ width: calcTableWidth(layout, renderWidth, false) }}
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
    );
  }

  private renderColgroup = () => {
    const {
      columnWidths,
      layout,
      isNumberColumnEnabled,
      renderWidth,
    } = this.props;
    if (!columnWidths) {
      return null;
    }

    // @see ED-6056
    const widthLimit = getTableWidthLimit(layout);
    const maxTableWidth = renderWidth < widthLimit ? renderWidth : widthLimit;

    let tableWidth = 0;
    let minTableWidth = 0;
    let zeroWidthColumnsCount = 0;

    columnWidths.forEach(width => {
      if (width) {
        tableWidth += Math.ceil(width);
      } else {
        zeroWidthColumnsCount += 1;
      }
      minTableWidth += Math.ceil(width) || akEditorTableLegacyCellMinWidth;
    });
    let cellMinWidth = 0;
    if (zeroWidthColumnsCount > 0 && minTableWidth > maxTableWidth) {
      const minWidth = Math.ceil(
        (maxTableWidth - tableWidth) / zeroWidthColumnsCount,
      );
      cellMinWidth =
        minWidth < akEditorTableLegacyCellMinWidth
          ? akEditorTableLegacyCellMinWidth
          : minWidth;
    }

    return (
      <colgroup>
        {isNumberColumnEnabled && (
          <col style={{ width: akEditorTableNumberColumnWidth }} />
        )}
        {columnWidths.map((colWidth, idx) => {
          const width =
            fixColumnWidth(
              colWidth,
              minTableWidth,
              maxTableWidth,
              zeroWidthColumnsCount,
            ) || cellMinWidth;

          const style = width ? { width: `${width}px` } : {};
          return <col key={idx} style={style} />;
        })}
      </colgroup>
    );
  };
}

const TableWithShadows = overflowShadow(Table, {
  overflowSelector: `.${TableSharedCssClassName.TABLE_NODE_WRAPPER}`,
  scrollableSelector: 'table',
});

const TableWithWidth = (props: TableProps) => (
  <WidthConsumer>
    {({ width }) => {
      const renderWidth =
        props.rendererAppearance === 'full-page'
          ? width - FullPagePadding * 2
          : width;
      return <TableWithShadows renderWidth={renderWidth} {...props} />;
    }}
  </WidthConsumer>
);

export default TableWithWidth;
