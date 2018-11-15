// @flow
import React from 'react';
import { mount } from 'enzyme';
import FieldText from '@atlaskit/field-text';
import { Checkbox } from '@atlaskit/checkbox';
import mapEvent from '../../utils/translateEvent';

test('map text input on change event to string', () => {
  const fn = jest.fn();
  const wrapper = mount(
    <input type="text" value="hello" onChange={mapEvent(fn)} />,
  );
  wrapper.find('input').simulate('change');
  expect(fn).toHaveBeenCalledWith('hello');
});

test('should map FieldText on change event to string', () => {
  const fn = jest.fn();
  const wrapper = mount(<FieldText value="hello" onChange={mapEvent(fn)} />);
  wrapper.find('input').simulate('change');
  expect(fn).toHaveBeenCalledWith('hello');
});

test('should map Checkbox checked event to value', () => {
  const fn = jest.fn();
  const wrapper = mount(
    <Checkbox isChecked={false} value="remember-me" onChange={mapEvent(fn)} />,
  );
  // might need this:
  // wrapper.find('input').simulate('change', { target: { checked: true } });
  wrapper.find('input').simulate('change');
  expect(fn).toHaveBeenCalledWith('remember-me');
});

test('should map Checkbox unchecked event to undefined', () => {
  const fn = jest.fn();
  const wrapper = mount(
    <Checkbox isChecked value="remember-me" onChange={mapEvent(fn)} />,
  );
  wrapper.find('input').simulate('change');
  expect(fn).toHaveBeenCalledWith(undefined);
});
