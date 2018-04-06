//@flow
import React, { type Node } from 'react';
import Button from '@atlaskit/button';
import DropdownMenu, { DropdownItem } from '@atlaskit/dropdown-menu';
import Checkbox from '@atlaskit/checkbox';
import { type Role, type AllowContact } from './NPS';
import { Header, Description } from './common';
import { Wrapper, ButtonWrapper } from './styled/common';
import { Contact, RoleQuestion } from './styled/followup';

export const RoleDropdown = ({
  roles,
  placeholder,
  selected,
  onRoleSelect,
}: {
  roles: Array<Role>,
  selected: Role | null,
  placeholder: string,
  onRoleSelect: Role => void,
}) => {
  const trigger = selected ? (selected: string) : placeholder;
  return (
    <DropdownMenu trigger={trigger} triggerType="button">
      {roles.map(role => (
        <DropdownItem
          key={`nps-item-${role}`}
          isSelected={role === selected}
          onClick={() => {
            onRoleSelect(role);
          }}
        >
          {role}
        </DropdownItem>
      ))}
    </DropdownMenu>
  );
};

export type Props = {
  messages: {
    title: Node,
    description: Node,
    optOut: Node,
    roleQuestion: Node,
    contactQuestion: string,
    send: Node,
    rolePlaceholder: string,
  },
  canClose: boolean,
  canOptOut: boolean,
  onClose: () => void,
  onOptOut: () => void,
  roles: Array<Role>,
  onRoleSelect: Role => void,
  onAllowContactChange: AllowContact => void,
  onSubmit: ({ role: Role | null, allowContact: AllowContact }) => void,
};

type State = {
  role: Role | null,
  allowContact: AllowContact,
};

export default class Followup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      role: null,
      allowContact: false,
    };
  }

  static defaultProps = {
    onRoleSelect: () => {},
    onAllowContactChange: () => {},
  };

  onRoleSelect = (role: Role) => {
    this.setState({ role });
    this.props.onRoleSelect(role);
  };

  onAllowContactChange = (e: any) => {
    const allowContact = e.isChecked;
    this.setState({ allowContact });
    this.props.onAllowContactChange(allowContact);
  };

  onSubmit = () => {
    const { role, allowContact } = this.state;
    this.props.onSubmit({ role, allowContact });
  };

  render() {
    const {
      messages,
      canClose,
      onClose,
      canOptOut,
      onOptOut,
      roles,
    } = this.props;
    return (
      <div>
        <Header
          title={messages.title}
          canClose={canClose}
          onClose={onClose}
          canOptOut={canOptOut}
          onOptOut={onOptOut}
          optOutLabel={messages.optOut}
        />
        <Description>{messages.description}</Description>
        <Wrapper>
          <RoleQuestion>{this.props.messages.roleQuestion}</RoleQuestion>
          <RoleDropdown
            roles={roles}
            onRoleSelect={this.onRoleSelect}
            selected={this.state.role}
            placeholder={messages.rolePlaceholder}
          />
          <Contact>
            <Checkbox
              name="nps-contact-me"
              value="Allow Contact"
              label={messages.contactQuestion}
              onChange={this.onAllowContactChange}
            />
          </Contact>
        </Wrapper>
        <Wrapper>
          <ButtonWrapper>
            <Button appearance="primary" onClick={this.onSubmit}>
              {messages.send}
            </Button>
          </ButtonWrapper>
        </Wrapper>
      </div>
    );
  }
}
