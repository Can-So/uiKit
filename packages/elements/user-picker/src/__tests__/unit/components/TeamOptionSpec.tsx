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
import { Team } from 'src/types';

describe('Team Option', () => {
  // todo - create using funciton ?
  const basicTeam: Team = {
    id: 'team-7',
    name: 'Team-1',
    avatarUrl: 'https://avatars.atlassian.com/team-1.png',
    type: 'team',
    memberCount: 49,
    includesYou: true,
  };

  const shallowOption = (props: Partial<TeamOptionProps> = {}) =>
    shallow(
      <TeamOption
        team={basicTeam}
        status="approved"
        isSelected={false}
        {...props}
      />,
    );

  const buildTeam = (teamData: Partial<Team> = {}): Team => {
    return {
      ...basicTeam,
      ...teamData,
    };
  };

  it('should render TeamOption component', () => {
    const component = shallowOption();
    const avatarItem = component.find(AvatarItem);
    expect(avatarItem.props()).toMatchObject({
      backgroundColor: 'transparent',
      avatar: (
        <SizeableAvatar
          appearance="big"
          src="https://avatars.atlassian.com/team-1.png"
          presence="approved"
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
});
