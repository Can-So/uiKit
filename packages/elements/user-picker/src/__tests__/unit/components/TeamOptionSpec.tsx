import { AvatarItem } from '@atlaskit/avatar';
import { colors } from '@atlaskit/theme';
import { shallow } from 'enzyme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { HighlightText } from '../../../components/HighlightText';
import { SizeableAvatar } from '../../../components/SizeableAvatar';
import {
  TextWrapper,
  TeamOption,
  TeamOptionProps,
} from '../../../components/TeamOption';
import { Team } from '../../../types';

describe('Team Option', () => {
  const basicTeam: Team = {
    id: 'team-7',
    name: 'Team-1',
    avatarUrl: 'https://avatars.atlassian.com/team-1.png',
    type: 'team',
    memberCount: 49,
    includesYou: true,
  };

  const shallowOption = (props: Partial<TeamOptionProps> = {}, team: Team) =>
    shallow(<TeamOption team={team} isSelected={false} {...props} />);

  const buildTeam = (teamData: Partial<Team> = {}): Team => {
    return {
      ...basicTeam,
      ...teamData,
    };
  };

  it('should render TeamOption component', () => {
    const component = shallowOption({}, buildTeam());
    const avatarItem = component.find(AvatarItem);
    expect(avatarItem.props()).toMatchObject({
      backgroundColor: 'transparent',
      avatar: (
        <SizeableAvatar
          appearance="big"
          src="https://avatars.atlassian.com/team-1.png"
          name="Team-1"
        />
      ),
      primaryText: [
        <TextWrapper key="name" color={colors.N800}>
          <HighlightText>Team-1</HighlightText>
        </TextWrapper>,
      ],
      secondaryText: (
        <TextWrapper color={colors.N200}>
          <FormattedMessage
            defaultMessage="{count} {count, plural, one {member} other {members}}{includes, select, true {, including you} other {}}"
            description="Number of members in the team and whether it includes the current user"
            id="fabric.elements.user-picker.team.member.count"
            values={{
              count: 49,
              includes: true,
            }}
          />
        </TextWrapper>
      ),
    });
  });

  it('should render TeamOption component with correct message when member count is >50', () => {
    const component = shallowOption({}, buildTeam({ memberCount: 51 }));
    const avatarItem = component.find(AvatarItem);
    expect(avatarItem.props()).toMatchObject({
      backgroundColor: 'transparent',
      avatar: (
        <SizeableAvatar
          appearance="big"
          src="https://avatars.atlassian.com/team-1.png"
          name="Team-1"
        />
      ),
      primaryText: [
        <TextWrapper key="name" color={colors.N800}>
          <HighlightText>Team-1</HighlightText>
        </TextWrapper>,
      ],
      secondaryText: (
        <TextWrapper color={colors.N200}>
          <FormattedMessage
            defaultMessage="50+ members{includes, select, true {, including you} other {}}"
            description="Number of members in a team exceeds 50 and whether it includes the current user"
            id="fabric.elements.user-picker.team.member.50plus"
            values={{
              count: 51,
              includes: true,
            }}
          />
        </TextWrapper>
      ),
    });
  });

  it('includesYou parameter gets passed to byline', () => {
    const component = shallowOption({}, buildTeam({ includesYou: false }));
    const avatarItem = component.find(AvatarItem);
    expect(avatarItem.props()).toMatchObject({
      backgroundColor: 'transparent',
      avatar: (
        <SizeableAvatar
          appearance="big"
          src="https://avatars.atlassian.com/team-1.png"
          name="Team-1"
        />
      ),
      primaryText: [
        <TextWrapper key="name" color={colors.N800}>
          <HighlightText>Team-1</HighlightText>
        </TextWrapper>,
      ],
      secondaryText: (
        <TextWrapper color={colors.N200}>
          <FormattedMessage
            defaultMessage="{count} {count, plural, one {member} other {members}}{includes, select, true {, including you} other {}}"
            description="Number of members in the team and whether it includes the current user"
            id="fabric.elements.user-picker.team.member.count"
            values={{
              count: 49,
              includes: false,
            }}
          />
        </TextWrapper>
      ),
    });
  });

  it('should render Team Option in selected state', () => {
    const component = shallowOption({ isSelected: true }, buildTeam());
    const avatarItem = component.find(AvatarItem);
    expect(avatarItem.props()).toMatchObject({
      backgroundColor: 'transparent',
      avatar: (
        <SizeableAvatar
          appearance="big"
          src="https://avatars.atlassian.com/team-1.png"
          name="Team-1"
        />
      ),
      primaryText: [
        <TextWrapper key="name" color={colors.N0}>
          <HighlightText>Team-1</HighlightText>
        </TextWrapper>,
      ],
      secondaryText: (
        <TextWrapper color={colors.N50}>
          <FormattedMessage
            defaultMessage="{count} {count, plural, one {member} other {members}}{includes, select, true {, including you} other {}}"
            description="Number of members in the team and whether it includes the current user"
            id="fabric.elements.user-picker.team.member.count"
            values={{
              count: 49,
              includes: true,
            }}
          />
        </TextWrapper>
      ),
    });
  });
});
