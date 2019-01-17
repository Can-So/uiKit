import { AvatarItem } from '@atlaskit/avatar';
import { shallow } from 'enzyme';
import * as React from 'react';
import {
  AvatarItemOption,
  AvatarItemOptionProps,
} from '../../../components/AvatarItemOption';

describe('AvatarItemOption', () => {
  const shallowAvatarItemOption = (props: AvatarItemOptionProps) =>
    shallow(<AvatarItemOption {...props} />);

  it('should render AvatarItem', () => {
    const avatar = 'Avatar';
    const primaryText = 'PrimaryText';
    const secondaryText = 'SecondaryText';
    const component = shallowAvatarItemOption({
      avatar,
      primaryText,
      secondaryText,
    });

    const avatarItem = component.find(AvatarItem);
    expect(avatarItem).toHaveLength(1);
    expect(avatarItem.props()).toMatchObject({
      backgroundColor: 'transparent',
      avatar,
      primaryText,
      secondaryText,
    });
  });
});
