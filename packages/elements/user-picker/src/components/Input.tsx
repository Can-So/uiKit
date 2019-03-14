import * as React from 'react';
import { components } from '@atlaskit/select';

export type Props = {
  selectProps?: { disableInput?: boolean };
  innerRef: (ref: HTMLInputElement) => void;
};

export class Input extends React.Component<Props> {
  render() {
    const { selectProps } = this.props;
    return (
      <components.Input
        {...this.props}
        innerRef={this.props.innerRef}
        disabled={selectProps && selectProps.disableInput}
      />
    );
  }
}
