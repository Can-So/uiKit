// @flow
import React from 'react';
import { shallow } from 'enzyme';

import SkeletonContainerItem from '../../src/components/js/skeleton/SkeletonContainerItem';

test('renders a skeleton representation of a container item', () => {
  expect(shallow(<SkeletonContainerItem />)).toMatchSnapshot();
});

test('shows a compact version when collapsed', () => {
  expect(shallow(<SkeletonContainerItem isCollapsed />)).toMatchSnapshot();
});
