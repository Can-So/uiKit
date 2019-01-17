// @flow
import React from 'react';
import { mount } from 'enzyme';
import GlobalNavigationSkeleton from '../../index';
import BaseGlobalNavigationSkeleton from '../../GlobalNavigationSkeleton';

describe('GlobalNavigationSkeleton with theming', () => {
  it('should render a ThemeProvider with a GlobalNavigationSkeleton', () => {
    const wrapper = mount(<GlobalNavigationSkeleton />);
    const themeProviderWrapper = wrapper.find('ThemeProvider');
    expect(themeProviderWrapper.props()).toHaveProperty('theme');
    expect(
      themeProviderWrapper.find(BaseGlobalNavigationSkeleton),
    ).toHaveLength(1);
  });
});
