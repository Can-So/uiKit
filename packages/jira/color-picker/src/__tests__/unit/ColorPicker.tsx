import * as React from 'react';
import { shallow } from 'enzyme';

import { ColorPickerWithoutAnalytics as ColorPicker } from '../..';

describe('ColorPicker', () => {
  test('should pass default popperProps to PopupSelect', () => {
    const mockFn = jest.fn();
    const value = { value: 'blue', label: 'Blue' };
    const wrapper = shallow(
      <ColorPicker palette={[value]} onChange={mockFn} />,
    );

    const select = wrapper.find('PopupSelect');

    expect(select.prop('popperProps')).toEqual({
      positionFixed: true,
      modifiers: { offset: { offset: `0, 8` } },
      placement: 'bottom-start',
    });
  });

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
