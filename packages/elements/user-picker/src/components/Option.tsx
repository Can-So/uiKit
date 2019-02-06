import { components } from '@atlaskit/select';
import * as React from 'react';
import { Option as OptionType, UserPickerProps } from '../types';
import { EmailOption } from './EmailOption';
import { TeamOption } from './TeamOption';
import { UserOption } from './UserOption';
import { isEmail, isTeam, isUser } from './utils';

export type OptionProps = {
  data: OptionType;
  isSelected: boolean;
  status?: string;
  selectProps: UserPickerProps;
};

const dataOption = ({
  data: { data },
  isSelected,
  status,
  selectProps,
}: OptionProps) => {
  if (isUser(data)) {
    return <UserOption user={data} status={status} isSelected={isSelected} />;
  }
  if (isEmail(data)) {
    return (
      <EmailOption
        email={data}
        isSelected={isSelected}
        label={selectProps.emailLabel}
      />
    );
  }
  if (isTeam(data)) {
    return <TeamOption team={data} isSelected={isSelected} />;
  }
  return null;
};

export const Option: React.StatelessComponent<OptionProps> = props => (
  <components.Option {...props}>{dataOption(props)}</components.Option>
);
