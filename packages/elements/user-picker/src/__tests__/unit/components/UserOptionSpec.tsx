import { AvatarItem } from '@atlaskit/avatar';
import { colors } from '@atlaskit/theme';
import { shallow } from 'enzyme';
import * as React from 'react';
import { HighlightText } from '../../../components/HighlightText';
import { SizeableAvatar } from '../../../components/SizeableAvatar';
import {
  TextWrapper,
  UserOption,
  UserOptionProps,
} from '../../../components/UserOption';

describe('Option', () => {
  const user = {
    id: 'abc-123',
    name: 'Jace Beleren',
    nickname: 'jbeleren',
    avatarUrl: 'http://avatars.atlassian.com/jace.png',
  };
  const shallowOption = (props: Partial<UserOptionProps> = {}) =>
    shallow(
      <UserOption
        user={user}
        status="approved"
        isSelected={false}
        {...props}
      />,
    );

  it('should render UserOption component', () => {
    const component = shallowOption();
    const avatarItem = component.find(AvatarItem);
    expect(avatarItem.props()).toMatchObject({
      backgroundColor: 'transparent',
      avatar: (
        <SizeableAvatar
          appearance="big"
          src="http://avatars.atlassian.com/jace.png"
          presence="approved"
          name="Jace Beleren"
        />
      ),
      primaryText: <TextWrapper color={colors.N800}>Jace Beleren</TextWrapper>,
      secondaryText: <TextWrapper color={colors.N800}>jbeleren</TextWrapper>,
    });
  });

  it('should render Option in selected state', () => {
    const component = shallowOption({ isSelected: true });
    const avatarItem = component.find(AvatarItem);
    expect(avatarItem.props()).toMatchObject({
      backgroundColor: 'transparent',
      avatar: (
        <SizeableAvatar
          appearance="big"
          src="http://avatars.atlassian.com/jace.png"
          presence="approved"
          name="Jace Beleren"
        />
      ),
      primaryText: <TextWrapper color={colors.N0}>Jace Beleren</TextWrapper>,
      secondaryText: <TextWrapper color={colors.N0}>jbeleren</TextWrapper>,
    });
  });

  it('should highlight text', () => {
    const userWithHighlight = {
      ...user,
      highlight: {
        name: [{ start: 0, end: 2 }],
        nickname: [{ start: 2, end: 4 }],
      },
    };
    const component = shallowOption({ user: userWithHighlight });
    const avatarItem = component.find(AvatarItem);
    expect(avatarItem.props()).toMatchObject({
      primaryText: (
        <TextWrapper color={colors.N800}>
          <HighlightText highlights={[{ start: 0, end: 2 }]}>
            Jace Beleren
          </HighlightText>
        </TextWrapper>
      ),
      secondaryText: (
        <TextWrapper color={colors.N800}>
          <HighlightText highlights={[{ start: 2, end: 4 }]}>
            jbeleren
          </HighlightText>
        </TextWrapper>
      ),
    });
  });

  it('should use nickname if name is not provided', () => {
    const userWithoutName = {
      id: 'abc-123',
      nickname: 'jbeleren',
      highlight: {
        nickname: [{ start: 2, end: 4 }],
        name: [],
      },
    };
    const component = shallowOption({ user: userWithoutName });
    const avatarItem = component.find(AvatarItem);
    expect(avatarItem.prop('primaryText')).toEqual(
      <TextWrapper color={colors.N800}>
        <HighlightText highlights={[{ start: 2, end: 4 }]}>
          jbeleren
        </HighlightText>
      </TextWrapper>,
    );
    expect(avatarItem.prop('secondaryText')).toBeUndefined();
  });
});
