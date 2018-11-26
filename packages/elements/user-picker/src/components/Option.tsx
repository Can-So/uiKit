import { components } from '@atlaskit/select';
import * as React from 'react';
import { UserOption } from './UserOption';

export const Option = props => {
  const {
    data: { user },
    status,
    isSelected,
  } = props;
  return (
    <components.Option {...props}>
      <UserOption user={user} status={status} isSelected={isSelected} />
    </components.Option>
  );
};
