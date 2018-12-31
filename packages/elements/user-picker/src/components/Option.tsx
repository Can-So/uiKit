import { components } from '@atlaskit/select';
import * as React from 'react';
import { UserOption } from './UserOption';
import { isUser } from './utils';

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
  // TODO TEAMS-169
  return null;
};
