import * as React from 'react';
import { shallow } from 'enzyme';
import Hardbreak from '../../../../react/nodes/hardBreak';

describe('Renderer - React/Nodes/HardBreak', () => {
  const hardBreak = shallow(<Hardbreak />);

  it('should render a <br>-tag', () => {
    expect(hardBreak.is('br')).toEqual(true);
  });
});
