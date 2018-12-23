import * as React from 'react';
import ColorPalette from '../../../../components/internal/color-palette';
import Color from '../../../../components/internal/color';
import { shallowWithIntl } from 'enzyme-react-intl';

describe('ColorPalette', () => {
  it('should render 6 colors', () => {
    const onClick = jest.fn();
    const onHover = jest.fn();
    const component = shallowWithIntl(
      <ColorPalette
        onClick={onClick}
        onHover={onHover}
        selectedColor={'red'}
      />,
    ).dive();

    const colorComponent = component.find(Color);
    expect(colorComponent.length).toBe(6);
    expect(colorComponent.first().props().onClick).toBe(onClick);
    expect(colorComponent.first().props().onHover).toBe(onHover);
  });

  it('should select selected color', () => {
    const component = shallowWithIntl(
      <ColorPalette onClick={jest.fn()} selectedColor={'red'} />,
    ).dive();

    expect(
      component.findWhere(n => n.is(Color) && n.prop('isSelected')).length,
    ).toBe(1);
  });

  it('should not select if no selected color', () => {
    const component = shallowWithIntl(<ColorPalette onClick={jest.fn()} />);

    expect(
      component.findWhere(n => n.is(Color) && n.prop('isSelected')).length,
    ).toBe(0);
  });
});
