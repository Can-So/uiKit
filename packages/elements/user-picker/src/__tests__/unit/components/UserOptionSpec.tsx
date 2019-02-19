import { colors } from '@atlaskit/theme';
import { shallow } from 'enzyme';
import * as React from 'react';
import {
  AvatarItemOption,
  TextWrapper,
} from '../../../components/AvatarItemOption';
import { HighlightText } from '../../../components/HighlightText';
import { SizeableAvatar } from '../../../components/SizeableAvatar';
import { UserOption, UserOptionProps } from '../../../components/UserOption';

describe('User Option', () => {
  const user = {
    id: 'abc-123',
    name: 'Jace Beleren',
    publicName: 'jbeleren',
    avatarUrl: 'http://avatars.atlassian.com/jace.png',
    byline: 'Teammate',
  };
  const shallowOption = (props: Partial<UserOptionProps> = {}) =>
    shallow<UserOption>(
      <UserOption
        user={user}
        status="approved"
        isSelected={false}
        {...props}
      />,
    );

  it('should render UserOption component', () => {
    const component = shallowOption();
    const avatarItemOption = component.find(AvatarItemOption);
    expect(avatarItemOption.props()).toMatchObject({
      avatar: (
        <SizeableAvatar
          appearance="big"
          src="http://avatars.atlassian.com/jace.png"
          presence="approved"
          name="Jace Beleren"
        />
      ),
      primaryText: [
        <TextWrapper key="name" color={colors.N800}>
          <HighlightText>Jace Beleren</HighlightText>
        </TextWrapper>,
        <React.Fragment key="publicName">
          {' '}
          <TextWrapper color={colors.N200}>
            (<HighlightText>jbeleren</HighlightText>)
          </TextWrapper>
        </React.Fragment>,
      ],
      secondaryText: <TextWrapper color={colors.N200}>Teammate</TextWrapper>,
    });
  });

  it('should render Option in selected state', () => {
    const component = shallowOption({ isSelected: true });
    const avatarItemOption = component.find(AvatarItemOption);
    expect(avatarItemOption.props()).toMatchObject({
      avatar: (
        <SizeableAvatar
          appearance="big"
          src="http://avatars.atlassian.com/jace.png"
          presence="approved"
          name="Jace Beleren"
        />
      ),
      primaryText: [
        <TextWrapper key="name" color={colors.N0}>
          <HighlightText>Jace Beleren</HighlightText>
        </TextWrapper>,
        <React.Fragment key="publicName">
          {' '}
          <TextWrapper color={colors.N50}>
            (<HighlightText>jbeleren</HighlightText>)
          </TextWrapper>
        </React.Fragment>,
      ],
      secondaryText: <TextWrapper color={colors.N50}>Teammate</TextWrapper>,
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
    const avatarItemOption = component.find(AvatarItemOption);
    expect(avatarItemOption.props()).toMatchObject({
      primaryText: [
        <TextWrapper key="name" color={colors.N800}>
          <HighlightText highlights={[{ start: 0, end: 2 }]}>
            Jace Beleren
          </HighlightText>
        </TextWrapper>,
        <React.Fragment key="publicName">
          {' '}
          <TextWrapper color={colors.N200}>
            (
            <HighlightText highlights={[{ start: 2, end: 4 }]}>
              jbeleren
            </HighlightText>
            )
          </TextWrapper>
        </React.Fragment>,
      ],
      secondaryText: <TextWrapper color={colors.N200}>Teammate</TextWrapper>,
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
    const avatarItemOption = component.find(AvatarItemOption);
    expect(avatarItemOption.prop('primaryText')).toEqual([
      <TextWrapper key="name" color={colors.N800}>
        <HighlightText highlights={[{ start: 2, end: 4 }]}>
          jbeleren
        </HighlightText>
      </TextWrapper>,
    ]);
  });

  it('should show only name', () => {
    const userWithSamePublicName = {
      ...user,
      publicName: user.name,
    };
    const component = shallowOption({ user: userWithSamePublicName });
    const avatarItemOption = component.find(AvatarItemOption);
    expect(avatarItemOption.prop('primaryText')).toEqual([
      <TextWrapper key="name" color={colors.N800}>
        <HighlightText>Jace Beleren</HighlightText>
      </TextWrapper>,
    ]);
  });

  it('should ignore blank spaces while comparing', () => {
    const userWithSamePublicName = {
      ...user,
      publicName: `  ${user.name}  `,
    };
    const component = shallowOption({ user: userWithSamePublicName });
    const avatarItemOption = component.find(AvatarItemOption);
    expect(avatarItemOption.prop('primaryText')).toEqual([
      <TextWrapper key="name" color={colors.N800}>
        <HighlightText>Jace Beleren</HighlightText>
      </TextWrapper>,
    ]);
  });
});
