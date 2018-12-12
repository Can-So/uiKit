import * as React from 'react';
import { exampleUsers } from '../example-helpers';
import { UserPicker } from '../src/components/UserPicker';

export interface State {
  open: boolean;
}

export default class Example extends React.Component<{}, State> {
  state = {
    open: true,
  };

  handleFocus = () => {
    this.setState({ open: true });
  };

  handleBlur = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <UserPicker
        users={exampleUsers}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        open={this.state.open}
      />
    );
  }
}
