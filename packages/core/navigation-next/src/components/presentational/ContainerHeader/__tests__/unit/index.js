// @flow

import React from 'react';
import { mount } from 'enzyme';

import ContainerHeader from '../../';
import ItemAvatar from '../../../ItemAvatar/index';

const commonProps = {
  id: 'checking-if-props-are-passed-through-the-children',
  text: 'Container title',
  subText: 'Container description',
};
describe('ContainerHeader', () => {
  it('should add the given props through the children component', () => {
    const wrapper = mount(<ContainerHeader {...commonProps} />);
    expect(wrapper.find('ConnectedItem').props()).toMatchObject({
      ...commonProps,
    });
  });

  it('should have a connected item component with default spacing', () => {
    const wrapper = mount(<ContainerHeader {...commonProps} />);
    expect(wrapper.find('ConnectedItem').props().spacing).toEqual('default');
  });

  it('should render the given connected item passed as a `before` prop', () => {
    const wrapper = mount(
      <ContainerHeader
        before={itemState => (
          <ItemAvatar itemState={itemState} appearance="square" size="large" />
        )}
        {...commonProps}
      />,
    );

    expect(wrapper.find(ItemAvatar).props()).toMatchObject({
      appearance: 'square',
      size: 'large',
    });
  });
});
