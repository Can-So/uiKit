// @flow

import React from 'react';
import { shallow } from 'enzyme';

import { DateTimePickerWithoutAnalytics as DateTimePicker } from '../../../components/DateTimePicker';
import DatePicker from '../../../components/DatePicker';
import TimePicker from '../../../components/TimePicker';

test('custom parseValue is used when accessing state', () => {
  const onChange = jest.fn();
  const customParseValue = jest.fn().mockImplementation(() => ({
    dateValue: '2018/05/02',
    timeValue: '08:30',
    zoneValue: '+0800',
  }));

  const dateTimePickerWrapper = shallow(
    <DateTimePicker parseValue={customParseValue} onChange={onChange} />,
  );

  dateTimePickerWrapper.find(DatePicker).simulate('change', '2018/05/02');

  expect(onChange).toHaveBeenCalledWith('2018/05/02T08:30+0800');
  expect(onChange).toHaveBeenCalledTimes(1);
});

test('default parseValue, does not parse the date time value into the specified timezone', () => {
  const dateTimePickerWrapper = shallow(
    <DateTimePicker
      id="datetimepicker-1"
      value={'2018-05-02T08:00:00.000+0800'}
    />,
  );

  dateTimePickerWrapper.find(DatePicker).simulate('change', '2018-05-02');

  expect(dateTimePickerWrapper.state().zoneValue).not.toEqual('+0800');
});

test('onChange will only be fired when a valid date is supplied', () => {
  const onChange = jest.fn();
  const dateTimePickerWrapper = shallow(<DateTimePicker onChange={onChange} />);

  dateTimePickerWrapper.find(DatePicker).simulate('change', '2018/05/02');

  expect(onChange).not.toHaveBeenCalled();

  dateTimePickerWrapper.find(TimePicker).simulate('change', '10:45');

  expect(onChange).toHaveBeenCalledWith('2018/05/02T10:45');
  expect(onChange).toHaveBeenCalledTimes(1);
});

test('fires onFocus prop when datepicker is focused', () => {
  const onFocus = jest.fn();
  const dateTimePickerWrapper = shallow(<DateTimePicker onFocus={onFocus} />);

  dateTimePickerWrapper.find(DatePicker).simulate('focus');

  expect(onFocus).toHaveBeenCalled();
});

test('fires onBlur prop when datepicker is blurred', () => {
  const onBlur = jest.fn();
  const dateTimePickerWrapper = shallow(<DateTimePicker onBlur={onBlur} />);

  dateTimePickerWrapper.find(DatePicker).simulate('blur');

  expect(onBlur).toHaveBeenCalled();
});

test('fires onFocus prop when timepicker is focused', () => {
  const onFocus = jest.fn();
  const dateTimePickerWrapper = shallow(<DateTimePicker onFocus={onFocus} />);

  dateTimePickerWrapper.find(TimePicker).simulate('focus');

  expect(onFocus).toHaveBeenCalled();
});

test('fires onBlur prop when timepicker is blurred', () => {
  const onBlur = jest.fn();
  const dateTimePickerWrapper = shallow(<DateTimePicker onBlur={onBlur} />);

  dateTimePickerWrapper.find(TimePicker).simulate('blur');

  expect(onBlur).toHaveBeenCalled();
});
