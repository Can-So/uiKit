import { shallowWithIntl } from '@atlaskit/editor-test-helpers';
import { ShallowWrapper } from 'enzyme';
import * as React from 'react';

// TODO remove this when we upgrade enzyme to 3.8
export const renderProp = <P, S>(
  wrapper: ShallowWrapper<P, S>,
  renderProp: keyof P,
  ...args: any[]
): ShallowWrapper<any> => {
  const prop = wrapper.prop(renderProp);
  if (prop && typeof prop === 'function') {
    const Wrapper = () => prop(...args);
    return shallowWithIntl(<Wrapper />);
  }
  throw new Error(`renderProp ${renderProp} is not a function`);
};

export const createMockEvent: any = (
  type: string,
  properties?: { [key: string]: any },
) => {
  const noop = () => {};
  return {
    bubbles: false,
    cancelable: false,
    currentTarget: document,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: true,
    nativeEvent: Event,
    preventDefault: noop,
    isDefaultPrevented: false,
    stopPropagation: noop,
    isPropagationStopped: false,
    target: document,
    timeStamp: new Date(),
    type,
    ...properties,
  };
};
