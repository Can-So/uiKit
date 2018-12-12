import { AnalyticsViewerContainer } from '@atlaskit/analytics-viewer';
import * as React from 'react';
import {
  assignToMe,
  exampleUsers,
  filterUsers,
  unassigned,
} from '../example-helpers';
import { LoadOptions, OnInputChange, User } from '../src/types';

type ChildrenProps = {
  loadUsers: LoadOptions;
  users: User[];
  onInputChange: OnInputChange;
};

export type Props = {
  children: (props: ChildrenProps) => React.ReactNode;
  analytics?: boolean;
};

export class ExampleWrapper extends React.PureComponent<
  Props,
  { users: User[] }
> {
  constructor(props) {
    super(props);
    this.state = {
      users: exampleUsers,
    };
  }

  private loadUsers = (searchText?: string) => {
    if (searchText && searchText.length > 0) {
      return new Promise<User[]>(resolve => {
        window.setTimeout(() => resolve(filterUsers(searchText)), 1000);
      });
    }
    return [
      unassigned,
      assignToMe,
      new Promise<User[]>(resolve => {
        window.setTimeout(() => resolve(exampleUsers), 1000);
      }),
    ];
  };

  private onInputChange = (searchText?: string) => {
    console.log('onInputChange', searchText);
    this.setState({
      users:
        searchText && searchText.length > 0
          ? filterUsers(searchText)
          : exampleUsers,
    });
  };

  render() {
    const { children, analytics } = this.props;
    const { users } = this.state;

    const example = children({
      users,
      loadUsers: this.loadUsers,
      onInputChange: this.onInputChange,
    });
    return analytics ? (
      <AnalyticsViewerContainer>{example}</AnalyticsViewerContainer>
    ) : (
      example
    );
  }
}
