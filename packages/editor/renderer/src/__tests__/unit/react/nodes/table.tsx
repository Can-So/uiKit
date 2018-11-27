import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { akEditorTableNumberColumnWidth } from '@atlaskit/editor-common';
import Table from '../../../../react/nodes/table';
import TableCell from '../../../../react/nodes/tableCell';
import TableHeader from '../../../../react/nodes/tableHeader';
import TableRow from '../../../../react/nodes/tableRow';

describe('Renderer - React/Nodes/Table', () => {
  it('should render table DOM with all attributes', () => {
    const table = mount(
      <Table layout="full-width" isNumberColumnEnabled={true}>
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
    const table = shallow(
      <Table layout="default" isNumberColumnEnabled={true}>
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
          <Table layout="default" isNumberColumnEnabled={true}>
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
          <Table layout="default" isNumberColumnEnabled={true}>
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
      const columnWidths = [111, 222];
      const table = mount(
        <Table
          layout="default"
          isNumberColumnEnabled={true}
          columnWidths={columnWidths}
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
      const columnWidths = [111, 222];
      const table = mount(
        <Table
          layout="default"
          isNumberColumnEnabled={false}
          columnWidths={columnWidths}
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

  describe('When a columns does not have width', () => {
    it('should not collapse to a width smaller than defined min width', () => {
      const columnWidths = [500, 500, 0];
      const cellMinWidth = 128;
      const wrapperWidth = 680;

      const mock = jest.spyOn(window, 'getComputedStyle' as any);
      mock.mockImplementation(() => ({
        width: wrapperWidth,
        'min-width': cellMinWidth,
      }));

      const table = mount(
        <Table
          layout="default"
          isNumberColumnEnabled={true}
          columnWidths={columnWidths}
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
      table.setProps({ isNumberColumnEnabled: false });

      expect(table.find('col')).to.have.lengthOf(3);

      table.find('col').forEach((col, index) => {
        if (index < 2) {
          expect(col.prop('style')!.width).to.equal(`${columnWidths[index]}px`);
        } else {
          expect(col.prop('style')!.width).to.equal(`${cellMinWidth}px`);
        }
      });

      mock.mockRestore();
    });
  });
});
