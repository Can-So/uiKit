import * as React from 'react';
import { shallow } from 'enzyme';
import DateComponent from '../../../../react/nodes/date';

import { timestampToString } from '@atlaskit/editor-common';

describe('Renderer - React/Nodes/Date', () => {
  const timestamp = new Date().getTime();
  const date = shallow(<DateComponent timestamp={timestamp.toString()} />);

  it('should render a <span>-tag', () => {
    expect(date.is('span')).toEqual(true);
  });

  it('should render formatted date', () => {
    expect(date.text()).toEqual(timestampToString(timestamp));
  });

  it('should render date formatted as today inside task task', () => {
    const date = shallow(
      <DateComponent
        timestamp={timestamp.toString()}
        parentIsIncompleteTask={true}
      />,
    );
    expect(date.text()).toEqual('Today');
  });
});
