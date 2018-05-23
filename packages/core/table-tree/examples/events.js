// @flow
import React, { PureComponent } from 'react';
import TableTree, { Headers, Header, Rows, Row, Cell } from '../src';
import staticData from './data-cleancode-toc.json';

type State = {
  lastEvent: string,
};

export default class extends PureComponent<{}, State> {
  state = {
    lastEvent: '',
  };

  triggerEvent(name: string) {
    this.setState({
      lastEvent: name,
    });
  }

  render() {
    const { lastEvent } = this.state;
    return (
      <div>
        <TableTree>
          <Headers>
            <Header
              width={200}
              onClick={() => this.triggerEvent('Header Clicked (chapter)')}
            >
              Chapter title
            </Header>
            <Header
              width={100}
              onClick={() => this.triggerEvent('Header Clicked (numbering)')}
            >
              Numbering
            </Header>
            <Header
              width={100}
              onClick={() => this.triggerEvent('Header Clicked (page)')}
            >
              Page
            </Header>
          </Headers>
          <Rows
            items={staticData.children}
            render={({ title, numbering, page, children }) => (
              <Row
                itemId={numbering}
                items={children}
                hasChildren={children.length > 0}
                onExpand={rowData =>
                  this.triggerEvent(`Node Expanded (${rowData.title})`)
                }
                onCollapse={rowData =>
                  this.triggerEvent(`Node Collapsed (${rowData.title})`)
                }
              >
                <Cell singleLine>{title}</Cell>
                <Cell>{numbering}</Cell>
                <Cell>{page}</Cell>
              </Row>
            )}
          />
        </TableTree>
        <p>
          {lastEvent ? (
            <span>
              <strong>Last event: </strong> {lastEvent}
            </span>
          ) : (
            <i>Click around to see events</i>
          )}
        </p>
      </div>
    );
  }
}
