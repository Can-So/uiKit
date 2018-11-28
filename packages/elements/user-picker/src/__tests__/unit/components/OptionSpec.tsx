import { components } from '@atlaskit/select';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Option } from '../../../components/Option';
import { UserOption } from '../../../components/UserOption';
import { User } from '../../../types';

describe('Option', () => {
  const user: User = {
    id: 'abc-123',
    name: 'Jace Beleren',
    publicName: 'jbeleren',
    avatarUrl: 'http://avatars.atlassian.com/jace.png',
  };
  const shallowOption = (
    props = {
      data: { user },
      status: 'online',
      isSelected: true,
    },
  ) => shallow(<Option {...props} />);

  it('should render Option with UserOption', () => {
    const component = shallowOption();
    const option = component.find(components.Option);
    expect(option).toHaveLength(1);
    expect(option.props()).toMatchObject({
      data: { user },
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
