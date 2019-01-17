import { colors } from '@atlaskit/theme';
import { shallow } from 'enzyme';
import * as React from 'react';
import { HighlightText } from '../../../components/HighlightText';
import { UserOption, UserOptionProps } from '../../../components/UserOption';
import { CommonOption } from '../../../components/CommonOption';
import { OptionTextWrapper } from '../../../components/OptionTextWrapper';

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
    const commonOption = component.find(CommonOption);

    expect(commonOption.props()).toMatchObject({
      name: 'Jace Beleren',
      avatarUrl: 'http://avatars.atlassian.com/jace.png',
      presence: 'approved',
      primaryText: [
        <OptionTextWrapper key="name" color={colors.N800}>
          <HighlightText>Jace Beleren</HighlightText>
        </OptionTextWrapper>,
        <React.Fragment key="publicName">
          {' '}
          <OptionTextWrapper color={colors.N200}>
            (<HighlightText>jbeleren</HighlightText>)
          </OptionTextWrapper>
        </React.Fragment>,
      ],
      byline: (
        <OptionTextWrapper color={colors.N200}>Teammate</OptionTextWrapper>
      ),
    });
  });

  it('should render Option in selected state', () => {
    const component = shallowOption({ isSelected: true });
    const commonOption = component.find(CommonOption);

    expect(commonOption.props()).toMatchObject({
      name: 'Jace Beleren',
      avatarUrl: 'http://avatars.atlassian.com/jace.png',
      presence: 'approved',
      primaryText: [
        <OptionTextWrapper key="name" color={colors.N0}>
          <HighlightText>Jace Beleren</HighlightText>
        </OptionTextWrapper>,
        <React.Fragment key="publicName">
          {' '}
          <OptionTextWrapper color={colors.N50}>
            (<HighlightText>jbeleren</HighlightText>)
          </OptionTextWrapper>
        </React.Fragment>,
      ],
      byline: (
        <OptionTextWrapper color={colors.N50}>Teammate</OptionTextWrapper>
      ),
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
    const commonOption = component.find(CommonOption);
    expect(commonOption.props()).toMatchObject({
      name: 'Jace Beleren',
      avatarUrl: 'http://avatars.atlassian.com/jace.png',
      presence: 'approved',
      primaryText: [
        <OptionTextWrapper key="name" color={colors.N800}>
          <HighlightText highlights={[{ start: 0, end: 2 }]}>
            Jace Beleren
          </HighlightText>
        </OptionTextWrapper>,
        <React.Fragment key="publicName">
          {' '}
          <OptionTextWrapper color={colors.N200}>
            (
            <HighlightText highlights={[{ start: 2, end: 4 }]}>
              jbeleren
            </HighlightText>
            )
          </OptionTextWrapper>
        </React.Fragment>,
      ],
      byline: (
        <OptionTextWrapper color={colors.N200}>Teammate</OptionTextWrapper>
      ),
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
    const commonOption = component.find(CommonOption);
    expect(commonOption.prop('primaryText')).toEqual([
      <OptionTextWrapper key="name" color={colors.N800}>
        <HighlightText highlights={[{ start: 2, end: 4 }]}>
          jbeleren
        </HighlightText>
      </OptionTextWrapper>,
    ]);
  });

  it('should show only name', () => {
    const userWithSamePublicName = {
      ...user,
      publicName: user.name,
    };
    const component = shallowOption({ user: userWithSamePublicName });
    const commonOption = component.find(CommonOption);
    expect(commonOption.prop('primaryText')).toEqual([
      <OptionTextWrapper key="name" color={colors.N800}>
        <HighlightText>Jace Beleren</HighlightText>
      </OptionTextWrapper>,
    ]);
  });

  it('should ignore blank spaces while comparing', () => {
    const userWithSamePublicName = {
      ...user,
      publicName: `  ${user.name}  `,
    };
    const component = shallowOption({ user: userWithSamePublicName });
    const commonOption = component.find(CommonOption);
    expect(commonOption.prop('primaryText')).toEqual([
      <OptionTextWrapper key="name" color={colors.N800}>
        <HighlightText>Jace Beleren</HighlightText>
      </OptionTextWrapper>,
    ]);
  });
});
