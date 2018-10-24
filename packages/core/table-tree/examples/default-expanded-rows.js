// @flow
import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import TableTree, { Headers, Header, Rows, Row, Cell } from '../src';
import staticData from './data-cleancode-toc.json';

type State = {
  isExpanded: boolean,
};

export default class extends PureComponent<{}, State> {
  state = {
    isExpanded: true,
  };

  onExpandToggle = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };

  render() {
    const { isExpanded } = this.state;

    return (
      <div>
        <Button onClick={this.onExpandToggle}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
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
                isDefaultExpanded={isExpanded}
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
