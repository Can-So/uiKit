// @flow
import React from 'react';
import { mount } from 'enzyme';
import GlobalNavigationSkeleton from '../../index';

describe('GlobalNavigationSkeleton with theming', () => {
  it('should have theme props provider via HoC', () => {
    const wrapper = mount(<GlobalNavigationSkeleton />);
    const globalNavigationSkeletonWithTheming = wrapper.find(
      'GlobalNavigationSkeleton',
    );
    expect(globalNavigationSkeletonWithTheming.props()).toHaveProperty('theme');
  });
});
