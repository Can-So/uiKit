import { components } from '@atlaskit/select';
import * as React from 'react';

type Props = {
  selectProps: { disableInput?: boolean };
};

export class Input extends React.PureComponent<Props> {
  render() {
    return (
      <components.Input
        disabled={this.props.selectProps.disableInput}
        {...this.props}
      />
    );
  }
}
