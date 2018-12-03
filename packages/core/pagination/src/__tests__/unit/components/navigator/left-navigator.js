//@flow
import React from 'react';
import { mount } from 'enzyme';
import Button from '@atlaskit/button';
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large';

import { name } from '../../../../../package.json';
import LeftNavigator from '../../../../components/navigators/left-navigator';

describe(`${name} - LeftNavigator`, () => {
  it('default props', () => {
    const wrapper = mount(<LeftNavigator />);
    expect(wrapper.find(Button).prop('ariaLabel')).toBe('previous');
    expect(wrapper.find(Button).prop('isDisabled')).toBe(false);
    /** renders left chevron */
    expect(wrapper.find(ChevronLeftLargeIcon).length).toBe(1);
  });
  it('should passes down ariaLabel as ariaLabel to button', () => {
    const wrapper = mount(<LeftNavigator ariaLabel="label" />);
    expect(wrapper.find(Button).prop('ariaLabel')).toBe('label');
  });
  it('should passes down isDisabled prop to button', () => {
    const wrapper = mount(<LeftNavigator isDisabled />);
    expect(wrapper.find(Button).prop('isDisabled')).toBe(true);
  });
  it('should passes down children prop to button', () => {
    const wrapper = mount(<LeftNavigator>$</LeftNavigator>);
    expect(wrapper.find(Button).prop('children')).toBe('$');
  });
});
