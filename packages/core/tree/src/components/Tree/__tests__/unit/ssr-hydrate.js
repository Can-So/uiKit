// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import exenv from 'exenv';

import { complexTree } from '../../../../../mockdata/complexTree';
import Tree from '../..';
import { type RenderItemParams } from '../../../TreeItem/TreeItem-types';

jest.mock('exenv', () => ({
  get canUseDOM() {
    return false;
  },
}));

jest.spyOn(global.console, 'error');

afterEach(() => {
  jest.resetAllMocks();
});

const renderItem = ({ provided }: RenderItemParams) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    Draggable
  </div>
);

const App = () => (
  <Tree
    tree={complexTree}
    renderItem={renderItem}
    isDragEnabled
    isNestingEnabled
  />
);

// unskip as part of https://ecosystem.atlassian.net/browse/AK-5809
test.skip('should ssr then hydrate tag correctly', () => {
  const canUseDom = jest.spyOn(exenv, 'canUseDOM', 'get');

  // server-side
  canUseDom.mockReturnValue(false);
  const serverHTML = ReactDOMServer.renderToString(<App />);

  // client-side
  canUseDom.mockReturnValue(true);
  const elem = document.createElement('div');
  elem.innerHTML = serverHTML;

  ReactDOM.hydrate(<App />, elem);

  expect(console.error).not.toBeCalled();
});
