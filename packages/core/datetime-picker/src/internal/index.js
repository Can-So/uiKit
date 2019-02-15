// @flow

import React from 'react';

export const ClearIndicator = null;

export const defaultTimes = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
];

export const defaultTimeFormat = 'h:mma';
export const defaultDateFormat = 'YYYY/MM/DD';

export function padToTwo(number: number) {
  return number <= 99 ? `0${number}`.slice(-2) : `${number}`;
}

export const DropdownIndicator = ({
  selectProps: { dropdownIndicatorIcon: Icon },
}: { selectProps: { dropdownIndicatorIcon?: any } } = {}) =>
  Icon ? <Icon /> : null;

export function formatDateTimeZoneIntoIso(
  date: string,
  time: string,
  zone: string,
): string {
  return `${date}T${time}${zone}`;
}
