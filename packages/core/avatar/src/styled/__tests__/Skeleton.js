// @flow
import React from 'react';
import { shallow } from 'enzyme';

import Skeleton from '../Skeleton';

test('sets color as currentColor by default', () => {
  // $FlowFixMe - invalid intersection error.
  expect(shallow(<Skeleton />)).toHaveStyleRule(
    'background-color',
    'currentColor',
  );
});

test('sets color from prop', () => {
  // $FlowFixMe - invalid intersection error.
  expect(shallow(<Skeleton color={'#FFFFFF'} />)).toHaveStyleRule(
    'background-color',
    '#FFFFFF',
  );
});

test('sets a default opacity', () => {
  // $FlowFixMe - invalid intersection error.
  expect(shallow(<Skeleton />)).toHaveStyleRule('opacity', '0.15');
});

test('sets a strong opacity when prop specified', () => {
  // $FlowFixMe - invalid intersection error.
  expect(shallow(<Skeleton weight="strong" />)).toHaveStyleRule(
    'opacity',
    '0.3',
  );
});

test('styles a circular avatar when appearance is set to circle', () => {
  // $FlowFixMe - invalid intersection error.
  expect(shallow(<Skeleton appearance="circle" />)).toHaveStyleRule(
    'border-radius',
    '50%',
  );
});

test('styles a rounded square avatar when appearance is set to square', () => {
  // $FlowFixMe - invalid intersection error.
  expect(
    shallow(<Skeleton appearance="square" size="medium" />),
  ).toHaveStyleRule('border-radius', '3px');
});
