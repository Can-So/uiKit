import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import {
  akEditorTableNumberColumnWidth,
  akEditorDefaultLayoutWidth,
  akEditorTableLegacyCellMinWidth as tableCellMinWidth,
} from '@atlaskit/editor-common';
import Table from '../../../../react/nodes/table';
import TableCell from '../../../../react/nodes/tableCell';
import TableHeader from '../../../../react/nodes/tableHeader';
import TableRow from '../../../../react/nodes/tableRow';

describe('Renderer - React/Nodes/Table', () => {
  const renderWidth = akEditorDefaultLayoutWidth;

  it('should render table DOM with all attributes', () => {
    const table = mount(
      <Table
        layout="full-width"
        isNumberColumnEnabled={true}
        renderWidth={renderWidth}
      >
        <TableRow>
          <TableCell />
        </TableRow>
      </Table>,
    );
    expect(table.find('table')).to.have.lengthOf(1);
    expect(table.find('div[data-layout="full-width"]')).to.have.lengthOf(1);
    expect(table.find('table').prop('data-number-column')).to.equal(true);
  });

  it('should render table props', () => {
    const columnWidths = [100, 110, 120];

    const table = mount(
      <Table
        layout="default"
        isNumberColumnEnabled={true}
        columnWidths={columnWidths}
        renderWidth={renderWidth}
      >
        <TableRow>
          <TableCell />
        </TableRow>
      </Table>,
    );

    expect(table.prop('layout')).to.equal('default');
    expect(table.prop('isNumberColumnEnabled')).to.equal(true);
    expect(table.prop('columnWidths')).to.equal(columnWidths);
    expect(table.find(TableRow).prop('isNumberColumnEnabled')).to.equal(true);
  });

  it('should render children', () => {
    const table = mount(
      <Table
        layout="default"
        isNumberColumnEnabled={true}
        renderWidth={renderWidth}
      >
        <TableRow>
          <TableCell />
          <TableCell />
        </TableRow>
      </Table>,
    );

    expect(table.prop('layout')).to.equal('default');
    expect(table.prop('isNumberColumnEnabled')).to.equal(true);
    expect(table.find(TableRow)).to.have.lengthOf(1);
    expect(table.find(TableCell)).to.have.lengthOf(2);
  });

  describe('When number column is enabled', () => {
    describe('When header row is enabled', () => {
      it('should start numbers from the second row', () => {
        const table = mount(
          <Table
            layout="default"
            isNumberColumnEnabled={true}
            renderWidth={renderWidth}
          >
            <TableRow>
              <TableHeader />
              <TableHeader />
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell />
            </TableRow>
          </Table>,
        );

        table.find('tr').forEach((row, index) => {
          expect(
            row
              .find('td')
              .at(0)
              .text(),
          ).to.equal(index === 0 ? '' : `${index}`);
        });
      });
    });
    describe('When header row is disabled', () => {
      it('should start numbers from the first row', () => {
        const table = mount(
          <Table
            layout="default"
            isNumberColumnEnabled={true}
            renderWidth={renderWidth}
          >
            <TableRow>
              <TableCell />
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell />
            </TableRow>
          </Table>,
        );

        table.find('tr').forEach((row, index) => {
          expect(
            row
              .find('td')
              .at(0)
              .text(),
          ).to.equal(`${index + 1}`);
        });
      });
    });
    it('should add an extra <col> node for number column', () => {
      const columnWidths = [300, 380];
      const table = mount(
        <Table
          layout="default"
          isNumberColumnEnabled={true}
          columnWidths={columnWidths}
          renderWidth={renderWidth}
        >
          <TableRow>
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
          </TableRow>
        </Table>,
      );
      expect(table.find('col')).to.have.lengthOf(3);

      table.find('col').forEach((col, index) => {
        if (index === 0) {
          expect(col.prop('style')!.width).to.equal(
            akEditorTableNumberColumnWidth,
          );
        } else {
          expect(col.prop('style')!.width).to.equal(
            `${columnWidths[index - 1]}px`,
          );
        }
      });
    });
  });

  describe('When number column is disabled', () => {
    it('should not add an extra <col> node for number column', () => {
      const columnWidths = [300, 380];
      const table = mount(
        <Table
          layout="default"
          isNumberColumnEnabled={false}
          columnWidths={columnWidths}
          renderWidth={renderWidth}
        >
          <TableRow>
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
          </TableRow>
        </Table>,
      );
      expect(table.find('col')).to.have.lengthOf(2);

      table.find('col').forEach((col, index) => {
        expect(col.prop('style')!.width).to.equal(`${columnWidths[index]}px`);
      });
    });
  });

  describe('When multiple columns do not have width', () => {
    describe('when renderWidth is smaller than table minimum allowed width', () => {
      it('should add minWidth to zero width columns', () => {
        const columnWidths = [220, 220, 0, 0];

        const table = mount(
          <Table
            layout="default"
            isNumberColumnEnabled={true}
            columnWidths={columnWidths}
            renderWidth={renderWidth}
          >
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </Table>,
        );
        table.setProps({ isNumberColumnEnabled: false });

        expect(table.find('col')).to.have.lengthOf(4);

        table.find('col').forEach((col, index) => {
          if (index < 2) {
            expect(col.prop('style')!.width).to.equal(
              `${columnWidths[index]}px`,
            );
          } else {
            expect(col.prop('style')!.width).to.equal(`${tableCellMinWidth}px`);
          }
        });
      });
    });
    describe('when renderWidth is greater than table minimum allowed width', () => {
      it('should not add minWidth to zero width columns', () => {
        const columnWidths = [200, 200, 0, 0];

        const table = mount(
          <Table
            layout="default"
            isNumberColumnEnabled={true}
            columnWidths={columnWidths}
            renderWidth={renderWidth}
          >
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </Table>,
        );
        table.setProps({ isNumberColumnEnabled: false });

        expect(table.find('col')).to.have.lengthOf(4);

        table.find('col').forEach((col, index) => {
          if (index < 2) {
            expect(col.prop('style')!.width).to.equal(
              `${columnWidths[index]}px`,
            );
          } else {
            expect(typeof col.prop('style')!.width).to.equal('undefined');
          }
        });
      });
    });
  });

  describe('TinyMCE migrated table', () => {
    it('should scale columnWidths if total size is less than layout', () => {
      const columnWidths = [100, 100, 100];

      const table = mount(
        <Table
          layout="default"
          isNumberColumnEnabled={false}
          columnWidths={columnWidths}
          renderWidth={renderWidth}
        >
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </Table>,
      );

      expect(table.find('col')).to.have.lengthOf(3);
      table.find('col').forEach(col => {
        expect(col.prop('style')!.width).to.equal(`226.67px`);
      });
    });
  });

  describe('when renderWidth is 10% lower than table width', () => {
    it('should scale down columns widths by 10%', () => {
      const columnWidths = [200, 200, 280];

      const table = mount(
        <Table
          layout="default"
          isNumberColumnEnabled={false}
          columnWidths={columnWidths}
          renderWidth={612}
        >
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </Table>,
      );

      expect(table.find('col')).to.have.lengthOf(3);
      table.find('col').forEach((col, index) => {
        const width = columnWidths[index] - columnWidths[index] * 0.1;
        expect(col.prop('style')!.width).to.equal(`${width}px`);
      });
    });
  });

  describe('when renderWidth is 20% lower than table width', () => {
    it('should scale down columns widths by 15% and then overflow', () => {
      const columnWidths = [200, 200, 280];

      const table = mount(
        <Table
          layout="default"
          isNumberColumnEnabled={false}
          columnWidths={columnWidths}
          renderWidth={578}
        >
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </Table>,
      );

      expect(table.find('col')).to.have.lengthOf(3);
      table.find('col').forEach((col, index) => {
        const width = columnWidths[index] - columnWidths[index] * 0.15;
        expect(col.prop('style')!.width).to.equal(`${width}px`);
      });
    });
  });
});
