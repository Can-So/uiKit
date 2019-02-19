import { components } from '@atlaskit/select';
import { shallow } from 'enzyme';
import * as React from 'react';
import { EmailOption } from '../../../components/EmailOption';
import { Option, OptionProps } from '../../../components/Option';
import { TeamOption } from '../../../components/TeamOption';
import { UserOption } from '../../../components/UserOption';
import { Email, Team, User, UserPickerProps } from '../../../types';

describe('Option', () => {
  const selectProps: UserPickerProps = {};

  const shallowOption = (props: OptionProps) => shallow(<Option {...props} />);

  describe('UserOption', () => {
    const user: User = {
      id: 'abc-123',
      name: 'Jace Beleren',
      publicName: 'jbeleren',
      avatarUrl: 'http://avatars.atlassian.com/jace.png',
    };

    it('should render Option with UserOption', () => {
      const component = shallowOption({
        data: { data: user, label: user.name, value: user.id },
        isSelected: true,
        status: 'online',
        selectProps,
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
  });

  describe('EmailOption', () => {
    const email: Email = {
      type: 'email',
      id: 'test@test.com',
      name: 'test@test.com',
    };

    it('should render Option with EmailOption', () => {
      const component = shallowOption({
        data: { data: email, label: email.name, value: email.id },
        isSelected: false,
        selectProps: {
          emailLabel: 'Invite',
        },
      });

      const option = component.find(components.Option);
      expect(option).toHaveLength(1);
      expect(option.props()).toMatchObject({
        data: { data: email },
        isSelected: false,
      });

      const emailOption = component.find(EmailOption);
      expect(emailOption).toHaveLength(1);
      expect(emailOption.props()).toMatchObject({
        email,
        isSelected: false,
        label: 'Invite',
      });
    });
  });

  describe('TeamOption', () => {
    const team: Team = {
      id: 'team-123',
      name: 'That Awesome team',
      type: 'team',
    };

    it('should render option with TeamOption', () => {
      const component = shallowOption({
        data: { data: team, label: team.name, value: team.id },
        status: 'online',
        isSelected: true,
        selectProps,
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
});
