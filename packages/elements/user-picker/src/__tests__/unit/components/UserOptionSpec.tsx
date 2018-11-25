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
    publicName: 'jbeleren',
    avatarUrl: 'http://avatars.atlassian.com/jace.png',
    byline: 'Teammate',
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
      primaryText: [
        <TextWrapper color={colors.N800}>
          <HighlightText>Jace Beleren</HighlightText>
        </TextWrapper>,
        <> </>,
        <TextWrapper color={colors.N200}>
          (<HighlightText>jbeleren</HighlightText>)
        </TextWrapper>,
      ],
      secondaryText: <TextWrapper color={colors.N200}>Teammate</TextWrapper>,
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
      primaryText: [
        <TextWrapper color={colors.N0}>
          <HighlightText>Jace Beleren</HighlightText>
        </TextWrapper>,
        <> </>,
        <TextWrapper color={colors.N50}>
          (<HighlightText>jbeleren</HighlightText>)
        </TextWrapper>,
      ],
    });
  });

  it('should highlight text', () => {
    const userWithHighlight = {
      ...user,
      highlight: {
        name: [{ start: 0, end: 2 }],
        publicName: [{ start: 2, end: 4 }],
      },
    };
    const component = shallowOption({ user: userWithHighlight });
    const avatarItem = component.find(AvatarItem);
    expect(avatarItem.props()).toMatchObject({
      primaryText: [
        <TextWrapper color={colors.N800}>
          <HighlightText highlights={[{ start: 0, end: 2 }]}>
            Jace Beleren
          </HighlightText>
        </TextWrapper>,
        <> </>,
        <TextWrapper color={colors.N200}>
          (
          <HighlightText highlights={[{ start: 2, end: 4 }]}>
            jbeleren
          </HighlightText>
          )
        </TextWrapper>,
      ],
    });
  });

  it('should show only the name when no publicName is provided', () => {
    const userWithoutName = {
      id: 'abc-123',
      name: 'jbeleren',
      highlight: {
        name: [{ start: 2, end: 4 }],
        publicName: [],
      },
    };
    const component = shallowOption({ user: userWithoutName });
    const avatarItem = component.find(AvatarItem);
    expect(avatarItem.prop('primaryText')).toEqual([
      <TextWrapper color={colors.N800}>
        <HighlightText highlights={[{ start: 2, end: 4 }]}>
          jbeleren
        </HighlightText>
      </TextWrapper>,
    ]);
    expect(avatarItem.prop('secondaryText')).toBeUndefined();
  });
});
