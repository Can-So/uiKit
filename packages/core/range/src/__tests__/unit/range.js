/* eslint-disable no-undef, import/no-extraneous-dependencies */
// @flow
import React from 'react';
import { mount } from 'enzyme';
import Range from '../..';

describe('Range', () => {
  describe('with default props', () => {
    let range;

    beforeEach(() => {
      range = mount(<Range value={20.12} />);
    });

    it('should have input with type "range"', () => {
      const input = range.find('input');
      expect(input.props().type).toBe('range');
    });

    it('should have percent value on styled component', () => {
      const input = range.find('InputRange');
      expect(input.props().valuePercent).toBe('20.12');
    });

    it('should have min, max, step and valuePercent set to default values', () => {
      const input = range.find('input');
      expect(input.props().min).toBe(0);
      expect(input.props().max).toBe(100);
      expect(input.props().step).toBe(0.1);
    });

    it('should input with defined value', () => {
      const input = range.find('input');
      expect(input.props().value).toBe('20.12');
    });

    it('should not be disabled by default', () => {
      range.setProps({ isDisabled: false });
      const input = range.find('input');
      expect(input.props().disabled).toBe(false);
    });
  });

  describe('with defined props', () => {
    let range;
    let onChangeSpy;

    beforeEach(() => {
      onChangeSpy = jest.fn();
      range = mount(
        <Range value={25} min={10} max={20} onChange={onChangeSpy} />,
      );
    });

    it('should have defined min and max values', () => {
      const input = range.find('input');
      expect(input.props().min).toBe(10);
      expect(input.props().max).toBe(20);
    });

    it('should call spy when value is changed', () => {
      range.find('input').simulate('change');
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should change input value when prop is changed', () => {
      range.setProps({ value: 15 });
      const input = range.find('input');
      expect(input.props().value).toBe('15');
    });

    it('should be disabled if isDisabled prop is truthy', () => {
      range.setProps({ isDisabled: true });
      const input = range.find('input');
      expect(input.props().disabled).toBe(true);
    });

    it('should not be disabled if isDisabled prop is falsy', () => {
      range.setProps({ isDisabled: false });
      const input = range.find('input');
      expect(input.props().disabled).toBe(false);
    });
  });
  describe('range value percentage', () => {
    let range;
    it('should calculate the correct value percent for non 0 min and max != 100', () => {
      range = mount(<Range value={50} min={30} max={80} />);
      const input = range.find('InputRange');
      expect(input.props().valuePercent).toBe('40.00');
    });
    it('should calculate the correct value percent for 0 min and max != 100', () => {
      range = mount(<Range value={50} min={0} max={80} />);
      const input = range.find('InputRange');
      expect(input.props().valuePercent).toBe('62.50');
    });
    it('should calculate the correct value as 0 if min > max', () => {
      range = mount(<Range value={50} min={150} max={100} />);
      const input = range.find('InputRange');
      expect(input.props().valuePercent).toBe('0');
    });
    it('should calculate the correct value for negative range', () => {
      range = mount(<Range value={0} min={-50} max={50} />);
      const input = range.find('InputRange');
      expect(input.props().valuePercent).toBe('50.00');
    });
    it('should update the value when props change', () => {
      range = mount(<Range value={50} min={0} max={100} />);
      expect(range.find('InputRange').prop('valuePercent')).toBe('50.00');
      range.setProps({ value: 25 });
      expect(range.find('InputRange').prop('valuePercent')).toBe('25.00');
    });
  });
});
