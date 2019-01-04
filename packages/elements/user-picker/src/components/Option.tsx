import { components } from '@atlaskit/select';
import * as React from 'react';
import { UserOption } from './UserOption';
import { TeamOption } from './TeamOption';
import { isUser, isTeam } from './utils';

export const Option = props => {
  const {
    data: { data },
    status,
    isSelected,
  } = props;
  if (isUser(data)) {
    return (
      <components.Option {...props}>
        <UserOption user={data} status={status} isSelected={isSelected} />
      </components.Option>
    );
  }

  if (isTeam(data)) {
    return (
      <components.Option {...props}>
        <TeamOption team={data} status={status} isSelected={isSelected} />
      </components.Option>
    );
  }
  return null;
};
