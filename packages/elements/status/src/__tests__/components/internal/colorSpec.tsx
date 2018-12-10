import * as React from 'react';
import { mount } from 'enzyme';
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import Color from '../../../components/internal/color';
import { ANALYTICS_HOVER_DELAY } from '../../../components/constants';

describe('Color', () => {
  it('should render color button', () => {
    const component = mount(
      <Color
        value={'red'}
        label={'Red'}
        onClick={jest.fn()}
        backgroundColor={'backgroundColor'}
        borderColor={'borderColor'}
      />,
    );

    expect(component.find('button').length).toBe(1);
  });

  it('should render done icon when selected', () => {
    const component = mount(
      <Color
        value={'red'}
        label={'Red'}
        onClick={jest.fn()}
        backgroundColor={'backgroundColor'}
        borderColor={'borderColor'}
        isSelected={true}
      />,
    );

    expect(component.find(EditorDoneIcon).length).toBe(1);
  });

  it('should not render done icon when not selected', () => {
    const component = mount(
      <Color
        value={'red'}
        label={'Red'}
        onClick={jest.fn()}
        backgroundColor={'backgroundColor'}
        borderColor={'borderColor'}
        isSelected={false}
      />,
    );

    expect(component.find(EditorDoneIcon).length).toBe(0);
  });

  it('should call onClick handler prop on click', () => {
    const onClick = jest.fn();
    const value = 'red';
    const component = mount(
      <Color
        value={value}
        label={'Red'}
        onClick={onClick}
        backgroundColor={'backgroundColor'}
        borderColor={'borderColor'}
        isSelected={false}
      />,
    );

    component.find('button').simulate('click');
    expect(onClick).toHaveBeenCalledWith(value);
  });

  describe('Color onHover', () => {
    let realDateNow;
    let dateNowStub;

    beforeEach(() => {
      realDateNow = Date.now;
      dateNowStub = jest.fn();
      Date.now = dateNowStub;
    });

    afterEach(() => {
      Date.now = realDateNow;
    });

    it('should call onHover handler', () => {
      const now = realDateNow();
      const onHover = jest.fn();
      const value = 'purple';
      const component = mount(
        <Color
          value={value}
          label={'Purple'}
          onClick={jest.fn()}
          onHover={onHover}
          backgroundColor={'backgroundColor'}
          borderColor={'borderColor'}
          isSelected={false}
        />,
      );

      dateNowStub.mockReturnValue(now);
      component.find('button').simulate('mouseenter');

      dateNowStub.mockReturnValue(now + ANALYTICS_HOVER_DELAY + 10);
      component.find('button').simulate('mouseleave');

      expect(onHover).toHaveBeenCalledWith(value);
    });
  });
});
