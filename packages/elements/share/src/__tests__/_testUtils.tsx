import { shallowWithIntl } from '@atlaskit/editor-test-helpers';
import { ShallowWrapper } from 'enzyme';
import * as React from 'react';

// TODO remove this when we upgrade enzyme to 3.8
export const renderProp = <P, S>(
  wrapper: ShallowWrapper<P, S>,
  renderProp: keyof P,
  ...args
): ShallowWrapper<any> => {
  const prop = wrapper.prop(renderProp);
  if (prop && typeof prop === 'function') {
    const Wrapper = () => prop(...args);
    return shallowWithIntl(<Wrapper />);
  }
  throw new Error(`renderProp ${renderProp} is not a function`);
};
