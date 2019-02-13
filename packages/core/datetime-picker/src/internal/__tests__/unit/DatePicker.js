// @flow

import React from 'react';
import { shallow, mount } from 'enzyme';
import { parse, format } from 'date-fns';

import Select from '@atlaskit/select';
import { DatePickerWithoutAnalytics as DatePicker } from '../../../components/DatePicker';

test('DatePicker, custom formatDisplayLabel', () => {
  const dateValue = new Date('06/08/2018').toUTCString();
  const formatDisplayLabel = (date, dateFormat) => {
    const parsed = parse(date);
    return format(parsed, dateFormat);
  };
  const expectedResult = 'June/08';
  const datePickerWrapper = mount(
    <DatePicker
      formatDisplayLabel={formatDisplayLabel}
      dateFormat={'MMMM/DD'}
      value={dateValue}
    />,
  );
  const label = datePickerWrapper.text();
  expect(label).toEqual(expectedResult);
});

test('DatePicker, onCalendarChange if the iso date is greater than the last day of the month, focus the last day of the month instead', () => {
  const date = '2018-02-31';
  const fallbackDate = '2018-02-28';
  const datePickerWrapper = mount(<DatePicker />);
  datePickerWrapper.instance().onCalendarChange({ iso: date });
  datePickerWrapper.update();
  expect(datePickerWrapper.instance().state.view).toEqual(fallbackDate);
});

test('DatePicker, supplying a custom parseInputValue prop, produces the expected result', () => {
  const parseInputValue = (date, dateFormat) => new Date('01/01/1970'); //eslint-disable-line no-unused-vars
  const onChangeSpy = jest.fn();
  const expectedResult = '1970-01-01';
  const datePickerWrapper = mount(
    <DatePicker
      id="customDatePicker-ParseInputValue"
      onChange={onChangeSpy}
      parseInputValue={parseInputValue}
    />,
  );

  datePickerWrapper.instance().onSelectInput({ target: { value: 'asdf' } });
  datePickerWrapper.first('input').simulate('keyDown', { key: 'Enter' });

  expect(onChangeSpy).toBeCalledWith(expectedResult);
});

test('DatePicker, focused calendar date is reset on open', () => {
  const value = '1970-01-01';
  const datePickerWrapper = shallow(<DatePicker value={value} />);

  datePickerWrapper.find(Select).simulate('focus');

  expect(datePickerWrapper.state('view')).toEqual(value);

  const nextValue = '1990-02-02';
  datePickerWrapper.setProps({ value: nextValue });

  datePickerWrapper.find(Select).simulate('focus');

  expect(datePickerWrapper.state('view')).toEqual(nextValue);
});

test('DatePicker default parseInputValue parses valid dates to the expected value', () => {
  const onChangeSpy = jest.fn();
  const expectedResult = '2018-01-02';
  const datePickerWrapper = mount(
    <DatePicker
      id="defaultDatePicker-ParseInputValue"
      onChange={onChangeSpy}
    />,
  );

  datePickerWrapper.instance().onSelectInput({ target: { value: '01/02/18' } });
  datePickerWrapper.first('input').simulate('keyDown', { key: 'Enter' });

  expect(onChangeSpy).toBeCalledWith(expectedResult);
});
