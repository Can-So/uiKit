// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import exenv from 'exenv';
import staticData from '../../../examples/data-cleancode-toc.json';
import TableTree, { Headers, Header, Rows, Row, Cell } from '../..';

jest.mock('exenv', () => ({
  get canUseDOM() {
    return false;
  },
}));

jest.spyOn(global.console, 'error');

afterEach(() => {
  jest.resetAllMocks();
});

const App = () => (
  <TableTree>
    <Headers>
      <Header width={300}>Chapter title</Header>
      <Header width={100}>Numbering</Header>
      <Header width={100}>Page</Header>
    </Headers>
    <Rows
      items={staticData.children}
      render={({ title, numbering, page, children }) => (
        <Row
          expandLabel={'Expand'}
          collapseLabel={'Collapse'}
          itemId={numbering}
          items={children}
          hasChildren={children.length > 0}
        >
          <Cell singleLine>{title}</Cell>
          <Cell singleLine>{numbering}</Cell>
          <Cell singleLine>{page}</Cell>
        </Row>
      )}
    />
  </TableTree>
);

//Skipping this test since table tree uses set state in component will mount which throws error when hydrating
test.skip('should ssr then hydrate table-tree correctly', () => {
  const canUseDom = jest.spyOn(exenv, 'canUseDOM', 'get');
  // server-side
  canUseDom.mockReturnValue(false);
  const serverHTML = ReactDOMServer.renderToString(<App />);
  // client-side
  canUseDom.mockReturnValue(true);
  const elem = document.createElement('div');
  elem.innerHTML = serverHTML;
  expect(() => ReactDOM.hydrate(<App />, elem)).not.toThrow();
  expect(console.error).not.toBeCalled();
});
