// @flow
import { mount, shallow } from 'enzyme';
import React from 'react';
import { Popper } from '../..';

const mountPopper = props =>
  mount(
    <Popper {...props}>
      {({ ref, style, placement, arrowProps }) => (
        <div ref={ref} style={style} data-placement={placement}>
          <div {...arrowProps} />
        </div>
      )}
    </Popper>,
  );

const referenceElement = document.createElement('div');

test('Popper should be defined', () => {
  const wrapper = mountPopper({ referenceElement });
  expect(wrapper).not.toBeNull();
});

test('Popper should be pass its children', () => {
  expect(shallow(<Popper />).children()).toHaveLength(1);
});

test('Popper should render the correct markup', () => {
  const wrapper = mountPopper({ referenceElement });
  expect(wrapper).toMatchSnapshot();
});
