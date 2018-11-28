import * as React from 'react';
import { shallow } from 'enzyme';

import { ColorPickerWithoutAnalytics as ColorPicker } from '../..';

describe('ColorPicker', () => {
  test('should popperProps to PopupSelect', () => {
    const mockFn = jest.fn();
    const value = { value: 'blue', label: 'Blue' };
    const popperProps = { placement: 'bottom' };
    const wrapper = shallow(
      <ColorPicker
        palette={[value]}
        popperProps={popperProps}
        onChange={mockFn}
      />,
    );

    const select = wrapper.find('PopupSelect');

    expect(select.prop('popperProps')).toEqual(popperProps);
  });
});
