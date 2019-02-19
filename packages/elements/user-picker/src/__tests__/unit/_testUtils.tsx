import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { User } from '../../types';

export const renderProp = (
  wrapper: ShallowWrapper<any>,
  renderProp: string,
  ...args: any[]
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
  publicName: 'jbeleren',
  avatarUrl: 'http://avatars.atlassian.com/jace.png',
};
