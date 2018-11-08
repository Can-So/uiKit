
import Avatar from '@atlaskit/avatar';
import { shallow } from 'enzyme';
import * as React from 'react';
import { SizeableAvatar, Props } from '../../../components/SizeableAvatar';

describe('SizeableAvatar', () => {
  const shallowSizeableAvatar = (props: Partial<Props> = {}) =>
    shallow(<SizeableAvatar {...props} />);

  it('should render Avatar', () => {
    const component = shallowSizeableAvatar({ appearance: 'normal' });
    const avatar = component.find(Avatar);
    expect(avatar).toHaveLength(1);
  });

  it('should render small Avatar with normal appearance', () => {
    const component = shallowSizeableAvatar({ appearance: 'normal' });
    const avatar = component.find(Avatar);
    expect(avatar.prop('size')).toEqual('small');
  });

  it('should render xsmall Avatar with compact appearance', () => {
    const component = shallowSizeableAvatar({ appearance: 'compact' });
    const avatar = component.find(Avatar);
    expect(avatar.prop('size')).toEqual('xsmall');
  });
});
