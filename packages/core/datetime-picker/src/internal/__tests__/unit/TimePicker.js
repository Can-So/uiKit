// @flow

import React from 'react';
import { mount } from 'enzyme';

import { TimePickerWithoutAnalytics as TimePicker } from '../../../components/TimePicker';

test('TimePicker, custom parseInputValue', () => {
  const parseInputValue = () => new Date('1970-01-02 01:15:00');
  const onChangeSpy = jest.fn();
  const expectedResult = '01:15am';
  const timePickerWrapper = mount(
    <TimePicker
      timeIsEditable
      onChange={onChangeSpy}
      parseInputValue={parseInputValue}
    />,
  );

  timePickerWrapper.instance().onCreateOption('asdf');

  expect(onChangeSpy).toBeCalledWith(expectedResult);
});

test('TimePicker, custom formatDisplayLabel', () => {
  const timeValue = '12:00';
  const expectedResult = 'midday';
  const formatDisplayLabel = time => (time === '12:00' ? 'midday' : time);
  const timePickerWrapper = mount(
    <TimePicker formatDisplayLabel={formatDisplayLabel} value={timeValue} />,
  );
  const label = timePickerWrapper.text();

  expect(label).toEqual(expectedResult);
});

test('TimePicker default parseInputValue', () => {
  const onChangeSpy = jest.fn();
  const expectedResult = '01:30am';
  const timePickerWrapper = mount(
    <TimePicker timeIsEditable onChange={onChangeSpy} />,
  );

  timePickerWrapper.instance().onCreateOption('01:30');

  expect(onChangeSpy).toBeCalledWith(expectedResult);
});
