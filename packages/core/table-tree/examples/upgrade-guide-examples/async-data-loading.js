// @flow

import React, { Component } from 'react';
import TableTree, {
  Headers,
  Header,
  Rows,
  Row,
  Cell,
  TableTreeDataHelper,
} from '../../src';

type State = {
  items: Array<Object>,
};

const tableTreeDataHelper = new TableTreeDataHelper({ key: 'title' });

class WithStaticData extends Component<{}, State> {
  state = {
    items: [],
  };

  componentDidMount() {
    this.loadChildFor();
  }

  loadChildFor = (parentItem: ?Object) => {
    getChildren(parentItem).then(item => {
      this.setState({
        items: tableTreeDataHelper.updateItems(
          item,
          this.state.items,
          parentItem,
        ),
      });
    });
  };

  render() {
    const { items } = this.state;
    return (
      <TableTree>
        <Headers>
          <Header width={300}>Chapter title</Header>
          <Header width={100}>Numbering</Header>
          <Header width={100}>Page</Header>
        </Headers>
        <Rows
          items={items}
          render={({ title, numbering, page, hasChildren, children }) => (
            <Row
              onExpand={this.loadChildFor}
              expandLabel={'Expand'}
              collapseLabel={'Collapse'}
              itemId={numbering}
              items={children}
              hasChildren={hasChildren}
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

const getChildren = (parentItem: ?Object) => {
  if (!parentItem) {
    return Promise.resolve([
      {
        id: 'title One',
        title: 'title One',
        numbering: '1',
        page: '1',
        hasChildren: true,
      },
    ]);
  }
  return Promise.resolve([
    {
      id: `${parentItem.id}: child`,
      title: `${parentItem.title}: child`,
      numbering: `${parentItem.numbering}.1`,
      page: '1',
      hasChildren: true,
    },
  ]);
};

export default () => <WithStaticData />;
