// @flow
import { mount, shallow } from 'enzyme';
import React from 'react';
import { Popper } from '../..';

const Content = () => <div className="content">Hello</div>;

const referenceElement = document.createElement('div');

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

test('Popper should be defined', () => {
  const wrapper = mountPopper({ referenceElement });
  expect(wrapper).not.toBeNull();
});

test('Popper should be pass its children', () => {
  expect(shallow(<Popper />).children()).toHaveLength(1);
});

test('should render content into popup', () => {
  const wrapper = mount(
    <Popper referenceElement={referenceElement}>
      {({ ref, style, placement }) => (
        <div ref={ref} style={style} data-placement={placement}>
          <Content />
        </div>
      )}
    </Popper>,
  );
  expect(wrapper.find(Content)).toHaveLength(1);
});
