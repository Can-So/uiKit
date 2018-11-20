// @flow
import React from 'react';
import { mount, shallow } from 'enzyme';

import ContentNavigation from '../../index';
import { transitionDurationMs } from '../../../../../common/constants';

const defaultProps = {
  isVisible: false,
  product: () => null,
};

describe('ContentNavigation', () => {
  it('should not trigger animations on first-page load', () => {
    const wrapper = shallow(<ContentNavigation {...defaultProps} />);

    expect(wrapper.find('Transition').props().timeout).toBe(0);

    wrapper.setProps({});

    expect(wrapper.find('Transition').props().timeout).toBe(
      transitionDurationMs,
    );
  });

  it('should continue rendering the container view while the container layer animates out', async () => {
    const Container = () => null;
    const wrapper = mount(<ContentNavigation {...defaultProps} isVisible />);

    expect(wrapper.find(Container)).toHaveLength(0);
    wrapper.setProps({ container: Container });
    expect(wrapper.find(Container)).toHaveLength(1);
    wrapper.setProps({ container: undefined });
    // Should continue rendering the Container even though we've unset the prop
    expect(wrapper.find(Container)).toHaveLength(1);
  });
});
