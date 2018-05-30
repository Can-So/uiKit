// @flow

import React, { Component } from 'react';
import TableTree, { Headers, Header, Rows, Row, Cell } from '../../src';

type Props = {
  tableData: Array<Object>,
};

class WithStaticData extends Component<Props> {
  render() {
    return (
      <TableTree>
        <Headers>
          <Header width={300}>Chapter title</Header>
          <Header width={100}>Numbering</Header>
          <Header width={100}>Page</Header>
        </Headers>
        <Rows
          items={this.props.tableData}
          render={({ title, numbering, page, children }) => (
            <Row
              expandLabel={'Expand'}
              collapseLabel={'Collapse'}
              itemId={numbering}
              items={children}
              hasChildren={children && children.length > 0}
            >
              <Cell singleLine>{title}</Cell>
              <Cell singleLine>{numbering}</Cell>
              <Cell singleLine>{page}</Cell>
            </Row>
          )}
        />
      </TableTree>
    );
  }
}

// Example structure
const tableData = [
  {
    title: 'title One',
    numbering: '1',
    page: '1',
    children: [
      {
        title: 'child one title',
        numbering: '1.1',
        page: '1',
      },
    ],
  },
];

export default () => <WithStaticData tableData={tableData} />;
