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

  return (
    <components.Option {...props}>
      {isUser(data) ? (
        <UserOption user={data} status={status} isSelected={isSelected} />
      ) : (
        isTeam(data) && <TeamOption team={data} isSelected={isSelected} />
      )}
    </components.Option>
  );
};
