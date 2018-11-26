import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { User, UserOption } from '../../types';

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

export const testUser: User = {
  id: 'abc-123',
  name: 'Jace Beleren',
  nickname: 'jbeleren',
  avatarUrl: 'http://avatars.atlassian.com/jace.png',
};
