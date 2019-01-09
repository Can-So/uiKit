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

afterAll(() =>
  document
    .querySelectorAll('[role=treegrid]')
    .forEach(e => e.parentNode && e.parentNode.removeChild(e)),
);

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

test('should ssr then hydrate table-tree correctly', () => {
  const canUseDom = jest.spyOn(exenv, 'canUseDOM', 'get');
  // server-side
  canUseDom.mockReturnValue(false);
  const serverHTML = ReactDOMServer.renderToString(<App />);
  // client-side
  canUseDom.mockReturnValue(true);
  const elem = document.createElement('div');
  elem.innerHTML = serverHTML;
  ReactDOM.hydrate(<App />, elem);
  expect(elem.getElementsByTagName('h1')).toHaveLength(0);
  expect(elem.querySelectorAll('[role=treegrid]')).toHaveLength(1);
});
