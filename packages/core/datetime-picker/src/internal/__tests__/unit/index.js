// @flow

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { ClearIndicator, DropdownIndicator } from '../..';

import { isValid, removeSpacer, convertTo24hrTime } from '../../parseTime';

test('ClearIndicator', () => {
  expect(ClearIndicator).toBe(null);
});

test('DropdownIndicator', () => {
  const Icon = () => <i>V</i>;
  const wrapper = shallow(
    <DropdownIndicator selectProps={{ dropdownIndicatorIcon: Icon }} />,
  ).dive();

  expect(toJson(wrapper)).toMatchSnapshot();
});

// ParseTime
const correctTimes = [
  '12:45am',
  '12:45pm',
  '1:13pm',
  '1',
  '113pm',
  '01',
  '0113',
  '01pm',
];

const incorrectTimes = ['watermelon', '34675y83u4534ui59', '1111111'];

const convertedTimes = [
  { hour: 0, minute: 45 },
  { hour: 12, minute: 45 },
  { hour: 13, minute: 13 },
  { hour: 1, minute: 0 },
  { hour: 13, minute: 13 },
  { hour: 1, minute: 0 },
  { hour: 1, minute: 13 },
  { hour: 13, minute: 0 },
];

test('"isValid" - accept valid times.', () => {
  correctTimes.forEach(time => {
    expect(isValid(time)).toEqual(true);
  });
});

test('"isValid" - reject invalid times.', () => {
  incorrectTimes.forEach(time => {
    expect(isValid(time)).toEqual(false);
  });
});

test('"convertTo24hrTime" - takes a time and returns an object with parsed 24hr times', () => {
  correctTimes.forEach((time, i) => {
    const tester = removeSpacer(time);
    expect(convertTo24hrTime(tester)).toEqual(convertedTimes[i]);
  });
});
