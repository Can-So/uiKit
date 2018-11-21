import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

export const renderProp = (
  wrapper: ShallowWrapper,
  renderProp: string,
  ...args
) => {
  const prop = wrapper.prop(renderProp);
  if (prop && typeof prop === 'function') {
    const Wrapper = () => prop(...args);
    return shallow(<Wrapper />);
  }
  throw new Error('renderProp is not a function');
};
