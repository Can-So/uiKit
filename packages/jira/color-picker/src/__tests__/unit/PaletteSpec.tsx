import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ColorPalette, ColorPaletteProps } from '../..';
import ColorCard from '../../components/ColorCard';

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
  ];
  const defaultProps: ColorPaletteProps = {
    palette,
  };

  const shallowPalette = (
    props: Partial<ColorPaletteProps> = {},
  ): ShallowWrapper<ColorPalette> =>
    shallow(<ColorPalette {...defaultProps} {...props} />);

  test('selected color', () => {
    const onClick = jest.fn();
    const selectedColor = 'blue';
    const wrapper = shallowPalette({
      selectedColor: 'blue',
      onClick,
    });

    const colors = wrapper.find(ColorCard);

    expect(colors).toHaveLength(palette.length);
    colors.forEach((color, index) => {
      expect(color.props()).toEqual(
        expect.objectContaining({
          ...palette[index],
          selected: palette[index].value === selectedColor,
          focused: undefined,
          onClick,
        }),
      );
    });
  });

  test('focused item', () => {
    const onClick = jest.fn();
    const focusedItemIndex = 1;
    const wrapper = shallowPalette({
      focusedItemIndex,
      onClick,
    });

    const colors = wrapper.find(ColorCard);

    expect(colors).toHaveLength(palette.length);
    colors.forEach((color, index) => {
      expect(color.props()).toEqual(
        expect.objectContaining({
          ...palette[index],
          focused: focusedItemIndex === index,
        }),
      );
    });
  });
});
