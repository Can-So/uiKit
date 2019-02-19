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
  tableCellBorderWidth,
  tableCellMinWidth,
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

// we allow scaling down column widths by no more than 15%
const MAX_SCALING_PERCENT = 0.15;

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

const getTableLayoutWidth = (layout: TableLayout) => {
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
  scaleDownPercent: number,
): number => {
  if (columnWidth === 0) {
    return columnWidth;
  }

  // If the tables total width (including no zero widths col or cols without width) is less than the current layout
  // We scale up the columns to meet the minimum of the table layout.
  if (zeroWidthColumnsCount === 0 && scaleDownPercent) {
    return Math.floor((1 - scaleDownPercent) * columnWidth);
  }

  return Math.max(
    // We need to take tableCellBorderWidth, to avoid unneccesary overflow.
    columnWidth - tableCellBorderWidth,
    zeroWidthColumnsCount ? akEditorTableLegacyCellMinWidth : tableCellMinWidth,
  );
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
    const layoutWidth = getTableLayoutWidth(layout);
    const maxTableWidth = renderWidth < layoutWidth ? renderWidth : layoutWidth;

    let tableWidth = isNumberColumnEnabled ? akEditorTableNumberColumnWidth : 0;
    let minTableWidth = tableWidth;
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
    let scaleDownPercent = 0;
    // fixes migration tables with zero-width columns
    if (zeroWidthColumnsCount > 0) {
      if (minTableWidth > maxTableWidth) {
        const minWidth = Math.ceil(
          (maxTableWidth - tableWidth) / zeroWidthColumnsCount,
        );
        cellMinWidth =
          minWidth < akEditorTableLegacyCellMinWidth
            ? akEditorTableLegacyCellMinWidth
            : minWidth;
      }
    }
    // scaling down
    else if (renderWidth < tableWidth) {
      const diffPercent = 1 - renderWidth / tableWidth;
      scaleDownPercent =
        diffPercent < MAX_SCALING_PERCENT ? diffPercent : MAX_SCALING_PERCENT;
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
              scaleDownPercent,
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
