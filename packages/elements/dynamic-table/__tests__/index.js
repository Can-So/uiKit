// @flow
import React from 'react';
import { mount } from 'enzyme';
import { PaginationStateless } from '@atlaskit/pagination';
import TableHead from '../src/components/TableHead';
import {
  EmptyViewContainer,
  EmptyViewWithFixedHeight,
} from '../src/styled/EmptyBody';
import Body from '../src/components/Body';
import LoadingContainer from '../src/components/LoadingContainer';
import LoadingContainerAdvanced from '../src/components/LoadingContainerAdvanced';
import { Caption } from '../src/styled/DynamicTable';
import DynamicTable, { DynamicTableStateless } from '../src';

import { name } from '../package.json';

const head = {
  cells: [
    {
      key: 'first_name',
      content: 'First name',
      isSortable: true,
    },
    {
      key: 'last_name',
      content: 'Last name',
    },
  ],
};

const rows = [
  {
    cells: [
      {
        key: 'baob',
        content: 'Barak',
      },
      {
        content: 'Obama',
      },
    ],
  },
  {
    cells: [
      {
        key: 'dotr',
        content: 'Donald',
      },
      {
        content: 'Trump',
      },
    ],
  },
  {
    cells: [
      {
        key: 'hicl',
        content: 'Hillary',
      },
      {
        content: 'Clinton',
      },
    ],
  },
];

