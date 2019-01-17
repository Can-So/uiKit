import { components } from '@atlaskit/select';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Option } from '../../../components/Option';
import { UserOption } from '../../../components/UserOption';
import { TeamOption } from '../../../components/TeamOption';
import { User, Team } from '../../../types';

describe('Option', () => {
  const user: User = {
    id: 'abc-123',
    name: 'Jace Beleren',
    publicName: 'jbeleren',
    avatarUrl: 'http://avatars.atlassian.com/jace.png',
  };

  const team: Team = {
    id: 'team-123',
    name: 'That Awesome team',
    type: 'team',
    memberCount: 1,
    includesYou: false,
  };
  const shallowOption = props => shallow(<Option {...props} />);

  it('should render Option with UserOption', () => {
    const component = shallowOption({
      data: { data: user },
      status: 'online',
      isSelected: true,
    });
    const option = component.find(components.Option);
    expect(option).toHaveLength(1);
    expect(option.props()).toMatchObject({
      data: { data: user },
      status: 'online',
      isSelected: true,
    });

    const userOption = component.find(UserOption);
    expect(userOption).toHaveLength(1);
    expect(userOption.props()).toMatchObject({
      user,
      status: 'online',
      isSelected: true,
    });
  });

  it('should render option with TeamOption', () => {
    const component = shallowOption({
      data: { data: team },
      status: 'online',
      isSelected: true,
    });

    const option = component.find(components.Option);
    expect(option).toHaveLength(1);
    expect(option.props()).toMatchObject({
      data: { data: team },
      isSelected: true,
    });

    const teamOption = component.find(TeamOption);
    expect(teamOption).toHaveLength(1);
    expect(teamOption.props()).toMatchObject({
      team,
      isSelected: true,
    });
  });
});
