import { components } from '@atlaskit/select';
import * as React from 'react';
import { UserOption } from './UserOption';
import { isUser } from './utils';

export const Option = props => {
  const {
    data: { option },
    status,
    isSelected,
  } = props;
  if (isUser(option)) {
    return (
      <components.Option {...props}>
        <UserOption user={option} status={status} isSelected={isSelected} />
      </components.Option>
    );
  }
  // This will be implemented in TEAMS-169
  // if (isTeam(option)) {
  //   return Something;
  // }
  return null;
};
