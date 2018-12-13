// @flow
import React from 'react';
import { mount } from 'enzyme';
import GlobalNavigationSkeleton from '../../index';

describe('GlobalNavigationSkeleton', () => {
  it('should add the skeleton items based on the defaults', () => {
    const wrapper = mount(<GlobalNavigationSkeleton />);
    expect(wrapper.find('GlobalNavigationSkeletonItem')).toHaveLength(8);
  });
});
