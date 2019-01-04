import Avatar, { AvatarItem } from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import SelectClearIcon from '@atlaskit/icon/glyph/select-clear';
import * as React from 'react';
import styled from 'styled-components';
import { ExampleWrapper } from '../example-helpers/ExampleWrapper';
import { User } from '../src';
import { UserPicker } from '../src/components/UserPicker';

type State = {
  value: User[];
};

type UserValueProps = {
  user: User;
  onRemove: (user: User) => void;
};

const UserValueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 350px;
  align-items: center;
`;

class UserValue extends React.PureComponent<UserValueProps> {
  private handleRemoveClick = () => {
    const { onRemove, user } = this.props;
    onRemove(user);
  };

  render() {
    const { user } = this.props;
    return (
      <UserValueContainer>
        <AvatarItem
          avatar={<Avatar src={user.avatarUrl} />}
          primaryText={user.name}
        />
        <Button
          iconBefore={<SelectClearIcon label="clear" />}
          onClick={this.handleRemoveClick}
        />
      </UserValueContainer>
    );
  }
}

export default class Example extends React.PureComponent<{}, State> {
  private userPickerRef: React.RefObject<any> = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }

  private handleOnChange = user => {
    this.setState(
      ({ value }) => {
        if (value.indexOf(user) === -1) {
          return {
            value: [...value, user],
          };
        }
        return null;
      },
      () => {
        if (this.userPickerRef.current) {
          this.userPickerRef.current.focus();
        }
      },
    );
  };

  private handleRemoveUser = toRemove => {
    this.setState(
      ({ value }) => ({
        value: value.filter(user => user !== toRemove),
      }),
      () => {
        if (this.userPickerRef.current) {
          this.userPickerRef.current.blur();
        }
      },
    );
  };

  render() {
    const { value } = this.state;
    return (
      <ExampleWrapper>
        {({ options, onInputChange }) => (
          <div>
            {value.map(user => (
              <UserValue
                key={user.id}
                user={user}
                onRemove={this.handleRemoveUser}
              />
            ))}
            <UserPicker
              ref={this.userPickerRef}
              options={options.filter(user => value.indexOf(user) === -1)}
              value={null}
              onChange={this.handleOnChange}
              onInputChange={onInputChange}
            />
          </div>
        )}
      </ExampleWrapper>
    );
  }
}