describe(name, () => {
  describe('stateless', () => {
    it('should render TableHead when items length is 0 and not render EmptyViewContainer if emptyView prop is ommitted', () => {
      const wrapper = mount(<DynamicTableStateless head={head} />);
      const header = wrapper.find(TableHead);
      const emptyView = wrapper.find(EmptyViewContainer);
      const body = wrapper.find(Body);
      expect(header.length).toBe(1);
      expect(emptyView.length).toBe(0);
      expect(body.length).toBe(0);
    });
    it('should not render any text in the table when rows prop is an empty array', () => {
      const wrapper = mount(<DynamicTableStateless rows={[]} head={head} />);
      const header = wrapper.find(TableHead);
      const table = wrapper.find('table');
      expect(table.nodes[0].childNodes.length).toBe(1);
      expect(header.length).toBe(1);
    });
    it('should render TableHead when items length is 0 and render EmptyViewContainer if emptyView prop is provided', () => {
      const wrapper = mount(
        <DynamicTableStateless
          head={head}
          emptyView={<h2>No items present in table</h2>}
        />,
      );
      const header = wrapper.find(TableHead);
      const emptyView = wrapper.find(EmptyViewContainer);
      const body = wrapper.find(Body);
      expect(header.length).toBe(1);
      expect(emptyView.length).toBe(1);
      expect(body.length).toBe(0);
    });
    it('should not render TableHead if head prop is not provided and should render EmptyViewContainer if emptyView prop is provided', () => {
      const wrapper = mount(
        <DynamicTableStateless
          emptyView={<h2>No items present in table</h2>}
        />,
      );
      const header = wrapper.find(TableHead);
      const emptyView = wrapper.find(EmptyViewContainer);
      const body = wrapper.find(Body);
      expect(header.length).toBe(0);
      expect(body.length).toBe(0);
      expect(emptyView.length).toBe(1);
    });

    it('should render head, emptyView and caption if provided', () => {
      const wrapper = mount(
        <DynamicTableStateless
          head={head}
          emptyView={<h2>No items present in table</h2>}
          caption={<h2>This is a table caption</h2>}
        />,
      );
      const header = wrapper.find(TableHead);
      const emptyView = wrapper.find(EmptyViewContainer);
      const caption = wrapper.find(Caption);
      const body = wrapper.find(Body);
      expect(header.length).toBe(1);
      expect(emptyView.length).toBe(1);
      expect(caption.length).toBe(1);
      expect(body.length).toBe(0);
    });

    it('should display paginated data', () => {
      const wrapper = mount(
        <DynamicTableStateless
          rowsPerPage={2}
          page={2}
          head={head}
          rows={rows}
        />,
      );
      const bodyRows = wrapper.find('tbody tr');
      expect(bodyRows.length).toBe(1);
      expect(
        bodyRows
          .at(0)
          .find('td')
          .at(0)
          .text(),
      ).toBe('Hillary');
      expect(
        bodyRows
          .at(0)
          .find('td')
          .at(1)
          .text(),
      ).toBe('Clinton');
    });

    it('should display sorted data', () => {
      const headCells = head.cells.map(cell => ({
        ...cell,
        isSortable: true,
      }));
      const wrapper = mount(
        <DynamicTableStateless
          defaultSortKey="last_name"
          defaultSortOrder="DESC"
          head={{ cells: headCells }}
          rows={rows}
        />,
      );
      const bodyRows = wrapper.find('tbody tr');
      expect(
        bodyRows
          .at(0)
          .find('td')
          .at(0)
          .text(),
      ).toBe('Barak');
      expect(
        bodyRows
          .at(0)
          .find('td')
          .at(1)
          .text(),
      ).toBe('Obama');
      expect(
        bodyRows
          .at(1)
          .find('td')
          .at(0)
          .text(),
      ).toBe('Donald');
      expect(
        bodyRows
          .at(1)
          .find('td')
          .at(1)
          .text(),
      ).toBe('Trump');
      expect(
        bodyRows
          .at(2)
          .find('td')
          .at(0)
          .text(),
      ).toBe('Hillary');
      expect(
        bodyRows
          .at(2)
          .find('td')
          .at(1)
          .text(),
      ).toBe('Clinton');
    });

    it('should pass down extra props', () => {
      const theadOnClick = () => {};
      const thOnClick = () => {};
      const trOnClick = () => {};
      const tdOnClick = () => {};

      const newHead = {
        onClick: theadOnClick,
        cells: head.cells.map(cell => ({
          ...cell,
          onClick: thOnClick,
        })),
      };
      const newRows = rows.map(row => ({
        ...row,
        onClick: trOnClick,
        cells: row.cells.map(cell => ({
          ...cell,
          onClick: tdOnClick,
        })),
      }));

      const wrapper = mount(
        <DynamicTableStateless head={newHead} rows={newRows} />,
      );
      expect(wrapper.find('thead').prop('onClick')).toBe(theadOnClick);
      wrapper.find('th').forEach(headCell => {
        expect(headCell.prop('onClick')).toBe(thOnClick);
      });
      wrapper.find('tbody tr').forEach(bodyRow => {
        expect(bodyRow.prop('onClick')).toBe(trOnClick);
      });
      wrapper.find('td').forEach(bodyCell => {
        expect(bodyCell.prop('onClick')).toBe(tdOnClick);
      });
    });

    describe('loading mode', () => {
      describe('with rows', () => {
        let wrapper;

        beforeEach(() => {
          wrapper = mount(<DynamicTableStateless rows={rows} isLoading />);
        });

        it('should render a loading container with a large spinner when there is more than 2 rows', () => {
          const loadingContainer = wrapper.find(LoadingContainerAdvanced);
          expect(loadingContainer.props().spinnerSize).toBe('large');

          wrapper.setProps({ rows: rows.slice(-3) });
          expect(loadingContainer.props().spinnerSize).toBe('large');

          wrapper.setProps({ rows: rows.slice(-2) });
          expect(loadingContainer.props().spinnerSize).toBe('small');
        });

        it('should render a loading container with a proper loading flag', () => {
          const loadingContainer = wrapper.find(LoadingContainerAdvanced);
          expect(loadingContainer.props().isLoading).toBe(true);
        });

        it('should override the spinner size on demand', () => {
          const withOverriddenSpinnerSize = mount(
            <DynamicTableStateless
              rows={rows}
              loadingSpinnerSize="small"
              isLoading
            />,
          );
          const loadingContainer = withOverriddenSpinnerSize.find(
            LoadingContainerAdvanced,
          );
          expect(loadingContainer.props().spinnerSize).toBe('small');
        });

        it('should pass a proper target ref', () => {
          const loadingContainer = wrapper.find(LoadingContainerAdvanced);
          const body = wrapper.find(Body);
          const target = loadingContainer.props().targetRef();
          expect(target).toBe(body.node);
        });

        it('should not render a loading container for the empty view', () => {
          const loadingContainer = wrapper.find(LoadingContainer);
          expect(loadingContainer.length).toBe(0);
        });
      });

      describe('without rows (empty)', () => {
        let wrapper;

        beforeEach(() => {
          wrapper = mount(
            <DynamicTableStateless emptyView={<div>No rows</div>} isLoading />,
          );
        });

        it('should render a blank view of a fixed height when the empty view is defined', () => {
          const blankView = wrapper.find(EmptyViewWithFixedHeight);
          expect(blankView.length).toBe(1);
        });

        it('should render a blank view of a fixed height when the empty view is not defined', () => {
          const withoutEmptyView = mount(<DynamicTableStateless isLoading />);
          const blankView = withoutEmptyView.find(EmptyViewWithFixedHeight);
          expect(blankView.length).toBe(1);
        });

        it('should render a loading container with proper props', () => {
          const loadingContainer = wrapper.find(LoadingContainer);
          expect(loadingContainer.props().isLoading).toBe(true);
          expect(loadingContainer.props().spinnerSize).toBe('large');
        });

        it("should keep the loading mode of the table's loading container disabled", () => {
          const loadingContainer = wrapper.find(LoadingContainerAdvanced);
          expect(loadingContainer.props().isLoading).toBe(false);
        });
      });
    });

    describe('should invoke callbacks', () => {
      let onSetPage;
      let onSort;
      let wrapper;

      beforeEach(() => {
        onSetPage = jest.fn();
        onSort = jest.fn();
        wrapper = mount(
          <DynamicTableStateless
            rowsPerPage={2}
            page={2}
            head={head}
            rows={rows}
            onSetPage={onSetPage}
            onSort={onSort}
          />,
        );
      });

      it('onSort & onSetPage', () => {
        const headCells = wrapper.find('th');
        headCells.at(0).simulate('click');
        expect(onSort).toHaveBeenCalledTimes(1);
        headCells.at(1).simulate('click');
        expect(onSort).toHaveBeenCalledTimes(1);
        expect(onSort).toHaveBeenCalledWith({
          key: 'first_name',
          sortOrder: 'ASC',
          item: {
            key: 'first_name',
            content: 'First name',
            isSortable: true,
          },
        });
        expect(onSetPage).toHaveBeenCalledWith(1);
        expect(onSetPage).toHaveBeenCalledTimes(1);
      });

      // TODO: @thejameskyle - Fails unexpectedly, fix test after sinon is removed from codebase.
      it.skip('onSetPage', () => {
        // eslint-disable-line jest/no-disabled-tests
        wrapper
          .find(PaginationStateless)
          .find('button')
          .at(1)
          .simulate('click');
        expect(onSetPage).toHaveBeenCalledTimes(1);
        expect(onSetPage).toHaveBeenCalledWith(1);
      });
    });
  });

  describe('stateful', () => {
    it('should display paginated data after navigating to a different page', () => {
      const wrapper = mount(
        <DynamicTable
          rowsPerPage={2}
          defaultPage={2}
          head={head}
          rows={rows}
        />,
      );

      wrapper
        .find(PaginationStateless)
        .find('button')
        .at(0)
        .simulate('click');

      const bodyRows = wrapper.find('tbody tr');
      expect(bodyRows.length).toBe(2);
      expect(
        bodyRows
          .at(0)
          .find('td')
          .at(0)
          .text(),
      ).toBe('Barak');
      expect(
        bodyRows
          .at(0)
          .find('td')
          .at(1)
          .text(),
      ).toBe('Obama');
      expect(
        bodyRows
          .at(1)
          .find('td')
          .at(0)
          .text(),
      ).toBe('Donald');
      expect(
        bodyRows
          .at(1)
          .find('td')
          .at(1)
          .text(),
      ).toBe('Trump');
    });

    it('should sort data', () => {
      const wrapper = mount(<DynamicTable head={head} rows={rows} />);
      wrapper
        .find('th')
        .at(0)
        .simulate('click');
      wrapper.update();
      const bodyRows = wrapper.find('tbody tr');
      expect(
        bodyRows
          .at(0)
          .find('td')
          .at(0)
          .text(),
      ).toBe('Barak');
      expect(
        bodyRows
          .at(0)
          .find('td')
          .at(1)
          .text(),
      ).toBe('Obama');
      expect(
        bodyRows
          .at(1)
          .find('td')
          .at(0)
          .text(),
      ).toBe('Donald');
      expect(
        bodyRows
          .at(1)
          .find('td')
          .at(1)
          .text(),
      ).toBe('Trump');
      expect(
        bodyRows
          .at(2)
          .find('td')
          .at(0)
          .text(),
      ).toBe('Hillary');
      expect(
        bodyRows
          .at(2)
          .find('td')
          .at(1)
          .text(),
      ).toBe('Clinton');
    });
  });
});
