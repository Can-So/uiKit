import * as React from 'react';
import { mount } from 'enzyme';
import { ReactUnsupportedBlockNode } from '../../src/nodeviews';

describe('unsupportedBlock - React component', () => {
  it('should return a node of type div', () => {
    const wrapper = mount(<ReactUnsupportedBlockNode />);
    expect(wrapper.getDOMNode().tagName).toEqual('DIV');
    wrapper.unmount();
  });

  it('should have text content as string "Unsupported content"', () => {
    const wrapper = mount(<ReactUnsupportedBlockNode />);
    expect(wrapper.text()).toEqual('Unsupported content');
    wrapper.unmount();
  });
});
