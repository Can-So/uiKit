import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
  ColorPickerWithoutAnalytics as ColorPicker,
  ColorPickerProps,
  ColorPickerState,
} from '..';
import { PopupSelect } from '@atlaskit/select';

interface SelectProps {
  onKeyDown: (event: Object) => void;
}

describe('ColorPalette', () => {
  const palette = [
    {
      value: 'red',
      label: 'Red',
    },
    {
      value: 'blue',
      label: 'Blue',
    },
    {
      value: 'white',
      label: 'White',
    },
    {
      value: 'green',
      label: 'Green',
    },
    {
      value: 'yellow',
      label: 'Yellow',
    },
    {
      value: 'orange',
      label: 'Organge',
    },
  ];
  const defaultProps: ColorPickerProps = {
    palette,
    cols: 3,
    onChange: jest.fn(),
  };

  const shallowColorPicker = (
    props: Partial<ColorPickerProps> = {},
  ): ShallowWrapper<typeof ColorPicker> =>
    shallow(<ColorPicker {...defaultProps} {...props} />);

  const keyEvent = (key: string) => ({
    key,
    preventDefault: jest.fn(),
  });

  describe('keyboard handling', () => {
    test('left and right navigation', () => {
      const onChange = jest.fn();
      const wrapper = shallowColorPicker({ onChange });
      const select = wrapper.find(PopupSelect);

      const props = select.props() as SelectProps;

      props.onKeyDown(keyEvent('ArrowLeft'));
      wrapper.update();
      expect((wrapper.state() as ColorPickerState).focusedItemIndex).toBe(
        palette.length - 1,
      );

      props.onKeyDown(keyEvent('ArrowRight'));
      wrapper.update();
      expect((wrapper.state() as ColorPickerState).focusedItemIndex).toBe(0);
    });

    test('up and down navigation', () => {
      const onChange = jest.fn();
      const wrapper = shallowColorPicker({ onChange });
      const select = wrapper.find(PopupSelect);

      const props = select.props() as SelectProps;

      props.onKeyDown(keyEvent('ArrowUp'));
      wrapper.update();
      expect((wrapper.state() as ColorPickerState).focusedItemIndex).toBe(3);

      props.onKeyDown(keyEvent('ArrowDown'));
      wrapper.update();
      expect((wrapper.state() as ColorPickerState).focusedItemIndex).toBe(0);
    });

    test('select options on Tab and Enter', () => {
      const onChange = jest.fn();
      const wrapper = shallowColorPicker({ onChange });
      const select = wrapper.find(PopupSelect);
      const focusedItemIndex = 2;
      wrapper.setState({ focusedItemIndex });
      wrapper.update();

      const props = select.props() as SelectProps;

      props.onKeyDown(keyEvent('Enter'));
      wrapper.update();
      expect(onChange).toBeCalledWith(palette[focusedItemIndex].value);
      onChange.mockClear();

      props.onKeyDown(keyEvent('Tab'));
      wrapper.update();
      expect(onChange).toBeCalledWith(palette[focusedItemIndex].value);
    });
  });
});
