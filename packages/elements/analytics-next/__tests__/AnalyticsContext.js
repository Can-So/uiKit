// @flow

import React from 'react';
import { mount, shallow } from 'enzyme';
import PropTypes from 'prop-types';
import { AnalyticsContext } from '../src';

const ContextConsumer = (
  props: { onClick: (context: {}) => void },
  context,
) => {
  const onClick = () => {
    const analyticsContext = context.getAtlaskitAnalyticsContext();
    props.onClick(analyticsContext);
  };
  return <button onClick={onClick} />;
};
ContextConsumer.contextTypes = {
  getAtlaskitAnalyticsContext: PropTypes.func,
};

it('should render', () => {
  const wrapper = shallow(
    <AnalyticsContext data={{}}>
      <div />
    </AnalyticsContext>,
  );

  expect(wrapper.find('div')).toHaveLength(1);
});

it('should not create a component with multiple children', () => {
  expect(() => {
    shallow(
      <AnalyticsContext data={{}}>
        <div />
        <div />
      </AnalyticsContext>,
    );
  }).toThrow();
});

it("should add analytics context data to child's getAnalyticsContext context callback", () => {
  let analyticsContext;
  const getContext = context => {
    analyticsContext = context;
  };
  const wrapper = mount(
    <AnalyticsContext data={{ a: 'b' }}>
      <ContextConsumer onClick={getContext} />
    </AnalyticsContext>,
  );
  wrapper.find(ContextConsumer).simulate('click');

  expect(analyticsContext).toEqual([{ a: 'b' }]);
});

it("should prepend analytics context data from ancestors to child's getAnalyticsContext context callback", () => {
  let analyticsContext;
  const getContext = context => {
    analyticsContext = context;
  };
  const wrapper = mount(
    <AnalyticsContext data={{ a: 'e' }}>
      <AnalyticsContext data={{ c: 'd' }}>
        <AnalyticsContext data={{ a: 'b' }}>
          <ContextConsumer onClick={getContext} />
        </AnalyticsContext>
      </AnalyticsContext>
    </AnalyticsContext>,
  );
  wrapper.find(ContextConsumer).simulate('click');

  expect(analyticsContext).toEqual([{ a: 'e' }, { c: 'd' }, { a: 'b' }]);
});
