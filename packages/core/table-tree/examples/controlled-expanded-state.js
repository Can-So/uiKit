// @flow
import React, { PureComponent } from 'react';
import TableTree, { Headers, Header, Rows, Row, Cell } from '../src';
import staticData from './data-cleancode-toc.json';

type State = {
  expansionMap: { [key: number]: boolean },
};

export default class extends PureComponent<{}, State> {
  state = {
    expansionMap: {},
  };

  render() {
    const { expansionMap } = this.state;

    return (
      <div>
        <TableTree>
          <Headers>
            <Header width={200}>Chapter title</Header>
            <Header width={100}>Numbering</Header>
            <Header width={100}>Page</Header>
          </Headers>
          <Rows
            items={staticData.children}
            render={({ title, numbering, page, children }) => (
              <Row
                itemId={numbering}
                items={children}
                hasChildren={children.length > 0}
                isExpanded={Boolean(expansionMap[numbering])}
                onExpand={() =>
                  this.setState({
                    expansionMap: {
                      ...expansionMap,
                      [numbering]: true,
                    },
                  })
                }
                onCollapse={() =>
                  this.setState({
                    expansionMap: {
                      ...expansionMap,
                      [numbering]: false,
                    },
                  })
                }
              >
                <Cell singleLine>{title}</Cell>
                <Cell>{numbering}</Cell>
                <Cell>{page}</Cell>
              </Row>
            )}
          />
        </TableTree>
      </div>
    );
  }
}
